import { Component, OnInit } from '@angular/core';
import { IAppointment } from '../../interfaces/IAppointment';
import { PatientService } from '../../services/patient.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  availableAppointments: IAppointment[] = [];
  myAppointments: IAppointment[] = [];
  loggedInPatientId: number | undefined;

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    const loggedInPatient = this.patientService.getLoggedInUser();
    if (loggedInPatient) {
      this.loggedInPatientId = loggedInPatient.patientId;
      this.loadAvailableAppointments();
      this.loadMyAppointments();
    }
  }

  loadAvailableAppointments(): void {
    if (this.loggedInPatientId) {
      this.appointmentService.getAppointmentsByAge(this.loggedInPatientId).subscribe(
        appointments => {
          this.availableAppointments = appointments.filter(appointment => !appointment.patientId);
        },
        error => {
          console.error('Error fetching available appointments:', error);
        }
      );
    }
  }

  loadMyAppointments(): void {
    if (this.loggedInPatientId) {
      this.appointmentService.getAppointmentsByAge(this.loggedInPatientId).subscribe(
        appointments => {
          this.myAppointments = appointments.filter(appointment => appointment.patientId === this.loggedInPatientId);
        },
        error => {
          console.error('Error fetching patient appointments:', error);
        }
      );
    }
  }

  assignAppointment(appointment: IAppointment): void {
    if (this.loggedInPatientId) {
      appointment.patientId = this.loggedInPatientId;
      this.appointmentService.updateAppointment(appointment).subscribe(
        () => {
          console.log('Appointment assigned successfully');
          this.loadAvailableAppointments();
          this.loadMyAppointments();
        },
        error => {
          console.error('Error assigning appointment:', error);
        }
      );
    }
  }

  cancelAppointment(appointment: IAppointment): void {
    appointment.patientId = undefined;
    this.appointmentService.updateAppointment(appointment).subscribe(
      () => {
        console.log('Appointment cancelled successfully');
        this.loadAvailableAppointments();
        this.loadMyAppointments();
      },
      error => {
        console.error('Error cancelling appointment:', error);
      }
    );
  }
}