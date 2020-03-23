import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClientAccount, ClientAccount } from 'app/shared/model/products/client-account.model';
import { ClientAccountService } from './client-account.service';
import { IProduct } from 'app/shared/model/products/product.model';
import { ProductService } from 'app/entities/products/product/product.service';

@Component({
  selector: 'jhi-client-account-update',
  templateUrl: './client-account-update.component.html'
})
export class ClientAccountUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    customerID: [null, [Validators.required]],
    iban: [null, [Validators.required]],
    name: [null, [Validators.required]],
    ballance: [null, [Validators.required]],
    userId: [null, [Validators.required]],
    type: [null, Validators.required]
  });

  constructor(
    protected clientAccountService: ClientAccountService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientAccount }) => {
      this.updateForm(clientAccount);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(clientAccount: IClientAccount): void {
    this.editForm.patchValue({
      id: clientAccount.id,
      customerID: clientAccount.customerID,
      iban: clientAccount.iban,
      name: clientAccount.name,
      ballance: clientAccount.ballance,
      userId: clientAccount.userId,
      type: clientAccount.type
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clientAccount = this.createFromForm();
    if (clientAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.clientAccountService.update(clientAccount));
    } else {
      this.subscribeToSaveResponse(this.clientAccountService.create(clientAccount));
    }
  }

  private createFromForm(): IClientAccount {
    return {
      ...new ClientAccount(),
      id: this.editForm.get(['id'])!.value,
      customerID: this.editForm.get(['customerID'])!.value,
      iban: this.editForm.get(['iban'])!.value,
      name: this.editForm.get(['name'])!.value,
      ballance: this.editForm.get(['ballance'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      type: this.editForm.get(['type'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientAccount>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProduct): any {
    return item.id;
  }
}
