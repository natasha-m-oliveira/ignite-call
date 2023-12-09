import { MIN_LEAD_TIME_FOR_BOOKING } from '@/config/config'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const createSchedulingBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  observations: z.string(),
  date: z
    .string()
    .datetime()
    .transform((str) => new Date(str)),
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const username = String(req.query.username)

  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    req.body,
  )

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found.' })

  const schedulingDate = dayjs(date).startOf('minutes')

  if (
    schedulingDate.isBefore(
      dayjs(new Date()).add(MIN_LEAD_TIME_FOR_BOOKING, 'minutes'),
    )
  )
    return res
      .status(400)
      .json({ message: 'The minimum booking time is one hour.' })

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling)
    return res
      .status(400)
      .json({ message: 'There is another scheduling at the same time.' })

  await prisma.scheduling.create({
    data: {
      name,
      email,
      observations: observations || null,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  return res.status(201).end()
}
