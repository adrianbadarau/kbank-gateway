import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransaction } from 'app/shared/model/transactions/transaction.model';
import { ITransactionDTO } from 'app/shared/model/transactions/transactionDTO.model';

type EntityResponseType = HttpResponse<ITransaction>;
type EntityArrayResponseType = HttpResponse<ITransaction[]>;
type EntityCsvValidationResponseType = HttpResponse<{ failedItems: ITransactionDTO[]; success: boolean }>;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  public resourceUrl = SERVER_API_URL + 'services/transactions/api/transactions';

  constructor(protected http: HttpClient) {}

  create(transaction: ITransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .post<ITransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transaction: ITransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .put<ITransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransaction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  validate(csv: File): Observable<EntityCsvValidationResponseType> {
    const formData = new FormData();
    formData.append('file', csv, csv.name);
    return this.http.post<{ failedItems: ITransactionDTO[]; success: boolean }>(`${this.resourceUrl}/validate`, formData, {
      observe: 'response'
    });
  }

  protected convertDateFromClient(transaction: ITransaction): ITransaction {
    const copy: ITransaction = Object.assign({}, transaction, {
      date: transaction.date && transaction.date.isValid() ? transaction.date.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transaction: ITransaction) => {
        transaction.date = transaction.date ? moment(transaction.date) : undefined;
      });
    }
    return res;
  }
}
