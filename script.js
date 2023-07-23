var firstOperand = ''
var firstOperator = ''
var secondOperand = ''
var secondOperator = ''
var result = ''

var display = document.querySelector('#display-text')
var numberButtons = document.querySelectorAll('#input-btn')
var operatorButtons = document.querySelectorAll('#operator-btn')
var clearButton = document.querySelector('#clear-btn')
var undoButton = document.querySelector('#undo-btn')
var calcButton = document.querySelector('#calc-btn')
var dotButton = document.querySelector('#dot-btn')


//Display function: only 1 operand on the screen
function displayS(){
    if(firstOperator === ''){
        display.textContent = firstOperand
    }else if(firstOperand !== '' && secondOperand === ''){
        if(display.textContent.length < (firstOperand + firstOperator).length ){
            display.textContent += firstOperator
        }
    }else if(firstOperator !== '' && secondOperand !== ''){
        display.textContent = secondOperand
    }else{
        display.textContent = secondOperator
    }
}


//Whenever user click or press operator, the value of next number goes to next operand
function input() {
    numberButtons.forEach(numberButton => numberButton.addEventListener('click', () => {
        if(firstOperator === ''){
            firstOperand += numberButton.textContent
            displayS()
        }else if(firstOperator !== ''){
            secondOperand += numberButton.textContent
            displayS()
        }
    }))
    //dot btn can only be clicked 1 time
    dotButton.addEventListener('click', () => {
        if(firstOperand.includes('.') === false){
            firstOperand += dotButton.textContent
            displayS()
        }else if(secondOperand.includes('.') === false){
            secondOperand += dotButton.textContent
            displayS()
        }
    })
    operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
        if(firstOperand === ''){
            if(operatorButton.textContent === '-')firstOperand += '-'
            displayS()
        }else if(firstOperator !== '' && secondOperand === ''){
            if(operatorButton.textContent === '-')secondOperand += '-'
            displayS()
        }else if(firstOperand !== '' && secondOperand === ''){
            if(firstOperator.length < 1){
                firstOperator += operatorButton.textContent
            }
            displayS()
        //When 2 operands filled up and user click other operator which is not 'equal' , call evaluate()
        }else if(firstOperand !== '' && firstOperator !== '' && secondOperand !== ''){   
            if(firstOperand !== '' && firstOperator !== '' && secondOperand !== '0'){
                secondOperator += operatorButton.textContent
                evaluate()
                display.textContent = result
                change()
            }else {
                display.textContent = 'Error!'
                clear()
            }
        }
    }))
}
input()



//Keyboard function
window.addEventListener('keydown',KeyboardInput)
function KeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        if(firstOperator === ''){
            firstOperand += e.key
            displayS()
        }else if(firstOperator !== ''){
            secondOperand += e.key
            displayS()
        }
    }
    if (e.key === '.') {
        if(firstOperand.includes('.') === false){
            firstOperand += '.'
            displayS()
        }else if(secondOperand.includes('.') === false){
            secondOperand += '.'
            displayS()
        }
    }
    if (e.key === 'Enter') {
        if(firstOperand !== '' && firstOperator !== '' && secondOperand !== '0'){
            evaluate()   
            change()
        }else {
            display.textContent = 'Error!'
            clear()
        }
    }
    if (e.key === 'Backspace') {
        undo()
        displayS()
        if(display.textContent === ''){
            display.textContent += '...'
        }else if(secondOperand === ''){
            display.textContent = firstOperator != '' ? firstOperand + firstOperator : firstOperand 
        }
    }
    if (e.key === 'Escape') {
        clear()
        display.textContent = '...'
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        if(firstOperand === ''){
            if(e.key === '-')firstOperand += '-'
            displayS()
        }else if(firstOperator !== '' && secondOperand === ''){
            if(e.key === '-')secondOperand += '-'
            displayS()
        }else if(firstOperand !== '' && secondOperand === ''){
            if(firstOperator.length < 1){
                firstOperator += e.key
            }
            displayS()
        //When 2 operands filled up and user click other operator which is not 'equal' , call evaluate()
        }else if(firstOperand !== '' && firstOperator !== '' && secondOperand !== ''){   
            if(firstOperand !== '' && firstOperator !== '' && secondOperand !== '0'){
                secondOperator += e.key
                evaluate()
                display.textContent = result
                change()
            }else {
                display.textContent = 'Error!'
                clear()
            }
        }
    }
    e.preventDefault()
}



//'equal' click function
calcButton.addEventListener('click', () => {
    if(firstOperand !== '' && firstOperator !== '' && secondOperand !== '0'){
        evaluate()   
        change()
    }else {
        display.textContent = 'Error!'
        clear()
    }
})



