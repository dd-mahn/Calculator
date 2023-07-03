//Require: Multi-number, Multiply/Divide first, Float Rounder, Clear/Undo function

//define display
let display = document.querySelector(".display")
let defaultDisplay = document.getElementById("display-text")
let inputDisplay = document.createElement("span")

//get input and display input 
let input = ""
let inputBtns = document.querySelectorAll("#input-btn")
inputBtns.forEach(inputBtn => inputBtn.addEventListener("click",() => {
    input += inputBtn.textContent
    inputDisplay.textContent += inputBtn.textContent
    defaultDisplay.style = "display: none"
    display.appendChild(inputDisplay)
}))

//turn input into math
operators = []
operands = []
//store operators in order
function storeOps() {
    for(i = 0; i < input.length; i++){
        if(input[i] === "*" || input[i] === "/" || input[i] === "+" || input[i] === "-" || input[i] === "%"){
            operators.push(input[i])
        }
    }
}
// store operands/numbers in order
function storeNum(){
    for(i = 0; i < input.length; i++){
        if(input[i] === "*" || input[i] === "/" || input[i] === "+" || input[i] === "-" || input[i] === "%"){
            input = input.replace(input[i]," ")
        }
    }
    operands = input.split(" ")
}
storeOps()
storeNum()
//check if there are divide/multiply operators and do these first
function sortMath(){
    for(i = 0; i < operators.length; i++){
        if(operators[i] === "*" || operators[i] === "/" || operators[i] === "%" ){
            switch(true){
                case operators[i] === "*":
                    sortResult = operands[i] * operands[i+1]
                    operands = operands.slice(0,i-1)
                    operands[i] = sortResult
                    break
                case operators[i] === "/":
                    sortResult = operands[i] / operands[i+1]
                    operands = operands.slice(0,i-1)
                    operands[i] = sortResult
                    break
                case operators[i] === "%":
                    sortResult = operands[i] % operands[i+1]
                    operands = operands.slice(0,i-1)
                    operands[i] = sortResult
                    break
            }
        }
    }
}

//