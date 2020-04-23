import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// Data Transfer Object

// o repositorio tem responsabilidade de criar, armazenar, ler, editar appointments
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // metodo recebe apenas parametro data (no caso a data passada para o formato
  // ISO e hora com minutos e segundos zerados
  // tipo de dado eh Appointment ou nulo caso nao recebe nenhum appointment no
  // metodo find.
  // Executa no array appointments o metodo fiError.;nd, procurando por igualdade entre
  // a data do appointment e a data do appointment que esta sendo criado.
  // se a data for igual sera retornado o appointment que esta sendo criado, se
  // nao, sera retornado nulo.
  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date)
    // );

    const findAppointment = await this.findOne({
      where: { date },
    });

    // metodo por definicao precisa retornar um Appointment ou nulo
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
