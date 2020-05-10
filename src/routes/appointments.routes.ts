// Responsabilidade da Rota: REceber uma requisicao, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

// Tudo oque eh transformacao de dados eu deixo na rota
// regras de negocio dentro dos services

// parseISO coverte uma string para um formato DATE
// startOfHour vai pegar um valor de tempo e vai definir o comeco da hora
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

interface Request {
  provider: string;
  date: Date;
}

// Router eh uma funcao do express que me permite utilizar as rotas do express (ger, post, put, delete).
// com essa funcao habilitada eu posso agora a partir da variavel appointmentsRouter chamar todas essas funcoes.
const appointmentsRouter = Router();

// no index.ts foi definido routes.use('/appointments', appointmentsRouter); portanto nao preciso
// escrever novamente o '/appointments' nessa requisicao, basta o '/'.
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// no index.ts foi definido routes.use('/appointments', appointmentsRouter); portanto nao preciso
// escrever novamente o '/appointments' nessa requisicao, basta o '/'.
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    // crio um objeto da regra de negocio, mando para ele o array de appointments,
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
