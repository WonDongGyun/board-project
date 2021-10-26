import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';
import { Boards } from './board.entity';

@Entity('users')
export class Users {
	@PrimaryColumn({ type: 'varchar' })
	userId!: string;

	@Column({ type: 'varchar' })
	password!: string;

	@Column({ type: 'varchar' })
	userName!: string;

	@OneToMany(() => Boards, (boards) => boards.users, {
		onDelete: 'CASCADE'
	})
	boards?: Boards[];

	@CreateDateColumn()
	createdDt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
