import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleLocationComponentsPage from './vehicle-location-my-suffix.page-object';
import VehicleLocationUpdatePage from './vehicle-location-my-suffix-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('VehicleLocation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleLocationComponentsPage: VehicleLocationComponentsPage;
  let vehicleLocationUpdatePage: VehicleLocationUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    vehicleLocationComponentsPage = new VehicleLocationComponentsPage();
    vehicleLocationComponentsPage = await vehicleLocationComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleLocations', async () => {
    expect(await vehicleLocationComponentsPage.title.getText()).to.match(/Vehicle Locations/);
    expect(await vehicleLocationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleLocations', async () => {
    const beforeRecordsCount = (await isVisible(vehicleLocationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleLocationComponentsPage.table);
    vehicleLocationUpdatePage = await vehicleLocationComponentsPage.goToCreateVehicleLocation();
    await vehicleLocationUpdatePage.enterData();

    expect(await vehicleLocationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleLocationComponentsPage.table);
    await waitUntilCount(vehicleLocationComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleLocationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleLocationComponentsPage.deleteVehicleLocation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleLocationComponentsPage.records, beforeRecordsCount);
      expect(await vehicleLocationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleLocationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
