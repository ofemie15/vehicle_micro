import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ManufacturerMySuffix from './manufacturer-my-suffix';
import ManufacturerMySuffixDetail from './manufacturer-my-suffix-detail';
import ManufacturerMySuffixUpdate from './manufacturer-my-suffix-update';
import ManufacturerMySuffixDeleteDialog from './manufacturer-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ManufacturerMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ManufacturerMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ManufacturerMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={ManufacturerMySuffix} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ManufacturerMySuffixDeleteDialog} />
  </>
);

export default Routes;
