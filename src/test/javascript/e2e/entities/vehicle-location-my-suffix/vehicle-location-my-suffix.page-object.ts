import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VehicleLocationUpdatePage from './vehicle-location-my-suffix-update.page-object';

const expect = chai.expect;
export class VehicleLocationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('maxVehicleApp.vehicleLocation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicleLocation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VehicleLocationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vehicle-location-my-suffix-heading'));
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
    await navBarPage.getEntityPage('vehicle-location-my-suffix');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVehicleLocation() {
    await this.createButton.click();
    return new VehicleLocationUpdatePage();
  }

  async deleteVehicleLocation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vehicleLocationDeleteDialog = new VehicleLocationDeleteDialog();
    await waitUntilDisplayed(vehicleLocationDeleteDialog.deleteModal);
    expect(await vehicleLocationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/maxVehicleApp.vehicleLocation.delete.question/);
    await vehicleLocationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vehicleLocationDeleteDialog.deleteModal);

    expect(await isVisible(vehicleLocationDeleteDialog.deleteModal)).to.be.false;
  }
}
