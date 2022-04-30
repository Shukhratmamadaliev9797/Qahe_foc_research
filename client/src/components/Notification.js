import React from "react";

export default function Notification(props) {
  return (
    <div className="notification">
      <div className={`notification__box ${props.extraClass}`}>
        <span>
          {props.success ? (
            <i class="far fa-check-circle"></i>
          ) : props.error ? (
            <i class="fas fa-exclamation-circle"></i>
          ) : (
            ""
          )}
        </span>
        {props.children}
      </div>
    </div>
  );
}
