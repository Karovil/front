import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from '../interfaces/IPatient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:5044/api/Patient';

  constructor(private http: HttpClient) {}

  createPatient(patient: IPatient): Observable<IPatient> {
    console.log('Creating patient:', patient);
    return this.http.post<IPatient>(`${this.apiUrl}/Create`, patient);
  }

  updatePatient(patient: IPatient): Observable<void> {
    console.log('Updating patient:', patient);
    return this.http.put<void>(`${this.apiUrl}/Update`, patient);
  }

  deletePatient(patientId: number): Observable<void> {
    console.log('Deleting patient with id:', patientId);
    return this.http.delete<void>(`${this.apiUrl}/Delete?patientId=${patientId}`);
  }

  getAllPatients(): Observable<IPatient[]> {
    console.log('Fetching all patients');
    return this.http.get<IPatient[]>(`${this.apiUrl}/GetAll`);
  }

  getByIdPatient(patientId: number): Observable<IPatient> {
    console.log('Fetching patient by id:', patientId);
    return this.http.get<IPatient>(`${this.apiUrl}/GetById?patientId=${patientId}`);
  }
}
