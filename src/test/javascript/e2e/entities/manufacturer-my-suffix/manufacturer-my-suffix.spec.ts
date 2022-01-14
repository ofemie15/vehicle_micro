import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ManufacturerComponentsPage from './manufacturer-my-suffix.page-object';
import ManufacturerUpdatePage from './manufacturer-my-suffix-update.page-object';
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

describe('Manufacturer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let manufacturerComponentsPage: ManufacturerComponentsPage;
  let manufacturerUpdatePage: ManufacturerUpdatePage;
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
    manufacturerComponentsPage = new ManufacturerComponentsPage();
    manufacturerComponentsPage = await manufacturerComponentsPage.goToPage(navBarPage);
  });

  it('should load Manufacturers', async () => {
    expect(await manufacturerComponentsPage.title.getText()).to.match(/Manufacturers/);
    expect(await manufacturerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Manufacturers', async () => {
    const beforeRecordsCount = (await isVisible(manufacturerComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(manufacturerComponentsPage.table);
    manufacturerUpdatePage = await manufacturerComponentsPage.goToCreateManufacturer();
    await manufacturerUpdatePage.enterData();

    expect(await manufacturerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(manufacturerComponentsPage.table);
    await waitUntilCount(manufacturerComponentsPage.records, beforeRecordsCount + 1);
    expect(await manufacturerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await manufacturerComponentsPage.deleteManufacturer();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(manufacturerComponentsPage.records, beforeRecordsCount);
      expect(await manufacturerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(manufacturerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