//evaluate function
function evaluate(){    
    switch(true){
        case firstOperator === '+' :
            result = round(parseFloat(firstOperand) + parseFloat(secondOperand))
            break
        case firstOperator === '-' :
            result = round(parseFloat(firstOperand) - parseFloat(secondOperand))
            break
        case firstOperator === '/' :
            result = round(parseFloat(firstOperand) / parseFloat(secondOperand))
            break
        case firstOperator === '*' :
            result = round(parseFloat(firstOperand) * parseFloat(secondOperand))
            break
        case firstOperator === '%' :
            result = round(parseFloat(firstOperand) % parseFloat(secondOperand))
            break
    }
}



//change value function
function change(){
    if(result !== '' && result !== 'Error!'){
        secondOperand = ''
        firstOperator = ''
        firstOperand = result
        if(secondOperator !== ''){
            firstOperator = secondOperator
            secondOperator = ''
        }
    }
    displayS()
}



//clear function
function clear(){
    firstOperand = ''
    firstOperator = ''
    secondOperand = ''
    secondOperator = ''
    result = ''
}
clearButton.addEventListener('click', () => {
    clear()
    display.textContent = '...'
})


//undo function
undoButton.addEventListener('click', () => {
    undo()
    displayS()
    if(display.textContent === ''){
        display.textContent += '...'
    }else if(secondOperand === ''){
        display.textContent = firstOperator != '' ? firstOperand + firstOperator : firstOperand 
    }
})
function undo(){
    if(display.textContent === firstOperand){
        firstOperand = firstOperand.slice(0,-1)
    }else if(display.textContent === firstOperand + firstOperator){
        firstOperator = ''
    }else if(display.textContent === secondOperand){
        secondOperand = secondOperand.slice(0,-1)
    }
}



//function to round the float
function round(a){
    return Math.round(a * 1000) / 1000
}

// //Old way :)
// let display = document.querySelector(".display")
// let defaultDisplay = document.getElementById("display-text")
// let inputDisplay = document.createElement("span")

// //get input and display input 
// let input = ""
// let inputBtns = document.querySelectorAll("#input-btn")
// inputBtns.forEach(inputBtn => inputBtn.addEventListener("click",() => {
//     input += inputBtn.textContent
//     inputDisplay.textContent += inputBtn.textContent
//     defaultDisplay.style = "display: none"
//     display.appendChild(inputDisplay)
// }))

// //turn input into math
// let operators = []
// let operands = []
// let sortResult = []
// let sortIndex = []
// //store operators in order
// function storeOps() {
//     for(i = 0; i < input.length; i++){
//         if(input[i] === "*" || input[i] === "/" || input[i] === "+" || input[i] === "-" || input[i] === "%"){
//             operators.push(input[i])
//         }
//     }
// }
// // store operands/numbers in order
// function storeNum(){
//     for(i = 0; i < input.length; i++){
//         if(input[i] === "*" || input[i] === "/" || input[i] === "+" || input[i] === "-" || input[i] === "%"){
//             input = input.replace(input[i]," ")
//         }
//     }
//     operands = input.split(" ")
// }
// //check if there are divide/multiply operators and do these first
// function sortMath(){
//     for(i = 0; i < operators.length; i++){
//         if(operators[i] === "*" || operators[i] === "/" || operators[i] === "%" ){
//             switch(true){
//                 case operators[i] === "*":
//                     //store result and index of operators
//                     sortResult.push(operands[i] * operands[i+1])
//                     sortIndex.push(i)
//                     break
//                 case operators[i] === "/":
//                     sortResult.push(operands[i] / operands[i+1])
//                     sortIndex.push(i)
//                     break
//                 case operators[i] === "%":
//                     sortResult.push(operands[i] % operands[i+1])
//                     sortIndex.push(i)
//                     break
//             }
//         }
//     }
// }

// //final function - hitting "="
// let result = 0;
// calc = document.querySelector("#calc-btn")
// calc.addEventListener("click", () => {
//     storeOps()
//     storeNum()
//     sortMath()
//     if(!operators[0] && !operands[1]){
//         inputDisplay.textContent = "Not enough!"
//     }
//     for(i = sortIndex.length -1 ; i>=0; i--){
//         operators.splice(sortIndex[i],1)
//         operands[sortIndex[i]] = sortResult[i]
//         operands.splice(sortIndex[i]+1,1)
//     }
//     //loop through operators again to get the result
//     result = parseInt(operands[0]);
//     for(i = 0;i < operators.length;i++){
//         operators[i] === "+" ? result += parseInt(operands[i+1]) : result -= operands[i+1]
//     }
//     inputDisplay.textContent = result
// })

