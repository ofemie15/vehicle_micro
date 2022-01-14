import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './manufacturer-my-suffix.reducer';
import { IManufacturerMySuffix } from 'app/shared/model/manufacturer-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IManufacturerMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ManufacturerMySuffixUpdate = (props: IManufacturerMySuffixUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { manufacturerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/manufacturer-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...manufacturerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="maxVehicleApp.manufacturer.home.createOrEditLabel" data-cy="ManufacturerCreateUpdateHeading">
            <Translate contentKey="maxVehicleApp.manufacturer.home.createOrEditLabel">Create or edit a Manufacturer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : manufacturerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="manufacturer-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="manufacturer-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="manufacturer-my-suffix-name">
                  <Translate contentKey="maxVehicleApp.manufacturer.name">Name</Translate>
                </Label>
                <AvField id="manufacturer-my-suffix-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="manufacturer-my-suffix-address">
                  <Translate contentKey="maxVehicleApp.manufacturer.address">Address</Translate>
                </Label>
                <AvField id="manufacturer-my-suffix-address" data-cy="address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="manufacturer-my-suffix-phoneNumber">
                  <Translate contentKey="maxVehicleApp.manufacturer.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="manufacturer-my-suffix-phoneNumber" data-cy="phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/manufacturer-my-suffix" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  manufacturerEntity: storeState.manufacturer.entity,
  loading: storeState.manufacturer.loading,
  updating: storeState.manufacturer.updating,
  updateSuccess: storeState.manufacturer.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerMySuffixUpdate);
