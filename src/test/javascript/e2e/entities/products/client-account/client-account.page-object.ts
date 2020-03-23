import { element, by, ElementFinder } from 'protractor';

export class ClientAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-client-account div table .btn-danger'));
  title = element.all(by.css('jhi-client-account div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ClientAccountUpdatePage {
  pageTitle = element(by.id('jhi-client-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  customerIDInput = element(by.id('field_customerID'));
  ibanInput = element(by.id('field_iban'));
  nameInput = element(by.id('field_name'));
  ballanceInput = element(by.id('field_ballance'));
  userIdInput = element(by.id('field_userId'));

  typeSelect = element(by.id('field_type'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCustomerIDInput(customerID: string): Promise<void> {
    await this.customerIDInput.sendKeys(customerID);
  }

  async getCustomerIDInput(): Promise<string> {
    return await this.customerIDInput.getAttribute('value');
  }

  async setIbanInput(iban: string): Promise<void> {
    await this.ibanInput.sendKeys(iban);
  }

  async getIbanInput(): Promise<string> {
    return await this.ibanInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setBallanceInput(ballance: string): Promise<void> {
    await this.ballanceInput.sendKeys(ballance);
  }

  async getBallanceInput(): Promise<string> {
    return await this.ballanceInput.getAttribute('value');
  }

  async setUserIdInput(userId: string): Promise<void> {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput(): Promise<string> {
    return await this.userIdInput.getAttribute('value');
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async typeSelectOption(option: string): Promise<void> {
    await this.typeSelect.sendKeys(option);
  }

  getTypeSelect(): ElementFinder {
    return this.typeSelect;
  }

  async getTypeSelectedOption(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ClientAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-clientAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-clientAccount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
