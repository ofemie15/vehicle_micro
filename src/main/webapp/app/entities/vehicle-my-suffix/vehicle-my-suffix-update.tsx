import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleTypeMySuffix } from 'app/shared/model/vehicle-type-my-suffix.model';
import { getEntities as getVehicleTypes } from 'app/entities/vehicle-type-my-suffix/vehicle-type-my-suffix.reducer';
import { IVehicleLocationMySuffix } from 'app/shared/model/vehicle-location-my-suffix.model';
import { getEntities as getVehicleLocations } from 'app/entities/vehicle-location-my-suffix/vehicle-location-my-suffix.reducer';
import { IManufacturerMySuffix } from 'app/shared/model/manufacturer-my-suffix.model';
import { getEntities as getManufacturers } from 'app/entities/manufacturer-my-suffix/manufacturer-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-my-suffix.reducer';
import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMySuffixUpdate = (props: IVehicleMySuffixUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleEntity, vehicleTypes, vehicleLocations, manufacturers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-my-suffix' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleTypes();
    props.getVehicleLocations();
    props.getManufacturers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleEntity,
        ...values,
        vehicleType: vehicleTypes.find(it => it.id.toString() === values.vehicleTypeId.toString()),
        vehicleLocation: vehicleLocations.find(it => it.id.toString() === values.vehicleLocationId.toString()),
        manufacturer: manufacturers.find(it => it.id.toString() === values.manufacturerId.toString()),
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
          <h2 id="maxVehicleApp.vehicle.home.createOrEditLabel" data-cy="VehicleCreateUpdateHeading">
            <Translate contentKey="maxVehicleApp.vehicle.home.createOrEditLabel">Create or edit a Vehicle</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="vehicleIDLabel" for="vehicle-my-suffix-vehicleID">
                  <Translate contentKey="maxVehicleApp.vehicle.vehicleID">Vehicle ID</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-vehicleID" data-cy="vehicleID" type="text" name="vehicleID" />
              </AvGroup>
              <AvGroup>
                <Label id="plateNumberLabel" for="vehicle-my-suffix-plateNumber">
                  <Translate contentKey="maxVehicleApp.vehicle.plateNumber">Plate Number</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-plateNumber" data-cy="plateNumber" type="text" name="plateNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="vehicle-my-suffix-age">
                  <Translate contentKey="maxVehicleApp.vehicle.age">Age</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-age" data-cy="age" type="string" className="form-control" name="age" />
              </AvGroup>
              <AvGroup>
                <Label id="colourLabel" for="vehicle-my-suffix-colour">
                  <Translate contentKey="maxVehicleApp.vehicle.colour">Colour</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-colour" data-cy="colour" type="text" name="colour" />
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-my-suffix-vehicleType">
                  <Translate contentKey="maxVehicleApp.vehicle.vehicleType">Vehicle Type</Translate>
                </Label>
                <AvInput
                  id="vehicle-my-suffix-vehicleType"
                  data-cy="vehicleType"
                  type="select"
                  className="form-control"
                  name="vehicleTypeId"
                >
                  <option value="" key="0" />
                  {vehicleTypes
                    ? vehicleTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-my-suffix-vehicleLocation">
                  <Translate contentKey="maxVehicleApp.vehicle.vehicleLocation">Vehicle Location</Translate>
                </Label>
                <AvInput
                  id="vehicle-my-suffix-vehicleLocation"
                  data-cy="vehicleLocation"
                  type="select"
                  className="form-control"
                  name="vehicleLocationId"
                >
                  <option value="" key="0" />
                  {vehicleLocations
                    ? vehicleLocations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-my-suffix-manufacturer">
                  <Translate contentKey="maxVehicleApp.vehicle.manufacturer">Manufacturer</Translate>
                </Label>
                <AvInput
                  id="vehicle-my-suffix-manufacturer"
                  data-cy="manufacturer"
                  type="select"
                  className="form-control"
                  name="manufacturerId"
                >
                  <option value="" key="0" />
                  {manufacturers
                    ? manufacturers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-my-suffix" replace color="info">
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
  vehicleTypes: storeState.vehicleType.entities,
  vehicleLocations: storeState.vehicleLocation.entities,
  manufacturers: storeState.manufacturer.entities,
  vehicleEntity: storeState.vehicle.entity,
  loading: storeState.vehicle.loading,
  updating: storeState.vehicle.updating,
  updateSuccess: storeState.vehicle.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleTypes,
  getVehicleLocations,
  getManufacturers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMySuffixUpdate);
