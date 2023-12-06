import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

  const selectedDateWithoutTime = dayjs(selectedDate).format('YYYY-MM-DD')

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

  return (
    <Calendar.Root>
      <Calendar.Table
        // selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
      />

      <Calendar.TimePicker>
        <Calendar.TimePickerHeader date={selectedDate} />
        <Calendar.TimePickerContent>
          {availability?.possibleTimes.map((time) => {
            const hours = Math.trunc(time / 60)
            const minutes = time % 60

            return (
              <Calendar.TimePickerItem
                key={time}
                disabled={!availability.availableTimes.includes(time)}
              >
                {String(hours).padStart(2, '0')}:
                {String(minutes).padStart(2, '0')}h
              </Calendar.TimePickerItem>
            )
          })}
        </Calendar.TimePickerContent>
      </Calendar.TimePicker>
    </Calendar.Root>
  )
}
