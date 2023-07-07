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

//Display function: only 1 operand on the screen
function displayS(){
    if(firstOperator === ''){
        display.textContent = firstOperand
    }else if(firstOperator !== '' && secondOperand === ''){
        display.textContent = firstOperator
    }else if(firstOperator !== '' && secondOperand !== ''){
        display.textContent = secondOperand
    }else{
        display.textContent = secondOperator
    }
}
function refresh(){
    display.textContent = ''
}
//Whenever user click operator, the value of next number clicks goes to next operand
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
    operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
        if(firstOperand === ''){
            if(operatorButton.textContent !== '-')operatorButton.style = "background-color: #5e152e"
            else firstOperand += '-'
            displayS()
        }else if(firstOperand !== '' && secondOperand === ''){
            if(firstOperator.length < 1){
                firstOperator += operatorButton.textContent
            }
            displayS()
            //When 2 operands filled up and user click other operator which is not 'equal' , call operate()
        }else if(secondOperand !== ''){
            if(firstOperator.length < 1){
                secondOperator += operatorButton.textContent
            }
            operate()
        }
    }))
    
}
input()
//operate function
function operate(){
    switch(true){
        case firstOperator === '+' :
            result = parseFloat(firstOperand) + parseFloat(secondOperand)
            break
        case firstOperator === '-' :
            result = parseFloat(firstOperand) - parseFloat(secondOperand)
            break
        case firstOperator === '*' :
            result = parseFloat(firstOperand) * parseFloat(secondOperand)
            break
        case firstOperator === '/' :
            result = parseFloat(firstOperand) / parseFloat(secondOperand)
            break
        case firstOperator === '%' :
            result = parseFloat(firstOperand) % parseFloat(secondOperand)
            break
    }
    if(result !== ''){
        firstOperator = result
        displayS()
        secondOperand = ''
        if(secondOperator !== ''){
            firstOperator = secondOperator
            secondOperator = ''
        }
    }   
}
//clear function

//undo function

//deal with float: limit 'dot' click time by 1, create a round() function to round the float
//



// //define display
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

