import React from 'react';
import { Button } from 'antd';

export function EventDelegButton(props:{
  children:JSX.Element;
  act:'add'|'edit'|'delete'|'save';
}){
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Button
        data-act={props.act}
        style={{
          width: '30px',
          position: 'absolute',
          zIndex: 3,
          background: 'transparent',
        }}
        size="small"
      > </Button>
      {props.children}
    </div>
  );
}
