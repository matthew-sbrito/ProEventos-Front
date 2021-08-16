import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';

import { ContatosComponent } from './components/contatos/contatos.component';

import { EventosComponent } from './components/eventos/eventos.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import { HomeComponent } from './components/layout/home/home.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'eventos', pathMatch: 'full' },
      {
        path: 'eventos',
        component: EventosComponent,
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'detalhe/:id', component: EventoDetalheComponent },
          { path: 'detalhe', component: EventoDetalheComponent },
          { path: 'lista', component: EventoListaComponent },
        ],
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'palestrantes', component: PalestrantesComponent },
      { path: 'contatos', component: ContatosComponent },
      {
        path: 'user',
        component: UserComponent,
        children: [{ path: 'perfil', component: PerfilComponent }],
      },
    ],
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path : '', redirectTo: 'login', pathMatch : 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
