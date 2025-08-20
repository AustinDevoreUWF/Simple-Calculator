import { useState } from 'react'

function App() {
  const [calc, setCalc] = useState('')
  const [result, setResult] = useState("");
  const ops = ['/', '*', '+', '-', '.'];

const updateCalc = (value: string) =>{//goal, we dont want ++ +- only +2-2
    if(ops.includes(value) && calc === ''||//checks if the passed in value is contained in ops array, and checks if the screen is empty before adding an operator
       ops.includes(value) && ops.includes(calc.slice(-1))//checks if the value is contained in the ops array, and check if the last thing calc had was in the ops array aswell
      ){return;}  //returns nothing if ^
          setCalc(prev => (prev === '0' && !ops.includes(value) ? value : prev + value));//setCalc, when prev===0 and value is not included in ops, then value, else prev + value
      if(!ops.includes(value)){
          setResult(eval((calc === '0' ? '' : calc) + value).toString())//here is the math! eval() is a function that evaluates string values calc + value is adding all previous buttons pressed and eval them into a string
        }
      }
const numberWriter = () => {//function to write numbers of type string
        const digits =[];//create an empty array 

        for(let i=1; i<10;i++){//for 1-9 iterate
          digits.push(//push on the digits class
            <button //a button
            onClick={()=> updateCalc(i.toString())} // that when clicked(()=> func), updates the calculator display to the string value of whatever iteration we are on
            key={i}>{i}
            </button>)//A loop always has a key here its key={i}, then write {i} which is the number on the button and the iteration.
        }
        return digits;
      }
const clearCalc = ()=>{
    setCalc('');
    setResult('0');
}
const calculate = () =>{
  setCalc(eval(calc).toString())//taking what is in the calc and evals it into the setCalc function as a string
}
  return (
      <div className="App">
        <div className="container">

        <div className="calculator">
          <div className="display">
            {result ? <span>({result})</span>: ''}&nbsp;{calc || "0"} {/*Here &nbsp means non breaking space, acts as a space without collapsing into 1 white space */}
          </div>
          <div className="operators">
            <button onClick={()=> updateCalc("/")}>/</button>
            <button onClick={()=> updateCalc("*")}>*</button>
            <button onClick={()=> updateCalc("+")}>+</button>
            <button onClick={()=> updateCalc("-")}>-</button>

            <button onClick={clearCalc}>DEL</button>
            </div>
            <div className="digits">
              {numberWriter()}
             <button onClick={()=> updateCalc(".")}>.</button>
            <button onClick={()=> updateCalc("0")}>0</button>
            <button onClick={calculate}>=</button>
          </div>
        </div>
      </div>
      </div>
  
    
  )
}

export default App