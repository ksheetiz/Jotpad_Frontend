import React from "react";

function Alert(props) {
  const setTextToUpper = () => {
    let newText = props.alert.type.toLowerCase();
    newText = newText.charAt(0).toUpperCase() + newText.slice(1);
    return newText;
  };

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{setTextToUpper()}</strong> : {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
