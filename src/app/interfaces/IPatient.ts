import { IAppointment } from '..//interfaces/IAppointment';
export interface IPatient {
    patientId: number; 
    name: string,
    age: number,
    rh: string,
    email: string,
    password: string,
    appointments?: IAppointment[];
}