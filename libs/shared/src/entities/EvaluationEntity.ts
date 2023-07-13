import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { EOperation } from '../consts';


@Entity('evaluations')
export class EvaluationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({ type: 'double precision' })
    public a: number;
  
    @Column({ type: 'double precision' })
    public b: number;
  
    @Column({ type: 'varchar', length: 16 })
    public op: EOperation;
  
    @Column({ type: 'double precision', nullable: true })
    public result: number | null;
}
  