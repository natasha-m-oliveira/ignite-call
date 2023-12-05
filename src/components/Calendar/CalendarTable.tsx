import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  Body,
  Day,
  Header,
  HeaderActions,
  HeaderTitle,
  Table,
} from './CalendarTable.styles'
import { getWeekDays } from '@/utils/get-week-days'

export function CalendarTable() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <Table>
      <Header>
        <HeaderTitle>
          Dezembro <span>2023</span>
        </HeaderTitle>

        <HeaderActions>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </HeaderActions>
      </Header>

      <Body>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Day disabled>1</Day>
            </td>
            <td>
              <Day>2</Day>
            </td>
          </tr>
        </tbody>
      </Body>
    </Table>
  )
}
