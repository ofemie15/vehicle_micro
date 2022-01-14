import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleLocationMySuffix from './vehicle-location-my-suffix';
import VehicleLocationMySuffixDetail from './vehicle-location-my-suffix-detail';
import VehicleLocationMySuffixUpdate from './vehicle-location-my-suffix-update';
import VehicleLocationMySuffixDeleteDialog from './vehicle-location-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleLocationMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleLocationMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleLocationMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleLocationMySuffix} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleLocationMySuffixDeleteDialog} />
  </>
);

export default Routes;
