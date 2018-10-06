import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Proposal } from './proposal';
import { environment } from '../environments/environment';

@Injectable()
export class ProposalService {
  // Define the routes we are going to interact with
   baseUrl = environment.baseUrl;

  private privateProposalsUrl : string;
  private publicProposalsUrl: string; //http://localhost:5000/proposals?top=5&skip=0

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
   
   this.publicProposalsUrl = this.baseUrl+'/proposals?top=5&skip=0';
  
  }

  // Implement a method to get the public proposals
  getPublicProposals(loanAmount, tenure) {
    let data = { loanAmount : loanAmount, tenure: tenure };  
    let params = new HttpParams()
                .set('loanAmount', loanAmount)
                .set('tenure', tenure);
    const params2 = new HttpParams().set('top', "3").set('skip', "0");
     console.log(params.toString());
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    
    
    return this.http
      .get<Proposal[]>(this.publicProposalsUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to get the private proposals
  getPrivateProposals() {
    return this.http
      .get<Proposal[]>(this.privateProposalsUrl, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
