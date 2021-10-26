import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Users } from './user.entity';

@Entity('boards')
export class Boards {
	@PrimaryGeneratedColumn('increment')
	boardId!: string;

	@Column({ type: 'varchar' })
	title!: string;

	@Column({ type: 'varchar' })
	contents!: string;

	@ManyToOne(() => Users, (users) => users.boards, { lazy: true })
	@JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
	users: Users;

	@CreateDateColumn()
	createdDt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
