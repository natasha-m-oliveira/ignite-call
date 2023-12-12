import { MIN_LEAD_TIME_FOR_BOOKING, SCHEDULING_DURATION } from '@/config/config'
import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const createSchedulingBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  address: z.object({
    zipCode: z.string(),
    street: z.string(),
    streetNumber: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
  }),
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

  const { name, email, observations, date, address } =
    createSchedulingBodySchema.parse(req.body)

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

  const location = `${address.street}, ${address.streetNumber} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zipCode}`

  await prisma.scheduling.create({
    data: {
      name,
      email,
      date: schedulingDate.toDate(),
      zip_code: address.zipCode,
      street_number: address.streetNumber,
      observations: observations || null,
      user_id: user.id,
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  await calendar.events.insert({
    calendarId: 'primary', // é possível escolher a agenda que o evento será criado
    conferenceDataVersion: 0,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      location,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(SCHEDULING_DURATION, 'minutes').format(),
      },
      attendees: [{ email, displayName: name }],
    },
  })

  return res.status(201).end()
}
