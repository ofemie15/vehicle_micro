import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-location-my-suffix.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleLocationMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleLocationMySuffixDetail = (props: IVehicleLocationMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleLocationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleLocationDetailsHeading">
          <Translate contentKey="maxVehicleApp.vehicleLocation.detail.title">VehicleLocation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleLocationEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="maxVehicleApp.vehicleLocation.code">Code</Translate>
            </span>
          </dt>
          <dd>{vehicleLocationEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="maxVehicleApp.vehicleLocation.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleLocationEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-location-my-suffix" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-location-my-suffix/${vehicleLocationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleLocation }: IRootState) => ({
  vehicleLocationEntity: vehicleLocation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleLocationMySuffixDetail);
