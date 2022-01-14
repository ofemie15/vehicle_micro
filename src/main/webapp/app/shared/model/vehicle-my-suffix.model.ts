import { IVehicleTypeMySuffix } from 'app/shared/model/vehicle-type-my-suffix.model';
import { IVehicleLocationMySuffix } from 'app/shared/model/vehicle-location-my-suffix.model';
import { IManufacturerMySuffix } from 'app/shared/model/manufacturer-my-suffix.model';

export interface IVehicleMySuffix {
  id?: number;
  vehicleID?: string | null;
  plateNumber?: string | null;
  age?: number | null;
  colour?: string | null;
  vehicleType?: IVehicleTypeMySuffix | null;
  vehicleLocation?: IVehicleLocationMySuffix | null;
  manufacturer?: IManufacturerMySuffix | null;
}

export const defaultValue: Readonly<IVehicleMySuffix> = {};
