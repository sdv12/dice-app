import React from "react";

const Result = ({ action, bodyPart }) => {
  if (!action || !bodyPart) return null;

  return (
    <div className="result">
      <h2>
        🔥 {action} el/la {bodyPart} 🔥
      </h2>
    </div>
  );
};

export default Result;