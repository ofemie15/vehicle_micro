import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleLocationMySuffix, defaultValue } from 'app/shared/model/vehicle-location-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_VEHICLELOCATION_LIST: 'vehicleLocation/FETCH_VEHICLELOCATION_LIST',
  FETCH_VEHICLELOCATION: 'vehicleLocation/FETCH_VEHICLELOCATION',
  CREATE_VEHICLELOCATION: 'vehicleLocation/CREATE_VEHICLELOCATION',
  UPDATE_VEHICLELOCATION: 'vehicleLocation/UPDATE_VEHICLELOCATION',
  PARTIAL_UPDATE_VEHICLELOCATION: 'vehicleLocation/PARTIAL_UPDATE_VEHICLELOCATION',
  DELETE_VEHICLELOCATION: 'vehicleLocation/DELETE_VEHICLELOCATION',
  RESET: 'vehicleLocation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleLocationMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleLocationMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleLocationMySuffixState = initialState, action): VehicleLocationMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLELOCATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLELOCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLELOCATION):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLELOCATION):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLELOCATION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLELOCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLELOCATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLELOCATION):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLELOCATION):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLELOCATION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLELOCATION):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLELOCATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLELOCATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLELOCATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLELOCATION):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLELOCATION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLELOCATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLELOCATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/vehicle-locations';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleLocationMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLELOCATION_LIST,
  payload: axios.get<IVehicleLocationMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleLocationMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLELOCATION,
    payload: axios.get<IVehicleLocationMySuffix>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleLocationMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLELOCATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleLocationMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLELOCATION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleLocationMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLELOCATION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleLocationMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLELOCATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
