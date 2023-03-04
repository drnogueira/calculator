class CalcController {
     
    constructor(){
        
        this._displayCalc = '0';
        this._currentDate;
        this.initialize();
        
    }

    initialize(){

    }

    get displayCalc(){

        return this._displayCalc;

    }

    set displayCalc(value){

        this._displayCalc = value;

    }

    get currentDate(){

        return this._currentDate;

    }

    set currentDate(value){

        this._currentDate= value;
        
    }
}