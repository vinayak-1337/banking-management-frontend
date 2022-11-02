import React from "react";
import "./flash-alert.styles.css"

export default function FlashAlert({ value, show,type="" }) {
  if (!show) return null;
  const style = "flash-alert " + type ;
  console.log(style);
  return <div className={style}>{value}</div>;
}
