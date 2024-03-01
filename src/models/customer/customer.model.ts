import { CustomerStatus } from '@/constants'
import { generateId } from '@/utils'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { BaseModel } from '../base/base.model'

@Entity({ name: 'customers' })
export class Customer extends BaseModel {
	@Column({ type: 'varchar', length: '255', nullable: false })
	first_name: string

	@Column({ type: 'varchar', length: '255', nullable: true })
	middle_name: string

	@Column({ type: 'varchar', length: '255', nullable: false })
	last_name: string

	@Column({ type: 'varchar', length: '255', nullable: false })
	email: string

	@Column({ type: 'text', nullable: false })
	password: string

	@Column({
		type: 'enum',
		enum: CustomerStatus,
		default: CustomerStatus.ACTIVE,
	})
	status: CustomerStatus

	@BeforeInsert()
	private beforeInsert(): void {
		this.id = generateId(this.id, 'customer')
	}
}
