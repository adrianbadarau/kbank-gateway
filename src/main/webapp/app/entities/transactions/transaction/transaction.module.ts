import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BankSharedModule } from 'app/shared/shared.module';
import { TransactionComponent } from './transaction.component';
import { TransactionDetailComponent } from './transaction-detail.component';
import { TransactionUpdateComponent } from './transaction-update.component';
import { TransactionDeleteDialogComponent } from './transaction-delete-dialog.component';
import { transactionRoute } from './transaction.route';
import { TransactionValidationComponent } from './transaction-validation/transaction-validation.component';

@NgModule({
  imports: [BankSharedModule, RouterModule.forChild(transactionRoute)],
  declarations: [
    TransactionComponent,
    TransactionDetailComponent,
    TransactionUpdateComponent,
    TransactionDeleteDialogComponent,
    TransactionValidationComponent
  ],
  entryComponents: [TransactionDeleteDialogComponent]
})
export class TransactionsTransactionModule {}
