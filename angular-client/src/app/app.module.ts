import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PrivateProposalsComponent } from './private-proposals/private-proposals.component';
import { PublicProposalsComponent } from './public-proposals/public-proposals.component';
import { CallbackComponent } from './callback.component';
import { AuthService } from './auth/auth.service';
import { ProposalService } from './proposal.service';
import { HttpClientModule } from '@angular/common/http';

import {sharedService} from './sharedService';


@NgModule({
  declarations: [
    AppComponent,
    PublicProposalsComponent,
    PrivateProposalsComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ProposalService,
    sharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
