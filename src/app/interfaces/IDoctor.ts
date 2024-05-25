import { IAppointment } from '..//interfaces/IAppointment';
export interface IDoctor {
    doctorId: number,
    name: string,
    specialization: string,
    email: string,
    password: string
    appointments?: IAppointment[];
  }