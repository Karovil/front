import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  authenticate(authenticationForm: NgForm) {
    if (authenticationForm.valid) {
      const email = authenticationForm.value.email;
      const password = authenticationForm.value.password;
  
      console.log('Email:', email);
      console.log('Password:', password);
  
      this.authService.authenticate(email, password)
        .subscribe(
          (response) => {
            console.log('Respuesta de la API:', response);
            if (response.role === 'administrator') {
              this.router.navigate(['/administrator']);
            } else if (response.role === 'doctor') {
              this.router.navigate(['/doctor']);
            } else if (response.role === 'patient') {
              this.router.navigate(['/patient']);
            } else {
              // Manejar otros roles o errores aquí
            }
          },
          (error) => {
            console.error('Error de autenticación', error);
          }
        );
    } else {
      console.error('Formulario inválido');
    }
  }
  
}
