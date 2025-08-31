import { provideRouter, Routes } from '@angular/router';
import { SignupComponent } from './auth-components/signup/signup.component';

export const routes: Routes = [
    {path: 'signup', component: SignupComponent}
    ,{path: '', redirectTo: 'signup', pathMatch: 'full'}
    ,{path: '**', redirectTo: 'signup'}
];

export const appRouting = provideRouter(routes);
