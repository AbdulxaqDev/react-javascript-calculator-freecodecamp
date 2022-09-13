import React, { useState } from "react";
import "./App.css";
import nerdamer from "nerdamer";

function App() {
  type All = string[];
  const [all, setAll] = useState<All>([]);
  const [currentNum, setCurrentNum] = useState("");

  const clear = () => {
    setCurrentNum("");
    setAll([]);
  };

  const mathOperatopn = (operation: string) => {
    if (all.includes("=")) {
      setAll([currentNum, operation]);
      setCurrentNum(operation);
    } else {
      const cle = all[all.length - 1];
      const cse = all[all.length - 2];
      if (cle !== "-" && cle !== "+" && cle !== "/" && cle !== "*") {
        setCurrentNum(operation);
        setAll([...all, operation]);
      } else if (
        (cle === "-" || cle === "+" || cle === "/" || cle === "*") &&
        (cse === "-" || cse === "+" || cse === "/" || cse === "*")
      ) {
        setCurrentNum(operation);
        setAll([...all.slice(0, all.length - 2), operation]);
      } else if (cle === "*") {
        setCurrentNum(operation);
        setAll([...all, operation]);
      } else {
        setCurrentNum(operation);
        setAll([...all.slice(0, all.length - 1), operation]);
      }
    }
  };

  const equal = () => {
    let result: any;
    if (all.includes("=")) return;
    if (all.length === 0) return;
    const cle = all[all.length - 1];
    if (cle === "-" || cle === "+" || cle === "/" || cle === "*") {
      result = nerdamer(all.slice(0, all.length - 1).join("")).evaluate();
      setAll([...all.slice(0, all.length - 1), "=", result.text()]);
    } else {
      result = nerdamer(all.join("")).evaluate();
      setAll([...all, "=", result.text()]);
    }
    setCurrentNum(result.text());
  };

  const nums = (num: string) => {
    if (all.includes("=")) {
      setAll([num]);
      setCurrentNum(num);
    } else {
      if (num === ".") {
        if (currentNum.split("").includes(".")) return;
        if (currentNum.split("")[0] === "0") {
          setCurrentNum(currentNum + ".");
          setAll([...all, "."]);
        } else {
          setCurrentNum(currentNum + "0.");
          setAll([...all, "0."]);
        }
      }
      if (num === "0") {
        const cle = currentNum.split("")[0];
        if (cle !== "-" && cle !== "+" && cle !== "/" && cle !== "*") {
          if (
            currentNum.split("")[0] === "0" &&
            !currentNum.split("").includes(".")
          )
            return;
        } else {
          if (
            currentNum.split("")[1] === "0" &&
            !currentNum.split("").includes(".")
          )
            return;
        }
        setCurrentNum(currentNum + "0");
        setAll([...all, "0"]);
        return;
      }
      setCurrentNum(currentNum + num);
      setAll([...all, num]);
    }
  };

  return (
    <div className="App">
      <div id="frame">
        <div id="screen">
          <div id="sub-display">{all.join("")}</div>
          <div id="display">{currentNum === "" ? "0" : currentNum}</div>
        </div>
        <div id="buttons">
          <button onClick={clear} id="clear">
            AC
          </button>
          <button onClick={() => mathOperatopn("/")} id="divide">
            /
          </button>
          <button onClick={() => mathOperatopn("*")} id="multiply">
            x
          </button>
          <button onClick={() => nums("7")} id="seven">
            7
          </button>
          <button onClick={() => nums("8")} id="eight">
            8
          </button>
          <button onClick={() => nums("9")} id="nine">
            9
          </button>
          <button onClick={() => mathOperatopn("-")} id="subtract">
            -
          </button>
          <button onClick={() => nums("4")} id="four">
            4
          </button>
          <button onClick={() => nums("5")} id="five">
            5
          </button>
          <button onClick={() => nums("6")} id="six">
            6
          </button>
          <button onClick={() => mathOperatopn("+")} id="add">
            +
          </button>
          <button onClick={() => nums("1")} id="one">
            1
          </button>
          <button onClick={() => nums("2")} id="two">
            2
          </button>
          <button onClick={() => nums("3")} id="three">
            3
          </button>
          <button onClick={() => nums("0")} id="zero">
            0
          </button>
          <button onClick={() => nums(".")} id="decimal">
            .
          </button>
          <button onClick={equal} id="equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
