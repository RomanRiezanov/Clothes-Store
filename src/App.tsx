import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Trans } from "@lingui/macro";

import Button from "./components/Button/Button";

interface ButtonProps {
  title: string;
  buttonType: string;
  active: boolean;
}

function App() {
  const data: ButtonProps[] = [
    {
      title: "Add to Cart",
      active: true,
      buttonType: "buttonText",
    },
    {
      title: "Add to favorites",
      buttonType: "buttonText",
      active: false,
    },

    {
      title: "4.5",
      buttonType: "buttonSize",
      active: false,
    },

    {
      title: "5",
      buttonType: "buttonSize",
      active: true,
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Trans>Hello</Trans>Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        <div>
          <Button title={data[0].title} active={data[0].active} buttonType={data[0].buttonType} />
          <Button title={data[1].title} active={data[1].active} buttonType={data[1].buttonType} />
          <Button title={data[2].title} active={data[2].active} buttonType={data[2].buttonType} />
          <Button title={data[3].title} active={data[3].active} buttonType={data[3].buttonType} />
        </div>
      </header>
    </div>
  );
}

export default App;
