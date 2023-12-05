export function getTimeSlots(
  startHour: number,
  endHour: number,
  intervalInHours: number,
): number[] {
  const times: number[] = []

  let currentHour = startHour
  while (currentHour <= endHour) {
    times.push(currentHour)

    currentHour += intervalInHours
  }

  return times
}
