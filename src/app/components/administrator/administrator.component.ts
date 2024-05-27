// administrator.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { IPatient } from '../../interfaces/IPatient';
import { IDoctor } from '../../interfaces/IDoctor';
import { IAppointment } from '../../interfaces/IAppointment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  patient: IPatient | null = null;
  patients: IPatient[] = [];
  showPatientList: boolean = false;
  doctor: IDoctor | null = null;
  doctors: IDoctor[] = [];
  showDoctorList: boolean = false;
  appointment: IAppointment | null = null;
  appointments: IAppointment[] = [];
  showAppointmentList: boolean = false;

  constructor(private patientService: PatientService, private doctorService: DoctorService, private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.loadAllDoctors();
    this.loadAllPatients();
    this.loadAllAppointments();
  }

  // Método para crear paciente
  createPatient(patientForm: NgForm) {
    const newPatient: IPatient = {
      patientId: 0,
      name: patientForm.value.name,
      age: patientForm.value.age,
      rh: patientForm.value.rh,
      email: patientForm.value.email,
      password: patientForm.value.password,
    };

    this.patientService.createPatient(newPatient).subscribe(
      (response) => {
        console.log('Paciente creado:', response);
        this.loadAllPatients();
        patientForm.resetForm();
      },
      (error) => {
        console.error('Error al crear paciente:', error);
      }
    );
  }

  // Método para actualizar paciente
  updatePatient(updateForm: NgForm) {
    if (updateForm.invalid || !this.patient) {
      return;
    }
    const updatedPatient: IPatient = {
      ...this.patient,
      ...updateForm.value
    };

    this.patientService.updatePatient(updatedPatient).subscribe(
      () => {
        console.log('Paciente actualizado');
        this.patient = null;
        this.loadAllPatients();
      },
      (error) => {
        console.error('Error al actualizar paciente:', error);
      }
    );
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe(
      () => {
        console.log('Paciente eliminado');
        this.loadAllPatients();
      },
      (error) => {
        console.error('Error al eliminar paciente:', error);
      }
    );
  }

  loadAllPatients() {
    console.log('Loading all patients');
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        console.log('Pacientes cargados:', patients);
        this.patients = patients;
      },
      (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

  togglePatientList() {
    this.showPatientList = !this.showPatientList;
    if (this.showPatientList) {
      this.loadAllPatients();
    }
  }

  editPatient(patient: IPatient) {
    this.patient = patient;
  }

  // Método para crear doctor
  createDoctor(doctorForm: NgForm) {
    const newDoctor: IDoctor = {
      doctorId: 0,
      name: doctorForm.value.name,
      specialization: doctorForm.value.specialization,
      email: doctorForm.value.email,
      password: doctorForm.value.password

    };

    this.doctorService.createDoctor(newDoctor).subscribe(
      (response) => {
        console.log('Doctor creado:', response);
        this.loadAllDoctors();
        doctorForm.resetForm();
      },
      (error) => {
        console.error('Error al crear Doctor:', error);
      }
    );
  }

  // Método para actualizar doctor
  updateDoctor(updateForm: NgForm) {
    if (updateForm.invalid || !this.doctor) {
      return;
    }

    const updatedDoctor: IDoctor = {
      ...this.doctor,
      ...updateForm.value
    };

    this.doctorService.updateDoctor(updatedDoctor).subscribe(
      () => {
        console.log('Doctor actualizado');
        this.doctor = null;
        this.loadAllDoctors();
      },
      (error) => {
        console.error('Error al actualizar doctor:', error);
      }
    );
  }

  // Método para eliminar doctor
  deleteDoctor(id: number) {
    this.doctorService.deleteDoctor(id).subscribe(
      () => {
        console.log('Doctor eliminado');
        this.loadAllDoctors();
      },
      (error) => {
        console.error('Error al eliminar Doctor:', error);
      }
    );
  }

  // Método para cargar todos los doctores
  loadAllDoctors() {
    console.log('Loading all doctors');
    this.doctorService.getAllDoctors().subscribe(
      (doctors) => {
        console.log('Doctores cargados:', doctors);
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error al cargar doctores:', error);
      }
    );
  }

  // Método para alternar la lista de doctores
  toggleDoctorList() {
    this.showDoctorList = !this.showDoctorList;
    if (this.showDoctorList) {
      this.loadAllDoctors();
    }
  }

  // Método para editar doctor
  editDoctor(doctor: IDoctor) {
    this.doctor = doctor;
  }

  createAppointment(appointmentForm: NgForm) {
    const date = appointmentForm.value.date;
    const time = appointmentForm.value.time;
    const combinedDateTime = new Date(`${date}T${time}:00`);
    const formattedDate = combinedDateTime.toISOString();

    const newAppointment: IAppointment = {
      appointmentId: 0,
      doctorId: appointmentForm.value.doctorId,
      date: formattedDate,
      time: time, // Añadir esta línea
      surgery: appointmentForm.value.surgery,
      diagnostic: appointmentForm.value.diagnostic
    };

    this.appointmentService.createAppointment(newAppointment).subscribe(
      (response) => {
        console.log('Cita creada:', response);
        this.loadAllAppointments();
        appointmentForm.resetForm();
      },
      (error) => {
        console.error('Error al crear cita:', error);
      }
    );
  }

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


