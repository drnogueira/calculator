class CalcController {

    constructor() {

        this._locale = 'pt-pt'
        this._displayCalcEl = document.querySelector('#display'); // El - By covention to inform that it is an element
        this._dateEl = document.querySelector('#date');
        this._timeEl = document.querySelector('#time');
        this._currentDate;
        this.initialize();

    }

    initialize() {

        this.setDisplayDateTime();

        // Function to run a time interval in milliseconds, to update the time. 
        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);
    }

    /* When I create the setInterval() the time will be locked for a second, so that this doesn't happen I have to assign before the setInterval() the 
    displayDate and DisplayTime variables, however to avoid repetition I chose to create a method and call only the method.*/

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalc = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}