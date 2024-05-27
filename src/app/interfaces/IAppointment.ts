import { IPatient } from '..//interfaces/IPatient';
import { IDoctor } from '..//interfaces/IDoctor';
export interface IAppointment {
  appointmentId: number;
  doctorId: number;
  patientId?: IPatient;
  date: string;
  time: string; // Añadir esta línea
  surgery: string;
  diagnostic: string;
}