// 公用样式的组件
import styled from 'styled-components'
import BS from './config/BASESTYLE'

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
  width: 80%;
  height: 30px;
  background: #3d8;
  color: #fff;
`