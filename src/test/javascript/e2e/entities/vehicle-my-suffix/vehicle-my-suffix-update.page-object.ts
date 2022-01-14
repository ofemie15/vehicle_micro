import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VehicleUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxVehicleApp.vehicle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  vehicleIDInput: ElementFinder = element(by.css('input#vehicle-my-suffix-vehicleID'));
  plateNumberInput: ElementFinder = element(by.css('input#vehicle-my-suffix-plateNumber'));
  ageInput: ElementFinder = element(by.css('input#vehicle-my-suffix-age'));
  colourInput: ElementFinder = element(by.css('input#vehicle-my-suffix-colour'));
  vehicleTypeSelect: ElementFinder = element(by.css('select#vehicle-my-suffix-vehicleType'));
  vehicleLocationSelect: ElementFinder = element(by.css('select#vehicle-my-suffix-vehicleLocation'));
  manufacturerSelect: ElementFinder = element(by.css('select#vehicle-my-suffix-manufacturer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setVehicleIDInput(vehicleID) {
    await this.vehicleIDInput.sendKeys(vehicleID);
  }

  async getVehicleIDInput() {
    return this.vehicleIDInput.getAttribute('value');
  }

  async setPlateNumberInput(plateNumber) {
    await this.plateNumberInput.sendKeys(plateNumber);
  }

  async getPlateNumberInput() {
    return this.plateNumberInput.getAttribute('value');
  }

  async setAgeInput(age) {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput() {
    return this.ageInput.getAttribute('value');
  }

  async setColourInput(colour) {
    await this.colourInput.sendKeys(colour);
  }

  async getColourInput() {
    return this.colourInput.getAttribute('value');
  }

  async vehicleTypeSelectLastOption() {
    await this.vehicleTypeSelect.all(by.tagName('option')).last().click();
  }

  async vehicleTypeSelectOption(option) {
    await this.vehicleTypeSelect.sendKeys(option);
  }

  getVehicleTypeSelect() {
    return this.vehicleTypeSelect;
  }

  async getVehicleTypeSelectedOption() {
    return this.vehicleTypeSelect.element(by.css('option:checked')).getText();
  }

  async vehicleLocationSelectLastOption() {
    await this.vehicleLocationSelect.all(by.tagName('option')).last().click();
  }

  async vehicleLocationSelectOption(option) {
    await this.vehicleLocationSelect.sendKeys(option);
  }

  getVehicleLocationSelect() {
    return this.vehicleLocationSelect;
  }

  async getVehicleLocationSelectedOption() {
    return this.vehicleLocationSelect.element(by.css('option:checked')).getText();
  }

  async manufacturerSelectLastOption() {
    await this.manufacturerSelect.all(by.tagName('option')).last().click();
  }

  async manufacturerSelectOption(option) {
    await this.manufacturerSelect.sendKeys(option);
  }

  getManufacturerSelect() {
    return this.manufacturerSelect;
  }

  async getManufacturerSelectedOption() {
    return this.manufacturerSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setVehicleIDInput('vehicleID');
    expect(await this.getVehicleIDInput()).to.match(/vehicleID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPlateNumberInput('plateNumber');
    expect(await this.getPlateNumberInput()).to.match(/plateNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAgeInput('5');
    expect(await this.getAgeInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setColourInput('colour');
    expect(await this.getColourInput()).to.match(/colour/);
    await this.vehicleTypeSelectLastOption();
    await this.vehicleLocationSelectLastOption();
    await this.manufacturerSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
