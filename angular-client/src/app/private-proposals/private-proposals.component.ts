import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProposalService } from '../proposal.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-private-proposals',
  templateUrl: './private-proposals.component.html',
  styleUrls: ['./private-proposals.component.css']
})
export class PrivateProposalsComponent implements OnInit, OnDestroy {
  proposalsSub: Subscription;
  privateProposals: Proposal[];
  error: any;

  constructor(
    public proposalService: ProposalService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.proposalsSub = this.proposalService
      .getPrivateProposals()
      .subscribe(
        proposals => this.privateProposals = proposals,
        err => error => this.error = err
      );
  }

  ngOnDestroy() {
    this.proposalsSub.unsubscribe();
  }

}
