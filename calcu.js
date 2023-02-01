class Calculator {
    constructor(prevOutTextElement, currentOutTextElement) {
        this.prevOutTextElement = prevOutTextElement
        this.currentOutTextElement = currentOutTextElement
        this.clear()
    }
    clear() {
        this.currentOut = ''
        this.prevOut = ''
        this.operation = undefined
    }
    delete() {
        this.currentOut = this.currentOut.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOut.includes('.')) return
        this.currentOut = this.currentOut.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOut === '') return
        if (this.prevOut !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOut = this.currentOut
        this.currentOut = ''


}

    compute() {
        let computation
        const prev = parseFloat(this.prevOut)
        const current = parseFloat(this.currentOut)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return        
        }
    this.currentOut = computation
    this.operation = undefined
    this.prevOut = ''   
}

    getDisplayNumber(number) {
        const stringNumber = number.toString( )
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalsDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalsDigits !=null) {
            return `${integerDisplay}.${decimalsDigits}`
        }
        else {
            return integerDisplay
        }
}

    updateDisplay(){
        this.currentOutTextElement.innerText = 
            this.getDisplayNumber(this.currentOut)
        if(this.operation != null) {
            this.prevOutTextElement.innerText = 
            `${this.getDisplayNumber(this.prevOut)} ${this.operation}`
        }
        else {
            this.prevOutTextElement.innerText = ''
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-clear]');
const prevOutTextElement = document.querySelector('[data-prev]');
const currentOutTextElement = document.querySelector('[data-current]');


const calculator = new Calculator(prevOutTextElement, currentOutTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay();

    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})