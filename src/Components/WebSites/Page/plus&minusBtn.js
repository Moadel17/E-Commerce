// import "./styles.css";
import React, { useEffect, useState } from "react";

export default function PlusAndMinus(props) {
  let [count, setCount] = useState(1);

  useEffect(() => {
    props.setBTN(count);
    if (props.changeCount) {
      props.changeCount(props.id , count)
    }
  }, [count]);
  useEffect(() => {
    if (props.Count) {
      setCount(props.Count);
    }
  }, [props.Count]);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  return (
    <div className="App d-flex">
      <button
        style={{ padding: "10px", borderRadius: "20px", outline: "none" }}
        onClick={incrementCount}>
        +
      </button>
      <div style={{ fontSize: "20px", margin: "10px 10px 0px" }}>{count}</div>
      <button
        style={{ padding: "10px", borderRadius: "20px", outline: "none" }}
        onClick={decrementCount}>
        -
      </button>
    </div>
  );
}
