import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TransactionService } from 'app/entities/transactions/transaction/transaction.service';
import { ITransactionDTO } from 'app/shared/model/transactions/transactionDTO.model';

@Component({
  selector: 'jhi-transaction-validation',
  templateUrl: './transaction-validation.component.html',
  styleUrls: ['./transaction-validation.component.scss']
})
export class TransactionValidationComponent implements OnInit {
  isSaving = false;
  private file: File | null | undefined;
  failedTransactions: ITransactionDTO[] | undefined = [];
  editForm = this.fb.group({
    file: [null, Validators.required]
  });
  success: boolean | undefined = false;

  constructor(protected eventManager: JhiEventManager, protected service: TransactionService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  setFileData(files: FileList): void {
    this.file = files.item(0);
    // this is a workaround for the angular reactive forms not having support for file inputs so that we don't have to build a custom element
    // in production you would build a custom form control for this
    this.editForm.controls['file'].setErrors(null);
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.service.validate(this.file!!));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<{ failedItems: ITransactionDTO[]; success: boolean }>>): void {
    result.subscribe(
      res => {
        this.isSaving = false;
        this.success = res?.body?.success;
        if (!this.success) {
          this.failedTransactions = res?.body?.failedItems;
        }
      },
      () => this.onSaveError()
    );
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
