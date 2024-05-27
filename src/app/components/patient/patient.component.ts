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
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
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

  

}
