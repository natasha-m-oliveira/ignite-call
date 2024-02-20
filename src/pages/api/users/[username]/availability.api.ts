import { MIN_LEAD_TIME_FOR_BOOKING, SCHEDULING_DURATION } from '@/config/config'
import { prisma } from '@/lib/prisma'
import { getTimeSlots } from '@/utils/get-time-slots'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextApiRequest, NextApiResponse } from 'next'

dayjs.extend(utc)

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const username = String(req.query.username)
  const { date, timezoneOffset } = req.query

  if (!date || !timezoneOffset)
    return res
      .status(400)
      .json({ message: 'Date or timezoneOffset not provided.' })

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found.' })

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) return res.json({ possibleTimes: [], availableTimes: [] })

  const timezoneOffsetInHours =
    typeof timezoneOffset === 'string'
      ? Number(timezoneOffset) / 60
      : Number(timezoneOffset[0]) / 60

  const referenceDateTimeZoneOffsetInHours =
    referenceDate.toDate().getTimezoneOffset() / 60

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability)
    return res.json({ possibleTimes: [], availableTimes: [] })

  const startTime = userAvailability.time_start_in_minutes
  const endTime = userAvailability.time_end_in_minutes

  const possibleTimes = getTimeSlots(startTime, endTime, SCHEDULING_DURATION)

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate
          .set('hours', Math.trunc(startTime / 60))
          .set('minutes', startTime % 60)
          .add(timezoneOffsetInHours, 'hours')
          .toDate(),
        lte: referenceDate
          .set('hours', Math.trunc(endTime / 60))
          .set('minutes', endTime % 60)
          .add(timezoneOffsetInHours, 'hours')
          .toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some((blockedTime) => {
      const blockedMinutes =
        blockedTime.date.getHours() * 60 + blockedTime.date.getMinutes()
      return blockedMinutes - timezoneOffsetInHours * 60 === time
    })

    const isTimeInPast = referenceDate
      .set('hours', Math.trunc(time / 60))
      .set('minutes', time % 60)
      .subtract(referenceDateTimeZoneOffsetInHours, 'hours')
      .isBefore(
        dayjs()
          .utc()
          .subtract(timezoneOffsetInHours, 'hours')
          .add(MIN_LEAD_TIME_FOR_BOOKING, 'minutes'),
      )

    return !isTimeBlocked && !isTimeInPast
  })

  return res.json({ possibleTimes, availableTimes })
}
