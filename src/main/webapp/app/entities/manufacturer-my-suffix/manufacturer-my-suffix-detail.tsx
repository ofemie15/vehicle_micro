import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './manufacturer-my-suffix.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IManufacturerMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ManufacturerMySuffixDetail = (props: IManufacturerMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { manufacturerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="manufacturerDetailsHeading">
          <Translate contentKey="maxVehicleApp.manufacturer.detail.title">Manufacturer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{manufacturerEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="maxVehicleApp.manufacturer.name">Name</Translate>
            </span>
          </dt>
          <dd>{manufacturerEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="maxVehicleApp.manufacturer.address">Address</Translate>
            </span>
          </dt>
          <dd>{manufacturerEntity.address}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="maxVehicleApp.manufacturer.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{manufacturerEntity.phoneNumber}</dd>
        </dl>
        <Button tag={Link} to="/manufacturer-my-suffix" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/manufacturer-my-suffix/${manufacturerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ manufacturer }: IRootState) => ({
  manufacturerEntity: manufacturer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerMySuffixDetail);
