import React from "react";

const CircleRow = ({ data, labels }) => {
  return (
    <div className="circle-row">
      {data.map((item, index) => (
        <Circle key={index} label={labels[index]} data={item} />
      ))}
    </div>
  );
};

const Circle = ({ label, data }) => {
  return (
    <div className="circle">
      <p>{data}</p>
      <span>{label}</span>
    </div>
  );
};

export default CircleRow;