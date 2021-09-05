export interface Props{
  coverCut:string[];
  users:{
    name:string;
    id:number;
  }[];
  visible:boolean;
  confirmLoading:boolean;
  onOK:() => void;
  onCancel:() => void;
}
