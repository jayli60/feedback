export interface IPerson {
  id : string;
  FirstName : string;
  LastName : string;
  MiddleName : string;
}

export class Person implements IPerson {
  id : string;
  FirstName : string;
  LastName : string;
  MiddleName : string;
}