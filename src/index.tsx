import React, {useState} from "react";
import ReactDom from "react-dom";
import CreateRankingList from "./components/createRankingList/index";
import "./index.css";
function App(){
  const [visible,setVisible] = useState(false);
  return <div>
    <CreateRankingList
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    />
  </div>;
}
ReactDom.render(<App/>,document.querySelector("#app"));