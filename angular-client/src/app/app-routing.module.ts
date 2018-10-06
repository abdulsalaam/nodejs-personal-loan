import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback.component';
import { PublicProposalsComponent } from './public-proposals/public-proposals.component';
import { PrivateProposalsComponent } from './private-proposals/private-proposals.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'proposals',
    pathMatch: 'full'
  },
  {
    path: 'proposals',
    component: PublicProposalsComponent
  },
  {
    path: 'special',
    component: PrivateProposalsComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
