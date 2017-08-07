// 公用样式的组件
import styled from 'styled-components'
import BS from './config/BASESTYLE'
import { Link } from 'react-router'

export const Header = styled.div`
  display: flex;
  justify-content: center;
  background: ${BS.bg}
`

export const Ul = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`

export const Li = styled.div`
  display: flex;
`

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  background: ${BS.bg3};
  color: #fff;
  cursor: pointer;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
`

export const ButtonFull = Button.extend`
  width: 80%;
  background: #3d8;
`

export const StyleLink = styled(Link)`
  color: #fff;
  font-weight: blod;
  text-decoration: none;
  width: 100%;
  text-align: center;
`