import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthentication } from '../interfaces/IAuthentication';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:5044/api/Authentication';

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Authenticate`, { email, password });
  }
  logout(): void {
    // Aquí puedes agregar lógica para limpiar el almacenamiento local o cualquier otra tarea de limpieza
    localStorage.removeItem('authToken');
  }
}
