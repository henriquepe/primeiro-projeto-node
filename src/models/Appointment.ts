import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// entity is something who will be saved in DB.

import User from './User';

// models fica com a responsabilidade de cuidar de um modelo de dados para informacao
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Omit pega o tipo de variavel que quero usar e 'exclui'
  // alguma propriedade que eu nao quero que apareca.
}

export default Appointment;

/*




*/
