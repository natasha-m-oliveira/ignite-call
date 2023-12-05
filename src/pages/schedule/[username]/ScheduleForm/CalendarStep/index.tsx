import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [availability, setAvailability] = useState<Availability | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

  async function handleSelectedDate(date: Date | null) {
    if (!date) return

    api
      .get<Availability>(`/users/${username}/availability`, {
        params: {
          date: dayjs(date).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        setAvailability(response.data)
      })
  }

  return (
    <Calendar.Root>
      <Calendar.Table onDateSelected={handleSelectedDate} />

      <Calendar.TimePicker>
        <Calendar.TimePickerHeader />
        <Calendar.TimePickerContent>
          {availability?.possibleTimes.map((time) => {
            const hours = Math.trunc(time)
            const minutes = (time - hours) * 60

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
