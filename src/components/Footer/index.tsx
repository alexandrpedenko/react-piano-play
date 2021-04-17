import React, { FunctionComponent } from "react";
import "./styles.css";

export const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear();

  return <footer className='footer'>{currentYear}</footer>;
};
