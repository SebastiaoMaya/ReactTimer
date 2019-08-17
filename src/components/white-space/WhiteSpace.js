import React from 'react';

export default function WhiteSpace(props) {
  const obj = [];
  for (let index = 0; index < props.number; index++) {
    obj.push(<br key={`${index}whitespace`} />);
  }
  return obj;
}
