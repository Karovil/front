import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PatientService } from '../../services/patient.service'; 

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private patientService: PatientService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/authentication']);
  }

  login(): void {
    this.authService.authenticate(this.email, this.password)
      .subscribe(
        (response) => {
          this.patientService.setLoggedInUser(response.userId);
          if (response.role === 'administrator') {
            this.router.navigate(['/administrator']);
          } else if (response.role === 'doctor') {
            this.router.navigate(['/doctor']);
          } else if (response.role === 'patient') {
            this.router.navigate(['/patient']);
          } else {
            // Manejar otros roles o errores aquí
          }
          console.log('ID del usuario logueado:', response.userId);
        },
        (error) => {
          // Manejar errores de autenticación aquí
          console.error('Error de autenticación', error);
        }
      );
  }
}