class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-pt'
        this._displayCalcEl = document.querySelector('#display'); // El - By covention to inform that it is an element
        this._dateEl = document.querySelector('#date');
        this._timeEl = document.querySelector('#time');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

        this.setDisplayDateTime();

        // Function to run a time interval in milliseconds, to update the time. 
        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);
    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })

    }

    // Creating Methods for Calculator Operations 

    // Method to clear all 
    clearAll() {

        this._operation = [];
    }

    // Method to clear the last entry 
    clearEntry() {

        this._operation.pop();

    }

    // Treatment for concatenating numbers if you do not have an operator
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    // Method to replace the last item in the array
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    // Method to push 
    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();
        }

    }

    // Method to calculate each operation, due to the rule of origin of signs, I have to have the result of the last calculates to continue calculating. 
    calc() {

        let last = this._operation.pop();

        let result = eval(this._operation.join(''));

        this._operation = [result, last];

        // Update display
        this.setLastNumberToDisplay();
    }

    // Method to update display
    setLastNumberToDisplay() {

        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {

                lastNumber = this._operation[i];

                break;

            }
        }

        this.displayCalc = lastNumber;
    }

    // Method for adding a new operation 
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if (isNaN(value)) {

                console.log(value);

            } else {

                this.pushOperation(value);
                // Update display
                this.setLastNumberToDisplay();

            }

        } else {
            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                // Update display
                this.setLastNumberToDisplay();


            }

        }

    }

    // Method for error 
    setError() {

        this.displayCalc = 'Error';
    }


    // Keyboard Events 

    execBtn(value) {

        switch (value) {

            case 'ac':
                this.clearAll();
                break
            case 'ce':
                this.clearEntry();
                break
            case 'sum':
                this.addOperation('+');
                break
            case 'subtraction':
                this.addOperation('-');
                break
            case 'division':
                this.addOperation('/');
                break
            case 'multiplication':
                this.addOperation('*');
                break
            case 'porcent':
                this.addOperation('%');
                break
            case 'equal':

                break
            case 'point':
                this.addOperation('.');
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll('#buttons > g, #aparts > g');

        buttons.forEach((btn, _index) => {

            this.addEventListenerAll(btn, 'click drag', _e => {

                let textBtn = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', _e => {

                btn.style.cursor = 'pointer';
            })
        });
    }


    /* When I create the setInterval() the time will be locked for a second, so that this doesn't happen I have to assign before the setInterval() the 
    displayDate and DisplayTime variables, however to avoid repetition I chose to create a method and call only the method.*/

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {

        return this._timeEl.innerHTML;

    }

    set displayTime(value) {

        return this._timeEl.innerHTML = value;

    }

    get displayDate() {

        return this._dateEl.innerHTML;

    }

    set displayDate(value) {

        return this._dateEl.innerHTML = value;

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate() {

        return new Date();

    }

    set currentDate(value) {

        this._currentDate = value;

    }

}