export interface IQuestion {
    id : string;
    Type : string;
    Name : string;
    Number : string;
    LabelText : string;
    MinAnswerCount : number;
    MaxAnswerCount : number;
    AnswerOptions : string[];
    Answer : string;
    AnswerChecked : string[];

    setOptions(options : string[]): void;
}

export class QuestionBase implements IQuestion {
    id : string;
    Type : string;
    Name : string;
    Number : string;
    LabelText : string;
    MinAnswerCount : number = 1;
    MaxAnswerCount : number = 1;
    AnswerOptions : string[] = [];
    Answer : string;    
    AnswerChecked : string[];

    public setOptions(options : string[]) : void {
        this.AnswerOptions = options;
    }
}

export class SimpleQuestion extends QuestionBase {
    constructor()
    {
        super();
        this.Type = "Simple";
        this.MinAnswerCount = 1;
        this.MaxAnswerCount = 1;
        this.AnswerOptions = [];
        this.Answer = "";        
    }
}

export class MultipleQuestion extends QuestionBase {
    constructor()
    {
        super();
        this.Type = "Multiple";
        this.MinAnswerCount = 1;
        this.MaxAnswerCount = 99;
        this.AnswerOptions = [];
        this.AnswerChecked = [];
    }

    public setOptions(options : string[]) : void {
        super.setOptions(options);
        var self = this;
        options.forEach(function( option, index ){
            self.AnswerChecked.push(null);
        });
    }

}

