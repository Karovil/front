import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { IPatient } from '../../interfaces/IPatient';
import { IDoctor } from '../../interfaces/IDoctor';
import { IAppointment } from '../../interfaces/IAppointment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  doctor: IDoctor | null = null;
  doctors: IDoctor[] = [];
  showDoctorList: boolean = false;
  appointment: IAppointment | null = null;
  appointments: IAppointment[] = [];
  showAppointmentList: boolean = false

  constructor(private patientService: PatientService, private doctorService: DoctorService, private appointmentService: AppointmentService) { }
  // Método para actualizar cita
  updateAppointment(updateForm: NgForm) {
    if (updateForm.invalid || !this.appointment) {
      return;
    }
  
    const date = updateForm.value.date;
    const time = updateForm.value.time;
    const combinedDateTime = new Date(`${date}T${time}:00`);
    const formattedDate = combinedDateTime.toISOString();
  
    const updatedAppointment: IAppointment = {
      appointmentId: this.appointment.appointmentId, // Usar el ID actual de la cita
      doctorId: updateForm.value.doctorId, // Solo el ID del doctor
      date: formattedDate,
      time: time, // Añadir esta línea
      surgery: updateForm.value.surgery,
      diagnostic: updateForm.value.diagnostic
    };
  
    this.appointmentService.updateAppointment(updatedAppointment).subscribe(
      () => {
        console.log('Cita actualizada');
        this.appointment = null;
        this.loadAllAppointments();
      },
      (error) => {
        console.error('Error al actualizar cita:', error);
        console.error("OBJETOOOOO", updatedAppointment);
        console.error(this.appointment?.doctorId);
      }
    );
  }
  

  // Otros métodos (createPatient, updatePatient, createDoctor, updateDoctor, etc.) no cambian.

  loadAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments) => {
        this.appointments = appointments;
      },
      (error) => {
        console.error('Error al cargar citas:', error);
      }
    );
  }

  toggleAppointmentList() {
    this.showAppointmentList = !this.showAppointmentList;
    if (this.showAppointmentList) {
      this.loadAllAppointments();
    }
  }

  editAppointment(appointment: IAppointment) {
    this.appointment = appointment;
  }
    // Método para eliminar cita
    deleteAppointment(id: number) {
      this.appointmentService.deleteAppointment(id).subscribe(
        () => {
          console.log('Cita eliminada');
          this.loadAllAppointments();
        },
        (error) => {
          console.error('Error al eliminar cita:', error);
        }
      );
    }
    
}

