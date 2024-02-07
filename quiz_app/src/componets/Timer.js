import React, { useEffect } from "react";

export default function Timer({ dispatch, remainingSeconds }) {
  const minute = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minute < 10 && "0"}
      {minute}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
