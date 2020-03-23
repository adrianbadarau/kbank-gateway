import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BankTestModule } from '../../../../test.module';
import { ClientAccountDetailComponent } from 'app/entities/products/client-account/client-account-detail.component';
import { ClientAccount } from 'app/shared/model/products/client-account.model';

describe('Component Tests', () => {
  describe('ClientAccount Management Detail Component', () => {
    let comp: ClientAccountDetailComponent;
    let fixture: ComponentFixture<ClientAccountDetailComponent>;
    const route = ({ data: of({ clientAccount: new ClientAccount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BankTestModule],
        declarations: [ClientAccountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ClientAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load clientAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clientAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
