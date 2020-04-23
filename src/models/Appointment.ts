import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// entity is something who will be saved in DB.

// models fica com a responsabilidade de cuidar de um modelo de dados para informacao
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Omit pega o tipo de variavel que quero usar e 'exclui'
  // alguma propriedade que eu nao quero que apareca.
}

export default Appointment;
