import React, {useState} from "react";
import ReactDom from "react-dom";
import "./index.css";
function App(){
  const [visible,setVisible] = useState(false);
  return <div>
	react
  </div>;
}
ReactDom.render(<App/>,document.querySelector("#app"));