import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import DiceIcon from "./components/DiceIcon";

function App() {
  const [type, setType] = useState("");
  const [num, setNum] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [diceNum, setDiceNum] = useState([1, 2, 3]);
  const [betAmount, setBetAmount] = useState();
  const [dieHistory, setDieHistory] = useState([]);
  const [msg, setMsg] = useState("");

  const bet = (i_type, i_num) => {
    setType(i_type);
    setNum(i_num);
  };

  const randomDieNo = () => Math.floor(Math.random() * 6) + 1;

  const getSumArr = (arr) => arr.reduce((a, b) => a + b, 0);

  const checkTriple = (arr) => arr.every((v) => v === arr[0]);

  const checkSpecTriple = (arr, num) => arr.every((v) => v === num);

  const rollDice = () => {
    if (betAmount == null || betAmount < 1) {
      alert("Please enter a correct bet amount!");
      return;
    }

    if (type === "") {
      alert("Please select a bet!");
      return;
    }
    if (betAmount > balance) {
      alert("You don't have enough money to bet that amount!");
      return;
    }

    let newDie = [];
    for (var k = 1; k <= 3; k++) {
      newDie.push(randomDieNo());
    }

    setDiceNum(newDie);
    setDieHistory((prevState) => {
      let newState = [...prevState];
      if (newState.length === 3) newState.shift();
      newState.push(newDie);
      console.log(newState);
      return newState;
    });

    setBalance((prev) => prev - betAmount);

    if (type === "small") {
      if (checkTriple(newDie)) {
        setMsg("Uh oh, a triple appeared, you didn't win anything!");
        return;
      } else {
        const newDieSum = getSumArr(newDie);
        if (newDieSum >= 4 && newDieSum <= 10) {
          setBalance((pastBal) => pastBal + betAmount);
          setMsg(`Congrat! You win $${betAmount}`);
          return;
        } else {
          setMsg("Uh oh, you didn't win anything!");
          return;
        }
      }
    } else if (type === "big") {
      if (checkTriple(newDie)) {
        setMsg("Uh oh, a triple appeared, you didn't win anything!");
        return;
      } else {
        const newDieSum = getSumArr(newDie);
        if (newDieSum >= 11 && newDieSum <= 17) {
          setBalance((pastBal) => pastBal + betAmount);
          setMsg(`Congrat! You win $${betAmount}`);
          return;
        } else {
          setMsg("Uh oh, you didn't win anything!");
          return;
        }
      }
    } else if (type === "sum") {
      if (getSumArr(newDie) == num[0]) {
        const winAmt = num[1] * betAmount;
        setBalance((pastBal) => pastBal + winAmt);
        setMsg(`Congrat! You win $${winAmt}`);
        return;
      } else {
        setMsg("Uh oh, you didn't win anything!");
        return;
      }
    } else if (type === "single") {
      let times = 0;
      for (var i = 0; i < newDie.length; i++) {
        if (newDie[i] == num[0]) {
          times++;
        }
      }

      if (times != 0) {
        const winAmt = times * betAmount;
        setBalance((pastBal) => pastBal + winAmt);
        setMsg(`Congrat! You win $${winAmt}`);
        return;
      } else {
        setMsg("Uh oh, you didn't win anything!");
        return;
      }
    } else if (type === "pair") {
      for (var i = 0; i < num.length; i++) {
        if (!newDie.includes(num[i])) {
          setMsg("Uh oh, you didn't win anything!");
          return;
        }
      }

      const winAmt = 6 * betAmount;
      setBalance((pastBal) => pastBal + winAmt);
      setMsg(`Congrat! You win $${winAmt}`);
      return;
    } else if (type === "triple") {
      if (checkSpecTriple(newDie, num[0])) {
        const winAmt = 180 * betAmount;
        setBalance((pastBal) => pastBal + winAmt);
        setMsg(`Congrat! You win $${winAmt}`);
        return;
      } else {
        setMsg("Uh oh, you didn't win anything!");
        return;
      }
    } else if (type === "triple_all") {
      if (checkTriple(newDie)) {
        const winAmt = 30 * betAmount;
        setBalance((pastBal) => pastBal + winAmt);
        setMsg(`Congrat! You win $${winAmt}`);
        return;
      } else {
        setMsg("Uh oh, you didn't win anything!");
        return;
      }
    } else if (type === "double") {
      let times = 0;
      for (var i = 0; i < newDie.length; i++) {
        if (newDie[i] == num[0]) {
          times++;
        }
      }

      if (times >= 2) {
        const winAmt = 10 * betAmount;
        setBalance((pastBal) => pastBal + winAmt);
        setMsg(`Congrat! You win $${winAmt}`);
        return;
      } else {
        setMsg("Uh oh, you didn't win anything!");
        return;
      }
    }
  };

  return (
    <div className="App">
      <Board style={{ gridArea: "board" }} bet={bet} />
      <div className="history" style={{ gridArea: "history" }}>
        <h2>Dice history</h2>
        {dieHistory.map((value, index) => (
          <div className="historyDice">
            <DiceIcon width={50} number={value[0]} />
            <DiceIcon width={50} number={value[1]} />
            <DiceIcon width={50} number={value[2]} />
          </div>
        ))}
      </div>
      <div className="play" style={{ gridArea: "play" }}>
        <input
          type="number"
          value={betAmount}
          onChange={(event) => setBetAmount(parseInt(event.target.value))}
          placeholder="Enter bet amount"
        />
        <div className="msg">
          <h2>Current balance: ${balance}</h2>
          <p>{msg}</p>
        </div>
        <div>
          <button onClick={rollDice}>Roll dice</button>
          <div>
            <DiceIcon width={50} number={diceNum[0]} />
            <DiceIcon width={50} number={diceNum[1]} />
            <DiceIcon width={50} number={diceNum[2]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
