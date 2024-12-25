import React, { useState } from "react";

const Rating = ({ rate }) => {
  let result = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.ceil(rate)) {
      result.push("★");
    } else {
      result.push("☆");
    }
  }
  return (
    <>
      {result.map((item, index) => (
        <span className="text-[#4fb6a8] text-xl" key={index}>
          {item}
        </span>
      ))}
    </>
  );
};

export default Rating;