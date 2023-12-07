import { Calendar } from '@/components/Calendar'
import { TimePicker } from '@/components/TimePicker'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Container } from './styles'
import { getWeekDays } from '@/utils/get-week-days'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface BlockedDays {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()

  const currentMonth = currentDate?.format('MMMM')
  const currentYear = currentDate?.format('YYYY')

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const dayAndMonth = selectedDate && dayjs(selectedDate).format('DD[ de ]MMMM')

  const shortWeekDays = getWeekDays({ short: true })

  const username = String(router.query.username)

  const selectedDateWithoutTime = dayjs(selectedDate).format('YYYY-MM-DD')

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  const { data: blockedDays } = useQuery<BlockedDays>({
    queryKey: [
      'blocked-dates',
      currentDate.get('year'),
      currentDate.get('month'),
    ],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
        },
      })

      return response.data
    },
  })

  return (
    <Container>
      <Calendar.Root>
        <Calendar.Header>
          <Calendar.Title>
            {currentMonth} <span>{currentYear}</span>
          </Calendar.Title>
          <Calendar.Actions>
            <Calendar.Prev onClick={handlePreviousMonth} />
            <Calendar.Next onClick={handleNextMonth} />
          </Calendar.Actions>
        </Calendar.Header>
        <Calendar.Table
          weekDays={shortWeekDays}
          currentDate={currentDate.toDate()}
          blockedDates={blockedDays?.blockedDates}
          blockedWeekDays={blockedDays?.blockedWeekDays}
          onDateSelected={setSelectedDate}
        />
      </Calendar.Root>

      <TimePicker.Root>
        <TimePicker.Header>
          {weekDay} <span>{dayAndMonth}</span>
        </TimePicker.Header>
        <TimePicker.Content>
          {availability?.possibleTimes.map((time) => {
            const hours = Math.trunc(time / 60)
            const minutes = time % 60

            return (
              <TimePicker.Item
                key={time}
                disabled={!availability.availableTimes.includes(time)}
              >
                {String(hours).padStart(2, '0')}:
                {String(minutes).padStart(2, '0')}h
              </TimePicker.Item>
            )
          })}
        </TimePicker.Content>
      </TimePicker.Root>
    </Container>
  )
}
