import { provideRouter, Routes } from '@angular/router';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LoginComponent } from './auth-components/login/login.component';

export const routes: Routes = [
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent}
    ,{path: '', redirectTo: 'signup', pathMatch: 'full'}
    ,{path: '**', redirectTo: 'signup'}
];

export const appRouting = provideRouter(routes);
