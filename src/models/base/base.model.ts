import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export class BaseModel {
  @PrimaryColumn({ type: 'varchar', length: '128' })
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
