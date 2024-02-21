import { DeleteDateColumn } from 'typeorm'

export class SoftDeleteModel {
  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date
}
