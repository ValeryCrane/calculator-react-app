import React, { useState } from "react";
import Button from "../button/Button";
import "./Calculator.css";

let operators = ["+", "-", "*", "/"];

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");

  const buttons = [
    { label: "C", onClick: () => clearDisplay() },
    { label: "/", onClick: (label) => addToDisplay(label) },
    { label: "7", onClick: (label) => addToDisplay(label) },
    { label: "8", onClick: (label) => addToDisplay(label) },
    { label: "9", onClick: (label) => addToDisplay(label) },
    { label: "*", onClick: (label) => addToDisplay(label) },
    { label: "-", onClick: (label) => addToDisplay(label) },
    { label: "4", onClick: (label) => addToDisplay(label) },
    { label: "5", onClick: (label) => addToDisplay(label) },
    { label: "6", onClick: (label) => addToDisplay(label) },
    { label: "+", onClick: (label) => addToDisplay(label) },
    { label: ".", onClick: (label) => addToDisplay(label) },
    { label: "1", onClick: (label) => addToDisplay(label) },
    { label: "2", onClick: (label) => addToDisplay(label) },
    { label: "3", onClick: (label) => addToDisplay(label) },
    { label: "0", onClick: (label) => addToDisplay(label) },
    { label: "00", onClick: (label) => addToDisplay(label) },
    { label: "=", onClick: () => calculate() },
  ];

     // Добавление новых символов на экран калькулятора.
    function addToDisplay(val) {
        let currentString = displayValue
        let lastOperatorIndex = Math.max(...operators.map(element => currentString.lastIndexOf(element)))

        // Обработка выведенной ошибки.
        if (currentString.slice(-1) === "!") {
            setDisplayValue(val)
            return
        }

        // Обработка нескольких точек подряд.
        if (val === "." && currentString[currentString.length - 1] == ".") {
            setDisplayValue(currentString)
            return 
        }

        // Обработка некорректных строк.
        if (operators.includes(val)) {
            if (currentString.length === 0) {
                setDisplayValue(currentString)
            } else if (lastOperatorIndex !== -1 && lastOperatorIndex === currentString.length - 1) {
                setDisplayValue(currentString.slice(0, currentString.length - 1) + val)
            } else {
                setDisplayValue(currentString + val)
            }
        } else {
            if (lastOperatorIndex === -1) {
                if (currentString === "0") {
                    setDisplayValue(val)
                } else {
                    setDisplayValue(currentString + val)
                }
            } else if (lastOperatorIndex === currentString.length - 2 && currentString.slice(-1) === "0") {
                setDisplayValue(currentString.slice(0, currentString.length - 1) + val)
            } else {
                setDisplayValue(currentString + val)
            }
        }
    }

    // Очистка экрана калькулятора.
    function clearDisplay() {
        setDisplayValue("0");
    }

// Обработка нажатия на кнопку равно.
    function calculate() {
        let expression = displayValue;
    
        // Проверка на то, что последний символ - оператор.
        if (operators.includes(expression.slice(-1))) {
            return
        }
    
        // Проверка на деление на ноль.
        if (expression.includes("/0")) {
            setDisplayValue("You can't divide by zero!");
            return;
        }
    
        // Вычисление результата.
        let result = calculateExpression(expression);
    
        // Проверка на выход за пределы Number.
        if (!isFinite(result)) {
            setDisplayValue("You exceeded number type limit!")
        } else {
            setDisplayValue(result)
        }
    }

    // Вычисление результата.
    function calculateExpression(expression) {

        // Проверка на то, что expression просто цифра.
        if (!isNaN(expression)) {
            return parseFloat(expression);
        }
    
        let result = 0;
    
        for (let i = 0; i < operators.length; i++) {
            let op = operators[i];
            let [firstPart, ...restParts] = expression.split(op)
            let parts = [firstPart].concat(restParts.join(op) === '' ? [] : [restParts.join(op)]);
        
            // Если expression разделился по оператору, то вычисляем значение 
            // двух частей и применяем оператор.
            if (parts.length > 1) {
                let left = calculateExpression(parts[0]);
                let right = calculateExpression(parts[1]);
                result = applyOperator(left, right, op);
                break;
            }
        }
        
        return result;
    }
    
    // Применение оператора.
    function applyOperator(left, right, op) {
        switch (op) {
        case "+":
            return left + right;
        case "-":
            return left - right;
        case "*":
            return left * right;
        case "/":
            return left / right;
        default:
            return 0;
        }
    }

  return (
    <div className="calculator">
      <input type="text" value={displayValue} className="display" disabled/>
      <div className="keys">
        {buttons.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;
