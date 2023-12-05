import { prisma } from '@/lib/prisma'
import { getTimeSlots } from '@/utils/get-time-slots'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) return res.status(400).json({ message: 'Date not provided.' })

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found.' })

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) return res.json({ possibleTimes: [], availableTimes: [] })

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability)
    return res.json({ possibleTimes: [], availableTimes: [] })

  const startHour = userAvailability.time_start_in_minutes / 60
  const endHour = userAvailability.time_end_in_minutes / 60
  const intervalInHours = 30 / 60

  const possibleTimes = getTimeSlots(startHour, endHour, intervalInHours)

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter(
    (time) =>
      !blockedTimes.some((blockedTime) => {
        const blockedHour =
          blockedTime.date.getHours() + blockedTime.date.getMinutes() / 60
        return blockedHour === time
      }),
  )

  return res.json({ possibleTimes, availableTimes })
}
