import "./DiceIcon.css";

function DiceIcon({ width, number }) {
  let k;
  switch (number) {
    case 1:
      k = [4];
      break;
    case 2:
      k = [0, 8];
      break;
    case 3:
      k = [0, 4, 8];
      break;
    case 4:
      k = [0, 2, 6, 8];
      break;
    case 5:
      k = [0, 2, 4, 6, 8];
      break;
    case 6:
      k = [0, 2, 3, 5, 6, 8];
      break;
  }
  return (
    <div className="DiceIcon" style={{ width: width, height: width }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => (
        <div className={k.includes(value) ? "dot" : null}></div>
      ))}
    </div>
  );
}

export default DiceIcon;
