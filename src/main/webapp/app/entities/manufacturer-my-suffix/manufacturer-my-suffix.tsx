// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './manufacturer-my-suffix.reducer';
import { IManufacturerMySuffix } from 'app/shared/model/manufacturer-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManufacturerMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ManufacturerMySuffix = (props: IManufacturerMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { manufacturerList, match, loading } = props;
  return (
    <div>
      <h2 id="manufacturer-my-suffix-heading" data-cy="ManufacturerHeading">
        <Translate contentKey="maxVehicleApp.manufacturer.home.title">Manufacturers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="maxVehicleApp.manufacturer.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="maxVehicleApp.manufacturer.home.createLabel">Create new Manufacturer</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {manufacturerList && manufacturerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="maxVehicleApp.manufacturer.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxVehicleApp.manufacturer.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="maxVehicleApp.manufacturer.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="maxVehicleApp.manufacturer.phoneNumber">Phone Number</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {manufacturerList.map((manufacturer, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${manufacturer.id}`} color="link" size="sm">
                      {manufacturer.id}
                    </Button>
                  </td>
                  <td>{manufacturer.name}</td>
                  <td>{manufacturer.address}</td>
                  <td>{manufacturer.phoneNumber}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${manufacturer.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${manufacturer.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${manufacturer.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="maxVehicleApp.manufacturer.home.notFound">No Manufacturers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ manufacturer }: IRootState) => ({
  manufacturerList: manufacturer.entities,
  loading: manufacturer.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerMySuffix);
