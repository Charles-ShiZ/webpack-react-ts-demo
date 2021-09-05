// import { API, API_GATEWAY_ROCKET, API_ROCKET_AI } from 'src/utils/http';


export async function saveRecordOfRankingList(
    params:{
      userIds:(string | number)[]; // 学生用户id
      classId:string | number; // 班级id
      ossUrl:string; // 七牛云存储链接
      targetUrl:string; // H5链接
      awardId:number; // 奖项id, 字典表的id
      linkId:number; // 环节id, 字典表的id
      businessLine:number; // 业务线, 1:小火箭，2:探月，3:B2C
  },
){
  // const res = await API_GATEWAY_ROCKET.post('/ranking-list/record/save', params);
  // return res;
}

export async function getListAwardAndCover(
    params:any,
){
  // const res = await API_GATEWAY_ROCKET.get('/ranking-list/record/listAwardAndCover', { params });
  // return res;
}

export async function changeStudentName(
    params:{
      userId:number|string;
      childName:string;
    },
){
  // const res = await API_GATEWAY_ROCKET.get('/user/changeChildName', { params });
  // return res;
}

export async function getPageCourseMiddleList(
    params:{
      isAllChecked:boolean;
      checkedUserIdList:(string|number)[];
      filterUserIdList:(string|number)[];
    },
){
  // const res = await API_ROCKET_AI.post('/ranking-list/ext/pageCourseMiddleList', params);
  // return res;
}

export async function getPageCourseAfterList(
    params:{
      isAllChecked:boolean;
      checkedUserIdList:(string|number)[];
      filterUserIdList:(string|number)[];
    },
){
  // const res = await API_ROCKET_AI.post('/ranking-list/ext/pageCourseAfterList', params);
  // return res;
}

