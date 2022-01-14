import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IManufacturerMySuffix, defaultValue } from 'app/shared/model/manufacturer-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_MANUFACTURER_LIST: 'manufacturer/FETCH_MANUFACTURER_LIST',
  FETCH_MANUFACTURER: 'manufacturer/FETCH_MANUFACTURER',
  CREATE_MANUFACTURER: 'manufacturer/CREATE_MANUFACTURER',
  UPDATE_MANUFACTURER: 'manufacturer/UPDATE_MANUFACTURER',
  PARTIAL_UPDATE_MANUFACTURER: 'manufacturer/PARTIAL_UPDATE_MANUFACTURER',
  DELETE_MANUFACTURER: 'manufacturer/DELETE_MANUFACTURER',
  RESET: 'manufacturer/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IManufacturerMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ManufacturerMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: ManufacturerMySuffixState = initialState, action): ManufacturerMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MANUFACTURER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MANUFACTURER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MANUFACTURER):
    case REQUEST(ACTION_TYPES.UPDATE_MANUFACTURER):
    case REQUEST(ACTION_TYPES.DELETE_MANUFACTURER):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_MANUFACTURER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MANUFACTURER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MANUFACTURER):
    case FAILURE(ACTION_TYPES.CREATE_MANUFACTURER):
    case FAILURE(ACTION_TYPES.UPDATE_MANUFACTURER):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_MANUFACTURER):
    case FAILURE(ACTION_TYPES.DELETE_MANUFACTURER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MANUFACTURER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MANUFACTURER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MANUFACTURER):
    case SUCCESS(ACTION_TYPES.UPDATE_MANUFACTURER):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_MANUFACTURER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MANUFACTURER):
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

const apiUrl = 'api/manufacturers';

// Actions

export const getEntities: ICrudGetAllAction<IManufacturerMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MANUFACTURER_LIST,
  payload: axios.get<IManufacturerMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IManufacturerMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MANUFACTURER,
    payload: axios.get<IManufacturerMySuffix>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IManufacturerMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MANUFACTURER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IManufacturerMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MANUFACTURER,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IManufacturerMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_MANUFACTURER,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IManufacturerMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MANUFACTURER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
