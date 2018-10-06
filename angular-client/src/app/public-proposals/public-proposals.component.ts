import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProposalService } from '../proposal.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Proposal } from '../proposal';
import {sharedService} from '../sharedService';

@Component({
  selector: 'app-public-proposals',
  templateUrl: './public-proposals.component.html',
  styleUrls: ['./public-proposals.component.css']
})
export class PublicProposalsComponent implements OnInit, OnDestroy {
  proposalsSub: Subscription;
  publicProposals: Proposal[];
  error: any;
  toggle = {};
  private messages:Array<any> = [];
  
  loanAmount: string;
  tenure: string;
  
  //proposalData: any;

  constructor(
    public proposalService: ProposalService,
    private _sharedService : sharedService,
    public authService: AuthService) { 
    this.toggle = {}; // init is required
    }

  ngOnInit() {
      /*setTimeout (() => {
         this.publicProposals = this._sharedService.getProposalData(); 
         console.log("Hello from setTimeout",this.publicProposals);
      }, 1000);*/
 

    this.proposalsSub = this._sharedService
      .currentmessage
      .subscribe(
        proposals => this.publicProposals = proposals,
        err => this.error = err
      );

    
    /*this.proposalsSub = this.proposalService
      .getPublicProposals()
      .subscribe(
        proposals => this.publicProposals = proposals,
        err => this.error = err
      );*/
      
    
    
  }
  
  /*
   calculateLoan(loanAmount,tenure) {
    console.log('caled from parent',loanAmount,tenure); 
    debugger
    if(this.loanAmount && this.tenure) {
      this.router.navigate(['user']);
    }else {
      alert("Please provide loan amount and tenure")
    }
  }*/
  
  onClicked(value:string){ 
    console.log('value from parent:',value)
    /*if(value!=''){  
    this.allProduct=this.allProduct.filter(res=>res.pname.startsWith(value));  
    }  
    else{  
      this._data.getAllProduct().subscribe(  
          (data:Product[])=>{  
            this.allProduct=data;  
          }  
        );  
    }  */
  }  

  ngOnDestroy() {
    this.proposalsSub.unsubscribe();
  }

}
