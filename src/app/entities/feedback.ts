import { IHousehold } from './household';
import { IPerson } from './person';
import { IQuestion } from './question';


export interface IFeedback {
    id : string;
    Household : IHousehold;
    Person : IPerson;
    Questions : IQuestion[];
}

export class Feedback implements IFeedback {
    id : string;
    Household : IHousehold;
    Person : IPerson;
    Questions : IQuestion[];
}