import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// entity is something who will be saved in DB.

// models fica com a responsabilidade de cuidar de um modelo de dados para informacao
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Omit pega o tipo de variavel que quero usar e 'exclui'
  // alguma propriedade que eu nao quero que apareca.
}

export default User;

/*




*/
