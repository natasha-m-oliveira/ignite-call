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

interface CalendarStepProps {
  onSelectDateTime?: (date: Date) => void
}

export function CalendarStep(props: CalendarStepProps) {
  const { onSelectDateTime = () => undefined } = props
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
          month: String(currentDate.get('month') + 1).padStart(2, '0'),
        },
      })

      return response.data
    },
  })

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
          timezoneOffset: selectedDate ? selectedDate.getTimezoneOffset() : 0,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  function handleSelectTime(minutes: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hours', Math.trunc(minutes / 60))
      .set('minutes', minutes % 60)
      .startOf('minutes')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

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
          blockedDays={blockedDays}
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
                onClick={() => handleSelectTime(time)}
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
