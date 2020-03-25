import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientAccount } from 'app/shared/model/products/client-account.model';
import { TransactionService } from 'app/entities/transactions/transaction/transaction.service';
import { ITransaction } from 'app/shared/model/transactions/transaction.model';

@Component({
  selector: 'jhi-client-account-detail',
  templateUrl: './client-account-detail.component.html'
})
export class ClientAccountDetailComponent implements OnInit {
  clientAccount: IClientAccount | null = null;
  transactions: ITransaction[] | null = [];

  constructor(protected activatedRoute: ActivatedRoute, protected transactionService: TransactionService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientAccount }) => (this.clientAccount = clientAccount));
    this.transactionService
      .query({ accountId: this.clientAccount?.customerID })
      .subscribe(transactions => (this.transactions = transactions.body));
  }

  previousState(): void {
    window.history.back();
  }
}
