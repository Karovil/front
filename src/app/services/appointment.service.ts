import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppointment } from '../interfaces/IAppointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:5044/api/Appointment';

  constructor(private http: HttpClient) {}

  createAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.http.post<IAppointment>(`${this.apiUrl}/Create`, appointment);
  }

  updateAppointment(appointment: IAppointment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Update`, appointment);
  }

  deleteAppointment(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete?appointmentId=${appointmentId}`);
  }

  getAllAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.apiUrl}/GetAll`);
  }

  getByIdAppointment(appointmentId: number):Observable<IAppointment>{
    return this.http.get<IAppointment>(`${this.apiUrl}/GetById?appointmentId=${appointmentId}`);
  }

  getAppointmentsByAge(age: number): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.apiUrl}/GetByAge?age=${age}`);
  }

  getFreeAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.apiUrl}/GetFree`);
  }

  getAppointmentsByPatient(patientId: number): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.apiUrl}/GetByPatient?patientId=${patientId}`);
  }

}
