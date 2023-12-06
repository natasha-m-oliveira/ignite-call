export function getTimeSlots(
  startTime: number,
  endTime: number,
  interval: number,
): number[] {
  const times: number[] = []

  let currentTime = startTime
  while (currentTime < endTime) {
    times.push(currentTime)

    currentTime += interval
  }

  return times
}
