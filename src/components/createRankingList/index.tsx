import React, { useReducer } from "react";
import { Modal, Card, Button, Table, Radio,
  Tag, Image, Popover, message, InputNumber,
  Popconfirm,
} from "antd";
import { Props, RowData } from "./types";
import { initialState, reducer } from "./useReducer";
export default function CreateRankingList(props:Props){
  const [ state, dispatch ] = useReducer(reducer, initialState);

  return (
    <Button>asdfasdf</Button>
  );
}
