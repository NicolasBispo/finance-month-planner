export default interface Receipt {
  id: number
  receipt_day: Date
  receipt_type: string
  value: number
  planning_id: number
  created_at: Date
  updated_at: Date
}