import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ClientAccountComponentsPage, ClientAccountDeleteDialog, ClientAccountUpdatePage } from './client-account.page-object';

const expect = chai.expect;

describe('ClientAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clientAccountComponentsPage: ClientAccountComponentsPage;
  let clientAccountUpdatePage: ClientAccountUpdatePage;
  let clientAccountDeleteDialog: ClientAccountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ClientAccounts', async () => {
    await navBarPage.goToEntity('client-account');
    clientAccountComponentsPage = new ClientAccountComponentsPage();
    await browser.wait(ec.visibilityOf(clientAccountComponentsPage.title), 5000);
    expect(await clientAccountComponentsPage.getTitle()).to.eq('bankApp.productsClientAccount.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(clientAccountComponentsPage.entities), ec.visibilityOf(clientAccountComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ClientAccount page', async () => {
    await clientAccountComponentsPage.clickOnCreateButton();
    clientAccountUpdatePage = new ClientAccountUpdatePage();
    expect(await clientAccountUpdatePage.getPageTitle()).to.eq('bankApp.productsClientAccount.home.createOrEditLabel');
    await clientAccountUpdatePage.cancel();
  });

  it('should create and save ClientAccounts', async () => {
    const nbButtonsBeforeCreate = await clientAccountComponentsPage.countDeleteButtons();

    await clientAccountComponentsPage.clickOnCreateButton();

    await promise.all([
      clientAccountUpdatePage.setCustomerIDInput('customerID'),
      clientAccountUpdatePage.setIbanInput('iban'),
      clientAccountUpdatePage.setNameInput('name'),
      clientAccountUpdatePage.setBallanceInput('5'),
      clientAccountUpdatePage.setUserIdInput('5')
    ]);

    expect(await clientAccountUpdatePage.getCustomerIDInput()).to.eq('customerID', 'Expected CustomerID value to be equals to customerID');
    expect(await clientAccountUpdatePage.getIbanInput()).to.eq('iban', 'Expected Iban value to be equals to iban');
    expect(await clientAccountUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await clientAccountUpdatePage.getBallanceInput()).to.eq('5', 'Expected ballance value to be equals to 5');
    expect(await clientAccountUpdatePage.getUserIdInput()).to.eq('5', 'Expected userId value to be equals to 5');

    await clientAccountUpdatePage.save();
    expect(await clientAccountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clientAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ClientAccount', async () => {
    const nbButtonsBeforeDelete = await clientAccountComponentsPage.countDeleteButtons();
    await clientAccountComponentsPage.clickOnLastDeleteButton();

    clientAccountDeleteDialog = new ClientAccountDeleteDialog();
    expect(await clientAccountDeleteDialog.getDialogTitle()).to.eq('bankApp.productsClientAccount.delete.question');
    await clientAccountDeleteDialog.clickOnConfirmButton();

    expect(await clientAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
