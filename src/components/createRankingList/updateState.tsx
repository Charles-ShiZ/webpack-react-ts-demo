import React, { Dispatch } from "react";
import { getListAwardAndCover } from "./api";
import { State, Action, RowData } from "./types";
import { logErrorWithPath } from "./utils";
import { getPageCourseMiddleList, getPageCourseAfterList } from "./api";
import { preloadImages } from "./utils";
const BUSINESSLINE = 1;
const FilePath = "src/pages/performance/rankingListRecord/updateState";

export default (state:State, dispatch:Dispatch<Action>, history?) => ({
  updateBasicData: async() => {
    try {
      const res = await getListAwardAndCover({
        businessLine: BUSINESSLINE,
      });
        // console.log(state.classPeriod);
      if(String(res.status).startsWith("2")){
        const temp1 = res.data.filter((item) => item.classifyDictValue === "课中环节");
        const temp2 = res.data.filter((item) => item.classifyDictValue === "结营环节");
        const awardTypes = {
          "课中环节": temp1.concat(temp2).map((item) => ({
            id: item.rewardTypeDictId,
            label: item.rewardTypeDictValue,
            classPeriodId: item.classifyDictId,
            coverCuts: JSON.parse(item.cutPictureUrls),
            covers: JSON.parse(item.demoPictureUrl).map((url, index) => ({
              id: index + 1,
              label: "封面" + (index + 1),
              imgUrl: url,
            })),
          })),
          "结营环节": temp2.concat(temp1).map((item) => ({
            id: item.rewardTypeDictId,
            label: item.rewardTypeDictValue,
            classPeriodId: item.classifyDictId,
            coverCuts: JSON.parse(item.cutPictureUrls),
            covers: JSON.parse(item.demoPictureUrl).map((url, index) => ({
              id: index + 1,
              label: "封面" + (index + 1),
              imgUrl: url,
            })),
          })),
        };
        state.awardTypes = awardTypes;
        const firstAwardType = awardTypes[state.classPeriod][0];
        state.classPeriodId = firstAwardType.classPeriodId;
        state.awardTypeId = firstAwardType.id;
        state.cover = 1;
        state.covers = firstAwardType.covers;
        state.coverCut = firstAwardType.coverCuts[state.cover - 1];
        state.table.currentPageIndex = 1;

        // 收集榜单所有相关图片
        const images = (() => {
          const images = [];
          awardTypes[state.classPeriod].forEach(({ coverCuts, covers }) => {
            coverCuts.forEach((item) => {
              images.push(...item);
            });
            covers.forEach((item) => {
              images.push(item.imgUrl);
            });
          });
          return images;
        })();

        // 缓存图片
        preloadImages(images);
        dispatch({
          act: "update",
          value: {
            awardTypes: { ...awardTypes },
            awardTypeId: state.awardTypeId,
            classPeriodId: state.classPeriodId,
            covers: [ ...state.covers ],
            coverCut: [...state.coverCut],
            cover: state.cover,
            table: { ...state.table },
          },
        });
      } else
        {logErrorWithPath(res.data.msg, FilePath + "-updateBasicData");}
    } catch (error) {
      logErrorWithPath(error, FilePath);
    }
  },
  updateTableData: async(params:any) => {
    try {
      let res;
      if(params.classPeriod.name === "课中环节"){
        res = await getPageCourseMiddleList({
          isAllChecked: params.allSelected,
          checkedUserIdList: params.allSelected ? [] : params.selectedRowKeys,
          filterUserIdList: params.unSelectedRowKeys,
          ...params.getFormData(),
          termId: params.termId,
          classId: params.classId,
          packageId: params.packageId,
        });
      } else {
        res = await getPageCourseAfterList({
          isAllChecked: params.allSelected,
          checkedUserIdList: params.allSelected ? [] : params.selectedRowKeys,
          filterUserIdList: params.unSelectedRowKeys,
          ...params.getFormData(),
          termId: params.termId,
          classId: params.classId,
          packageId: params.packageId,
        });
      }

      if(String(res.status).startsWith("2")){
        state.table.dataSourse = res.data.data.map((item) => {
          const obj:RowData = {
            key: item.userId,
            userId: item.userId,
            userName: item.childName,
            nickName: item.nickname,
            age: item.childAge,
            userNameInput: false,
            real: true,
          };
          return obj;
        });
        dispatch({
          type: "table",
          act: "set",
          value: { ...state.table },
        });
      } else
        {logErrorWithPath(res.data.msg, FilePath + "-updateTableData");}
    } catch (error) {
      logErrorWithPath(error, FilePath + "-updateTableData");
    }
  },
});
