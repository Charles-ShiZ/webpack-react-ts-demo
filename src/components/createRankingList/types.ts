export interface State{
  visible:boolean;
  editedUserName:string; // 用于修改用户名的功能，表示希望修改后的名字
  classPeriod:string;
  imageSaveModal:boolean;
  classPeriodId:number;
  awardTypeId:number;
  awardTypes:any;
  middleImageHeight:number;
  addUsersPopoverVisible:boolean;
  deleteUsersPopoverVisible:boolean;
  addUsersNumber:number;
  addUsersNumberOptions:number[]; // 增加用户数量的选项
  cover:number;
  covers:{
    id:number;
    label:string;
    imgUrl:string;
  }[];
  coverCut:string[];
  coverCuts:string[][];
  confirmLoading:boolean;
  table:{
    size:number;
    currentPageIndex:number;
    selectedRowKeys:number[];
    dataSourse:RowData[];
  };
}

export interface Action{
  act:string; // 行为
  type?:string; // 类型(通常指变量名)
  value:any; // 新值
}

export interface RowData{
  key:string|number;
  userId:number|string;
  userName:string;
  nickName:string;
  age:number;
  userNameInput:boolean; // 是否是输入框的状态
  real:boolean; // 是否是真实学生信息
}
export interface Props{
  data?:{
    selectedRows:any;
    classPeriod:any;
    classId:number|string;
    termId:number;
    packageId:number;
    selectedRowKeys:any;
    getFormData:any;
    allSelected:any;
    unSelectedRowKeys:any;
  };
  visible:boolean;
  onCancel:() => void;
}
