import { format } from 'date-fns'

export function readableTimestamp(val) {
  if (!val || val === -1) return 'N/A'
  return format(val, 'MM/dd/yyyy')
}
