export default interface FixedExpense {
  id: number
  expense_type: string
  company_name: string
  value: number
  due_date: Date
  paid_every: number
  is_paid: boolean
  was_paid_day: Date
  is_financed: boolean
  times_financed: number
  current_finance: number
  overdue: boolean
  planning_id: number
  created_at: Date
  updated_at: Date
}