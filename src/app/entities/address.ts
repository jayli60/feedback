export interface IAddress {
    id : string;
    Address1 : string;
    Address2 : string;
    City : string;
    State : string;
    ZipCode : string;
    Latitude : number;
    Longitude : number;
    Distance : number;
}

export class Address implements IAddress {
    id : string;
    Address1 : string;
    Address2 : string;
    City : string;
    State : string;
    ZipCode : string;
    Latitude : number;
    Longitude : number;  
    Distance : number;
}