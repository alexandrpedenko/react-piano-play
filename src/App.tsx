import React from "react";
import { Logo, Footer, Main } from "./components";
import "./App.css";

function App() {
  return (
    <div className='app'>
      <Logo />
      <main className='app-content' >
        <Main />
      </main>
      <Footer />
    </div>
  );
}

export default App;
