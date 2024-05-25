import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctor } from '../interfaces/IDoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5044/api/Doctor';

  constructor(private http: HttpClient) {}

  createDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this.http.post<IDoctor>(`${this.apiUrl}/Create`, doctor);
  }

  updateDoctor(doctor: IDoctor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Update`, doctor);
  }

  deleteDoctor(doctorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete?doctorId=${doctorId}`);
  }

  getAllDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(`${this.apiUrl}/GetAll`);
  }

  getByIdDoctor(doctorId: number):Observable<IDoctor>{
    return this.http.get<IDoctor>(`${this.apiUrl}/GetById?doctorId=${doctorId}`);
  }

}
