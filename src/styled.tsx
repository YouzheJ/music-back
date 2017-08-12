// 公用样式的组件
import * as React from 'react';
import styled from 'styled-components';
import BS from './config/BASESTYLE';
import { Link } from 'react-router-dom';

export const Header = styled.div`
  display: flex;
  justify-content: center;
  background: ${BS.bg}
`;

export const Ul = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export const Li = styled.div`
  display: flex;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  background: ${BS.bg3};
  color: ${BS.font_s};
  cursor: pointer;
  box-shadow: 2px 5px 10px ${BS.shadow};
  transition: all 0.3s linear;

  &: hover {
    background: ${BS.bg2};
    box-shadow: 5px 10px 20px ${BS.shadow};
  }
`;

export const ButtonFull = Button.extend`
  width: 80%;
  background: #3d8;
`;

export const StyleLink = styled(Link)`
  color: #fff;
  font-weight: blod;
  text-decoration: none;
  width: 100%;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0 0 0 10px;
  margin: 0;
  width: 150px;
  height: 30px;
  font-size: 16px;
  color: ${BS.font_s};
  border: 1px solid ${BS.border};
  outline: 0;
  transition: outline 0.3s linear;

  &: focus, &: hover {
    outline: ${BS.blue_s} outset thin;
  }
`;

const StyleUplodInput = styled.label`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // opacity: 0;
  cursor: pointer;
  overflow: hidden;

  input {
    width: 0;
    height: 0;
    // opacity: 0;
    position: absolute;
    top: -100%;
    left: 0;
  }
`

interface Props {
  name: string;
}

export let Icon = (props: Props) => 
  (<i className={`icon iconfont ${props.name}`}/>);

  export const UploadInput = (props: any) => 
    (<StyleUplodInput>
      <input type="file" {...props}/>
    </StyleUplodInput>)