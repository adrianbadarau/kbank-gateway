import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BankSharedModule } from 'app/shared/shared.module';
import { ClientAccountComponent } from './client-account.component';
import { ClientAccountDetailComponent } from './client-account-detail.component';
import { ClientAccountUpdateComponent } from './client-account-update.component';
import { ClientAccountDeleteDialogComponent } from './client-account-delete-dialog.component';
import { clientAccountRoute } from './client-account.route';

@NgModule({
  imports: [BankSharedModule, RouterModule.forChild(clientAccountRoute)],
  declarations: [ClientAccountComponent, ClientAccountDetailComponent, ClientAccountUpdateComponent, ClientAccountDeleteDialogComponent],
  entryComponents: [ClientAccountDeleteDialogComponent]
})
export class ProductsClientAccountModule {}
