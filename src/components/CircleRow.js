import React from "react";

const CircleRow = ({ data, labels }) => {
  return (
    <div className="row">
      {data.map((item, index) => (
        <div key={index} className="col-md-4 d-flex justify-content-center">
        <Circle key={index} label={labels[index]} data={item} />
        </div>
      ))}
    </div>
  );
};

const Circle = ({ label, data }) => {
  return (
    <div className="circle">
      <div className="circle-content">
        <span>{label}</span>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default CircleRow;
