// import { uploadFile } from 'src/utils/upload';
import html2canvas from "html2canvas";
export function returnRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
// 返回随机名字
export function returnRandomName(){
  const familyNames = [
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
    "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
    "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
    "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
    "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
    "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹",
  ];
  const givenNames = [
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌",
  ];
  return (
    familyNames[returnRandom(0, familyNames.length - 1)] +
      givenNames[returnRandom(0, givenNames.length - 1)]
  );
}
// 上传榜单图片到cdn
export function uploadImgToCDN(base64Img:string, fileName:string){
  const file = base64ToFile(base64Img, fileName) as File;
  return new Promise((resolve, reject) => {
    // uploadFile(file, file.name,
    //   (res) => {
    //     resolve(res.url);
    //   },
    //   (err) => {
    //     reject(err);
    //   },
    // );
  });
}

// 生成图片
export async function createImage(info:{
    id:string;
    name:string;
    imageType?:"png" | "jpg";
  }):Promise<string>{
  if(!info.imageType) {info.imageType = "png";}
  try {
    const html = document.getElementById(info.id) as HTMLElement;
    const canvas = await html2canvas(document.getElementById(info.id), {
      useCORS: true, // 【重要】开启跨域配置
      width: html.clientWidth, // 设置canvas尺寸与所截图尺寸相同，防止白边
      height: html.clientHeight,
    });
    const url = canvas.toDataURL(`image/${info.imageType}`);
    saveImage(url, info.name);
    return url;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export function preloadImages(images:string[]) {
  images.forEach((image) => {
    const imgObj = new Image();
    imgObj.src = image;
  });
  return 1;
}
// 保存图片
export function saveImage(url:string, name:string):void{
  const imageDownload = document.createElement("a");
  imageDownload.download = name; // 设置下载文件的名字
  imageDownload.href = url;
  document.body.appendChild(imageDownload);
  imageDownload.click();
  imageDownload.remove();
}

// 将base64转换为file
export function base64ToFile(base64Img:string, fileName:string) {
  const arr = base64Img.split(",");
  console.log(arr);
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });
  const now = new Date();
  blob["lastModifiedDate"] = now;
  blob["lastModified"] = now.valueOf();
  blob["name"] = fileName;
  blob["uid"] = now.valueOf();
  return blob;
}

// 输出错误以及出错位置
export function logErrorWithPath(error, filePath){
  console.error(
    "ErrorFilePath:", `(${filePath})`,
    "\n",
    "Problem:", `(${error})`,
  );
}
