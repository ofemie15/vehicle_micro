import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ManufacturerUpdatePage from './manufacturer-my-suffix-update.page-object';

const expect = chai.expect;
export class ManufacturerDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('maxVehicleApp.manufacturer.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-manufacturer'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ManufacturerComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('manufacturer-my-suffix-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('manufacturer-my-suffix');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateManufacturer() {
    await this.createButton.click();
    return new ManufacturerUpdatePage();
  }

  async deleteManufacturer() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const manufacturerDeleteDialog = new ManufacturerDeleteDialog();
    await waitUntilDisplayed(manufacturerDeleteDialog.deleteModal);
    expect(await manufacturerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/maxVehicleApp.manufacturer.delete.question/);
    await manufacturerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(manufacturerDeleteDialog.deleteModal);

    expect(await isVisible(manufacturerDeleteDialog.deleteModal)).to.be.false;
  }
}
