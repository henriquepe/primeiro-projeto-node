import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// predefine o '/appointments' nas rotas definidas no appointmentsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
