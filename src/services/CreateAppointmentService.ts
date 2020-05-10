import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

// Services fica com a responsabilidade de lidar com a regra de negocio => Agendamento apenas de hora em hora.
class CreateAppointmentService {
  // funcao execute => ira executar a regra do negocio.
  // funcao recebe como parametro provider e date tipado na interface Request que possui tipo Appointment.
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // convertendo a o horario em hora com minutos e segundos zerados.
    const appointmentDate = startOfHour(date);

    // vai nos appointments e condiciona, sera que a appointmentDate eh igual a data desse appointment que estou percorrendo?
    // se sim ele vai retornar o appointment percorrido para a variavel "findAppointmentInSameDate", se nao encontrar
    // vai retornar false.
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    // se o findAppointmentInSameDate retornar um agendamento com horario e data igual a outro agendamento, esta condicional
    // retornara um erro com a mensagem dizendo que o horario nao esta disponivel e para tentar outro.
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
