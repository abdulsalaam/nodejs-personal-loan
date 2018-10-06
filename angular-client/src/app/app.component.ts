import { Component, OnInit  } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PublicProposalsComponent } from './public-proposals/public-proposals.component';
import {sharedService} from './sharedService';
import { ProposalService } from './proposal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav class="navbar navbar-default">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/">{{ title }}</a>
        </div>
        <ul class="nav navbar-nav">
          <li>
            <a routerLink="/proposals" routerLinkActive="active">Proposals</a>
          </li>
          <li>
            <a routerLink="/special" *ngIf="authService.isLoggedIn" routerLinkActive="active">Private Proposals</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a *ngIf="!authService.isLoggedIn" (click)="authService.login()">Log In</a>
          </li>
          <li>
            <a (click)="authService.logout()" *ngIf="authService.isLoggedIn">Log Out</a>
          </li>
        </ul>
      </nav>
    <div class="row"  style="margin:0 30px 5px 0">
    <form class="form-inline search-width pull-right">
    <div class="form-group">
    <span><strong>RM</strong></span>
    <input #loanAmountVal class="search form-control" type="text" id="loanAmount" name="loanAmount" [(ngModel)]="loanAmount">
    <span><strong>for</strong></span>
    <select #tenureVal class="form-control" id="tenure" name="tenure" [(ngModel)]="tenure">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    
    <button class="btn btn-success" type="button" (click)="getLoanProposals(loanAmountVal.value, tenureVal.value)">
    <i class="glyphicon glyphicon-search" aria-hidden="true"></i> Search
    </button>
    </div>    
    </form>
    </div>
    

    
    
      <div class="col-sm-12">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `.navbar-right { margin-right: 0px !important}`
  ]
})
export class AppComponent {
  title = 'Bank Loan Proposals';
  
  proposalsSubTemp: Subscription;
  error: any;
  loanAmount : number;
  tenure : number;

  constructor(
  public authService: AuthService,
  public proposalService: ProposalService,  
  private _sharedService : sharedService) {}
  
  ngOnInit(){
    this.loanAmount = 20000;
    this.tenure = 3;
    this.getLoanProposals(this.loanAmount,this.tenure);
    /*this.proposalsSubTemp = this.proposalService
      .getPublicProposals()
      .subscribe(
        proposals => { 
        this._sharedService.changemessage(proposals);         
        },
        err => this.error = err
      );*/
  } 
  
  getLoanProposals(loanAmountVal, tenureVal) {
    console.log('called',loanAmountVal,tenureVal);
    this.proposalsSubTemp = this.proposalService
      .getPublicProposals(loanAmountVal, tenureVal)
      .subscribe(
        proposals => { 
        this._sharedService.changemessage(proposals);         
        },
        err => this.error = err
      );
  }
}
