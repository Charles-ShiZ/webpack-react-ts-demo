import React, { useState, useEffect } from 'react';
import { Modal, Card } from 'antd';
import { Props } from './types';
const BUSINESSLINE = 1
enum themesColor {
  'orange' = 1,
  '#9254de' = 2,
}
export const PreviewImages:React.FC<Props> = function(props:Props){
  const [numberPerPage, setNumberPerPage] = useState(15);

  useEffect(() => {
    setTimeout(() => {
      const NamesBoxs = document.getElementsByClassName('rankingImage-NamesBox');
      if(NamesBoxs.length > 0){
        const middleImgs = document.getElementsByClassName('rankingImage-middleImage');
        for (let i = 0; i < middleImgs.length; i++) {
          (middleImgs[i] as HTMLImageElement).height = NamesBoxs[i].clientHeight;
        }
      }
    });
  }, [ props.visible ]);

  function toBatch(users:Props['users']) {
    const batchs:Props['users'][] = [];
    for (let i = 0; i < users.length; i += numberPerPage) {
      batchs.push(users.slice(i, i + numberPerPage));
    }
    return batchs;
  }

  return (
    <Modal
      title="预览和编辑"
      visible={props.visible}
      confirmLoading={props.confirmLoading}
      style={{
        maxWidth: '376px',
      }}
      onOk={props.onOK}
      onCancel={props.onCancel}
      bodyStyle={{
        display: 'flex',
        padding: 0,
        overflowX: 'auto',
      }}
      okText="保存"
    >
      {
        toBatch(props.users).map((usersBatch, index) => (
          <Card
            title={<div>
              <span style={{
                fontSize: '2px',
                border: '2px solid ' + themesColor[BUSINESSLINE],
                width: '20px',
                height: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: themesColor[BUSINESSLINE],
              }}>
                {index + 1}
              </span>
            </div>}
            key={index}
            size="small"
            bodyStyle={{
              width: '374px',
              maxHeight: '600px',
              overflow: 'auto',
              background: '#eee',
            }}>
            <div id="rankingImage">
              <div>
                <img
                  width="100%"
                  src={props.coverCut[0]}
                />
              </div>
              <div style={{
                width: '100%',
                position: 'relative',
              }} >
                <img
                  id="rankingImage-middleImage"
                  className="rankingImage-middleImage"
                  width="100%"
                  src={props.coverCut[1]}
                />
                <div
                  id="rankingImage-NamesBox"
                  className="rankingImage-NamesBox"
                  style={{
                    color: 'burlywood',
                    fontSize: '22px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: usersBatch.length > 1
                      ? 'space-between' : 'center',
                    alignItems: 'center',
                    padding: '0 45px',
                    lineHeight: 'unset',
                    border: 'none',
                    position: 'absolute',
                    top: '0',
                    width: '100%',
                  }}>
                  {
                    usersBatch.map((item) => {
                      const userName = item.name.trim().slice(0, 5);
                      if(!userName) return;
                      const hasChinese = /[\u4E00-\u9FFF]+/g.test(userName);
                      return (
                        <div
                          key={item.id}
                          style={{
                            margin: '0 6px',
                            fontSize: userName.length > 3 ? 69 / userName.length + 'px' : '',
                            height: '32px',
                            width: '69px',
                            textAlignLast: hasChinese && userName.length > 1 ? 'justify' : 'center',
                            lineHeight: '32px',
                            overflow: 'hidden',
                          }}
                        >
                          {userName}
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div>
                <img
                  width="100%"
                  src={props.coverCut[2]}
                />
              </div>
            </div>
          </Card>
        ))
      }
    </Modal>

  );
};

PreviewImages.defaultProps = {
  coverCut: [],
  users: [],
  visible: false,
  confirmLoading: false,
  onOK: null,
  onCancel: null,
};
