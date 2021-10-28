import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./index.css";

function App(){
  return (
    <BrowserRouter>
      <Link to="home">home</Link>
      <Switch>
        <Route path='/home'>
          <div style={{
            fontSize:"30px"
          }}>home</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
// 我改了-4-25-4.31-123213
ReactDom.render(<App />, document.querySelector("#root"));