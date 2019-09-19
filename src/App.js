import React from "react";
import * as firebase from "firebase";
// import logo from "./logo.svg";
import "./App.css";
import FromToInput from "./components/FromToInput";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDvbZFqxuP5I57ur7XS_Xy4QPM6zXAEdaE",
    authDomain: "airport-shortest-route.firebaseapp.com",
    databaseURL: "https://airport-shortest-route.firebaseio.com",
    projectId: "airport-shortest-route",
    storageBucket: "",
    messagingSenderId: "447605527875",
    appId: "1:447605527875:web:bb1b1519b8b25a52490bf6"
  };
  //var app = firebase.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Shortest Airport Route</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div style={{ paddingTop: "40px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
          Shortest Airport Route
        </h1>
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="col-md-6 col-xs-12">
              <FromToInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
