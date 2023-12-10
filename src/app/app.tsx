import React, { useContext } from "react";
import { errorContext } from "../core/error/error.provider";

function App() {
  const { bug, success, info } = useContext(errorContext);

  return (
    <div>
      <button
        onClick={() => {
          bug("DSADSADA");
        }}
      >
        CLICK
      </button>
    </div>
  );
}

export default App;
