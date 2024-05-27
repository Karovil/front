import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { IAppointment } from '../../interfaces/IAppointment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  loggedInUserId: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.patientService.getLoggedInUser();
    if (loggedInUser) {
      this.loggedInUserId = loggedInUser;
      console.log("ID DEL DOCTOR: " + loggedInUser)
    } else {
      console.error('No se pudo obtener el ID del usuario logueado.');
    }
  }

  createAppointment(appointmentForm: NgForm): void {
    if (this.loggedInUserId) {
      const date = appointmentForm.value.date;
      const time = appointmentForm.value.time;
      const combinedDateTime = new Date(`${date}T${time}:00`);
      const formattedDate = combinedDateTime.toISOString();
  
      const newAppointment: IAppointment = {
        appointmentId: 0, // Este valor probablemente será ignorado por el backend
        doctorId: this.loggedInUserId,
        date: formattedDate,
        time: time,
        surgery: appointmentForm.value.surgery,
        diagnostic: appointmentForm.value.diagnostic
      };
  
      this.appointmentService.createAppointment(newAppointment).subscribe(
        (response) => {
          console.log('Cita creada:', response);
          appointmentForm.resetForm();
          // Realizar cualquier otra acción necesaria después de crear la cita
        },
        (error) => {
          console.error('Error al crear cita:', error);
        }
      );
    } else {
      console.error('No se puede crear la cita porque el ID del doctor no está disponible.');
    }
  }
  
}
