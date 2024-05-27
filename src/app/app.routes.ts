import { Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DoctorComponent } from './components/doctor/doctor.component';

export const routes: Routes = [
    { path: '', redirectTo: '/authentication', pathMatch: 'full' },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'administrator', component: AdministratorComponent },
    { path: 'doctor', component: DoctorComponent },
];
