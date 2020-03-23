import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./products/product/product.module').then(m => m.ProductsProductModule)
      },
      {
        path: 'client-account',
        loadChildren: () => import('./products/client-account/client-account.module').then(m => m.ProductsClientAccountModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./transactions/transaction/transaction.module').then(m => m.TransactionsTransactionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BankEntityModule {}
