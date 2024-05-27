import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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

  constructor(private authService: AuthenticationService, private router: Router) { }

  login(): void {
    console.error(this.email, this.password);
    this.authService.authenticate(this.email, this.password)
      .subscribe(
        (response) => {
          console.log("Dentro del subs");
          if (response.role === 'administrator') {
            this.router.navigate(['/administrator']);
          } else if (response.role === 'doctor') {
            // Redirigir al panel de doctor
            this.router.navigate(['/doctor']);
          } else if (response.role === 'patient') {
            // Redirigir al panel de paciente
            this.router.navigate(['/patient']);
          } else {
            // Manejar otros roles o errores aquí
          }
        },
        (error) => {
          // Manejar errores de autenticación aquí
        }
      );
  }
}
