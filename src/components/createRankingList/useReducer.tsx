import { State, Action } from "./types";
export const initialState:State = {
  visible: false,
  classPeriod: "",
  classPeriodId: null,
  editedUserName: "",
  cover: null,
  covers: [],
  coverCut: [],
  coverCuts: [[]],
  awardTypeId: 123,
  middleImageHeight: 0,
  awardTypes: {
    "课中环节": [],
    "结营环节": [],
  },
  addUsersPopoverVisible: false,
  deleteUsersPopoverVisible: false,
  addUsersNumber: 5,
  addUsersNumberOptions: [10, 20, 30],
  confirmLoading: false,
  imageSaveModal: false,
  table: {
    size: 10,
    currentPageIndex: 1,
    selectedRowKeys: [],
    dataSourse: [
      // {
      //   key: '1',
      //   userName: '胡彦斌',
      //   userNameInput: false,
      //   nickName: '西湖区湖底公园1号',
      //   age: 32,
      //   isRealStud: true,
      // },
      // {
      //   key: '2',
      //   userName: '胡彦祖',
      //   userNameInput: false,
      //   nickName: '西湖区湖底公园1号',
      //   age: 42,
      //   isRealStud: true,
      // },
    ],
  },
};

export function reducer(state:State, action:Action):State {
  const { type: propName, act, value } = action;
  switch (act) {
    case "set":
      console.log(value);
      return { ...state, [propName]: value };
    case "update":
      // console.log(value);
      return { ...state, ...value };
    default:
      break;
  }
  return state;
}
