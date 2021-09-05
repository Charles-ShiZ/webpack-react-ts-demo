
import React from "react";
import { Input } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { RowData } from "./types";
import { ColumnsType } from "antd/es/table";
import { EventDelegButton } from "./components/EventDelegButton";

export let userNameInputValue:string;

export default {
  awardTypes: {
    "课中环节": [
      "训练师晋级版", "编程小达人", "优秀训练师", "全勤小明星",
    ],
    "结营环节": [
      "编程探索达人", "源码小英雄", "优秀创想家", "潜力之星",
    ],
  },
  covers: [
    "封面一", "封面二", "封面三",
  ],
  steps: ["步骤一：选择榜单用户", "步骤二：选择奖项类型", "步骤三：选择榜单封面"],
};

export const columns = (state, dispatch):ColumnsType<RowData> => (
  [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: "300px",
      render: (text, record, index) => {
        const userNameInput = record.userNameInput;
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                width: "120px",
              }}
            >
              {
                userNameInput
                  ? (
                    <Input
                      autoFocus
                      style={{
                        width: "100%",
                      }}
                      size={"small"}
                      defaultValue={text}
                      onChange={(e) => {
                        state.editedUserName = e.target.value;
                      }}
                    />
                  )
                  : text ? text : "未填"
              }
            </div>

            <div style={{
              width: "50px",
              display: "flex",
              justifyContent: "space-between",
            }}>
              <EventDelegButton act="edit">
                <EditOutlined/>
              </EventDelegButton>
              <EventDelegButton act="save">
                <SaveOutlined/>
              </EventDelegButton>
            </div>
          </div>
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
      align: "center",
      width: "200px",
      render: (text, record, index) => (text ? text : "未填"),
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "act",
      key: "act",
      align: "center",
      render: () => (
        <EventDelegButton act="delete">
          <DeleteOutlined/>
        </EventDelegButton>
      ),
    },
  ]
);
