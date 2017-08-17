import { IPerson } from './person';
import { IAddress } from './address';

export interface IHousehold {
    id : string;
    Members : IPerson[];
    Address : IAddress;
}

export class Household implements IHousehold {
    id : string;
    Members : IPerson[];
    Address : IAddress;    
}