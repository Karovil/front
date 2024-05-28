import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { IAppointment } from '../../interfaces/IAppointment';
import { CommonModule } from '@angular/common';
import { IDoctor } from '../../interfaces/IDoctor';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  loggedInUserId: number = 0; // Asignación de un valor predeterminado
  appointments: IAppointment[] = [];
  selectedAppointment: IAppointment | null = null; // Nueva propiedad para almacenar la cita seleccionada
  doctors: IDoctor[] = [];
  showAppointments: boolean = false; // Para controlar el despliegue de citas

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.patientService.getLoggedInUser();
    if (loggedInUser) {
      this.loggedInUserId = loggedInUser;
      console.log("ID DEL DOCTOR: " + loggedInUser);
      this.getDoctorAppointments(this.loggedInUserId); // Llamar a getDoctorAppointments aquí
    } else {
      console.error('No se pudo obtener el ID del usuario logueado.');
    }
  }

  createAppointment(appointmentForm: NgForm): void {
    if (this.loggedInUserId) {
      const date = appointmentForm.value.date;
      const time = appointmentForm.value.time;
      const combinedDateTimeString = date + 'T' + time + ':00';
      const combinedDateTime = new Date(combinedDateTimeString);
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
          this.getDoctorAppointments(this.loggedInUserId); // Actualizar la lista de citas
        },
        (error) => {
          console.error('Error al crear cita:', error);
        }
      );
    } else {
      console.error('No se puede crear la cita porque el ID del doctor no está disponible.');
    }
  }
  
  getDoctorAppointments(loggedInUser: number): void {
    if (loggedInUser !== null) {
      this.doctorService.getByIdDoctor(loggedInUser).subscribe(
        (loggedInUser) => {
          this.appointments = loggedInUser.appointments || [];
        },
        (error) => {
          console.error('Error al obtener las citas del doctor:', error);
        }
      );
    }
  }

  // Método para eliminar cita
  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => {
        console.log('Cita eliminada');
        this.getDoctorAppointments(this.loggedInUserId);
      },
      (error) => {
        console.error('Error al eliminar cita:', error);
      }
    );
  }

  // Método para actualizar cita
  updateAppointment(updateForm: NgForm) {
    if (updateForm.invalid || !this.selectedAppointment) {
      return;
    }
  
    const date = updateForm.value.editDate;
    const time = updateForm.value.editTime;
    const combinedDateTimeString = date + 'T' + time + ':00';
    const combinedDateTime = new Date(combinedDateTimeString);
    const formattedDate = combinedDateTime.toISOString();
  
    console.log('Datos del formulario:');
    console.log('Fecha:', date);
    console.log('Hora:', time);
    console.log('Cirugía:', updateForm.value.editSurgery);
    console.log('Diagnóstico:', updateForm.value.editDiagnostic);
  
    const updatedAppointment: IAppointment = {
      appointmentId: this.selectedAppointment.appointmentId, // Usar el ID de la cita seleccionada
      doctorId: this.loggedInUserId || 0, // Usar el ID del doctor logueado o un valor predeterminado si es nulo
      date: formattedDate,
      time: time,
      surgery: updateForm.value.editSurgery,
      diagnostic: updateForm.value.editDiagnostic
    };
  
    this.appointmentService.updateAppointment(updatedAppointment).subscribe(
      () => {
        console.log('Cita actualizada');
        this.getDoctorAppointments(this.loggedInUserId);
      },
      (error) => {
        console.error('Error al actualizar cita:', error);
        console.error('PRUEBA:', updatedAppointment);
      }
    );
  }

  editAppointment(appointment: IAppointment) {
    this.selectedAppointment = appointment; // Al hacer clic en el botón de editar, asignamos la cita seleccionada
  }

  toggleAppointments(): void {
    this.showAppointments = !this.showAppointments;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/authentication']);
  }
}