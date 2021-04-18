import "./Board.css";
import { useEffect, useState } from "react";
import DiceIcon from "./DiceIcon";

function Board({ style, bet }) {
  const [pairCombos, setPairCombos] = useState([]);
  const [chosenCell, setChosenCell] = useState({ type: "", values: [] });

  useEffect(() => bet(chosenCell.type, chosenCell.values), [chosenCell]);

  const genPairCombo = () => {
    let generated = [];
    for (let i = 1; i <= 6; i++) {
      for (let j = i + 1; j <= 6; j++) {
        generated.push([i, j]);
      }
    }
    setPairCombos(generated);
    console.log(pairCombos);
  };

  useEffect(genPairCombo, []);

  const compareArr = (a, b) => {
    if (a.length == b.length) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const checkIfChosen = (type, values) => {
    if (type === chosenCell.type && compareArr(values, chosenCell.values)) {
      return " betChosen";
    }

    return "";
  };

  const chooseCell = (type, values) => {
    setChosenCell({ type: type, values: values });
  };

  return (
    <div className="Board" style={style}>
      <div className="row1">
        <div
          onClick={() => chooseCell("small", [])}
          className={
            "edges orange-border flex-col" + checkIfChosen("small", [])
          }
        >
          <h2>SMALL</h2>
          <h3>4 TO 10</h3>
          <h6>1 WINS 1</h6>
          <h6>LOSE IF ANY TRIPLE APPEARS</h6>
        </div>
        <div className="double1">
          <div
            style={{ gridArea: "double1_head" }}
            className="text-align-center orange-border"
          >
            EACH DOUBLE
            <br /> 1 WINS 10
          </div>
          {[1, 2, 3].map((value, index) => (
            <div
              onClick={() => chooseCell("double", [value, value])}
              style={{ gridArea: "double1_" + value }}
              className={
                "flex-col space-evenly align-items-center orange-border" +
                checkIfChosen("double", [value, value])
              }
            >
              <DiceIcon width={25} number={value} />
              <DiceIcon width={25} number={value} />
            </div>
          ))}
        </div>
        <div className="triple1">
          <div
            style={{ gridArea: "triple1_head" }}
            className="text-align-center orange-border"
          >
            EACH TRIPLE <br /> 1 WINS 180
          </div>
          {[1, 2, 3].map((value, index) => (
            <div
              onClick={() => chooseCell("triple", [value, value, value])}
              style={{ gridArea: "triple1_" + value }}
              className={
                "flex-row space-evenly orange-border" +
                checkIfChosen("triple", [value, value, value])
              }
            >
              <DiceIcon width={19} number={value} />
              <DiceIcon width={19} number={value} />
              <DiceIcon width={19} number={value} />
            </div>
          ))}
        </div>
        <div
          onClick={() => chooseCell("triple_all", [])}
          className={"mid orange-border" + checkIfChosen("triple_all", [])}
        >
          <div style={{ gridArea: "mid_head" }} className="text-align-center">
            1 WINS 30
          </div>
          {[1, 2, 3, 4, 5, 6].map((value, index) => (
            <div
              style={{ gridArea: "mid_" + value }}
              className="flex-row space-evenly"
            >
              <DiceIcon width={10} number={value} />
              <DiceIcon width={10} number={value} />
              <DiceIcon width={10} number={value} />
            </div>
          ))}
        </div>
        <div className="triple1">
          <div
            style={{ gridArea: "triple1_head" }}
            className="orange-border text-align-center"
          >
            EACH TRIPLE <br /> 1 WINS 180
          </div>
          {[4, 5, 6].map((value, index) => (
            <div
              onClick={() => chooseCell("triple", [value, value, value])}
              style={{ gridArea: "triple1_" + (index + 1) }}
              className={
                "flex-row space-evenly orange-border" +
                checkIfChosen("triple", [value, value, value])
              }
            >
              <DiceIcon width={19} number={value} />
              <DiceIcon width={19} number={value} />
              <DiceIcon width={19} number={value} />
            </div>
          ))}
        </div>
        <div className="double1">
          <div
            style={{ gridArea: "double1_head" }}
            className="orange-border text-align-center"
          >
            EACH DOUBLE <br /> 1 WINS 10
          </div>
          {[4, 5, 6].map((value, index) => (
            <div
              onClick={() => chooseCell("double", [value, value])}
              style={{ gridArea: "double1_" + (index + 1) }}
              className={
                "flex-col space-evenly align-items-center orange-border" +
                checkIfChosen("double", [value, value])
              }
            >
              <DiceIcon width={25} number={value} />
              <DiceIcon width={25} number={value} />
            </div>
          ))}
        </div>
        <div
          onClick={() => chooseCell("big", [])}
          className={"edges flex-col orange-border" + checkIfChosen("big", [])}
        >
          <h2>BIG</h2>
          <h3>11 TO 17</h3>
          <h6>1 WINS 1</h6>
          <h6>LOSE IF ANY TRIPLE APPEARS</h6>
        </div>
      </div>
      <div className="row2">
        {[62, 31, 18, 12, 8, 7, 6, 6, 7, 8, 12, 18, 31, 62].map(
          (value, index) => (
            <div
              onClick={() => chooseCell("sum", [index + 4, value])}
              className={
                "row2-items flex-col align-items-center justify-center orange-border" +
                checkIfChosen("sum", [index + 4, value])
              }
            >
              <h1>{index + 4}</h1>
              <h6>1 WINS {value}</h6>
            </div>
          )
        )}
      </div>
      <div className="row3 flex-row">
        {pairCombos.map((values, index) => {
          console.log("Testin");
          return (
            <div
              onClick={() => chooseCell("pair", values)}
              className={
                "flex-1 flex-col space-evenly align-items-center orange-border" +
                checkIfChosen("pair", values)
              }
            >
              {values.map((num, numIndex) => (
                <DiceIcon width={37} number={num} />
              ))}
            </div>
          );
        })}
      </div>
      <div className="row4 flex-row">
        {[1, 2, 3, 4, 5, 6].map((value, index) => (
          <div
            onClick={() => chooseCell("single", [value])}
            className={
              "flex-1 flex-row align-items-center row4-items orange-border" +
              checkIfChosen("single", [value])
            }
          >
            <h3 className="flex-1">{value}</h3>
            <DiceIcon width={35} number={value} />
          </div>
        ))}
      </div>
      <div className="row5 flex-row">
        <div className="flex-1 orange-border flex-col align-items-center justify-center">
          1:1 ON ONE DICE
        </div>
        <div className="flex-1 orange-border flex-col align-items-center justify-center">
          2:1 ON TWO DICE
        </div>
        <div className="flex-1 orange-border flex-col align-items-center justify-center">
          3:1 ON THREE DICE
        </div>
      </div>
    </div>
  );
}

export default Board;
