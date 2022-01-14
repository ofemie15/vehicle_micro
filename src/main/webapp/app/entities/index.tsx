import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMySuffix from './vehicle-my-suffix';
import VehicleTypeMySuffix from './vehicle-type-my-suffix';
import VehicleLocationMySuffix from './vehicle-location-my-suffix';
import ManufacturerMySuffix from './manufacturer-my-suffix';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}vehicle-my-suffix`} component={VehicleMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-type-my-suffix`} component={VehicleTypeMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-location-my-suffix`} component={VehicleLocationMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}manufacturer-my-suffix`} component={ManufacturerMySuffix} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
