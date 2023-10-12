import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <>
      <TipCalculator />
    </>
  );
}
function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  function handelBill(bill) {
    if (!bill || isNaN(bill)) return setBill(0);
    setBill(Number(bill));
  }

  function handelClear() {
    setBill(0);
    setTip1(0);
    setTip2(0);
  }

  return (
    <div className="tips">
      <h3>Tips Calculator</h3>
      <Tip text="How much was the bill?">
        <input
          type="text"
          value={bill}
          onChange={(e) => handelBill(e.target.value)}
        />
      </Tip>
      <Tip text="How did you like the service ?">
        <SelectBox key="1" tip={tip1} onTip={setTip1} />
      </Tip>
      <Tip text="How did your friend like the service ?">
        <SelectBox key="2" tip={tip2} onTip={setTip2} />
      </Tip>
      {bill !== 0 ? (
        <Bill bill={bill} tip={tip1 + tip2} onClear={handelClear} />
      ) : null}
    </div>
  );
}

function Tip({ text, children }) {
  return (
    <div className="tip">
      <span>{text}</span>
      {children}
    </div>
  );
}

function Bill({ bill, tip, onClear }) {
  const percentageTip = Math.round(((tip / 100) * bill) / 2);
  const totalBill = bill + percentageTip;
  return (
    <div>
      <h4>
        You pay ${totalBill} (${bill} + ${percentageTip} tip.)
      </h4>
      <button onClick={onClear}>Restart</button>
    </div>
  );
}

function SelectBox({ tip, onTip }) {
  return (
    <select value={tip} onChange={(e) => onTip(+e.target.value)}>
      <option value={0}>Dissatisfied(0%)</option>
      <option value={5}>It was Okey(5%)</option>
      <option value={10}>It was good(10%)</option>
      <option value={20}>Absolutely amazing(20%)</option>
    </select>
  );
}
