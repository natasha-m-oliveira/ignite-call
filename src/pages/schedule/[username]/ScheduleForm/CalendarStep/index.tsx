import { Calendar } from '@/components/Calendar'

export function CalendarStep() {
  return (
    <Calendar.Root isTimePickerOpen>
      <Calendar.Table />

      <Calendar.TimePicker>
        <Calendar.TimePickerHeader />
        <Calendar.TimePickerContent>
          <Calendar.TimePickerItem>08:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>09:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>10:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>11:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>12:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>13:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>14:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>15:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>16:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>17:00</Calendar.TimePickerItem>
          <Calendar.TimePickerItem>18:00</Calendar.TimePickerItem>
        </Calendar.TimePickerContent>
      </Calendar.TimePicker>
    </Calendar.Root>
  )
}
