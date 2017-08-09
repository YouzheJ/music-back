import * as React from 'react'
import styled from 'styled-components'
import { StyleLink } from './styled'
import BS from './config/BASESTYLE'

// import logo from './logo.svg';
import './styles/App.css'

const StyleHeader = styled.div`
  display: flex;
  flex-direction: ${(props: Props) => props.home ? 'row-reverse' : 'row'};
  justify-content: space-between;
  height: 50px;
  width: 100%;
  color: #fff;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const List = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`

const Item = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`
const Title = styled.div`
  color:${(props: Props) => props.home ? '#333' : BS.green_d};
  font-size: 24px;
  transition: color 0.2s linear;
  text-shadow: ${props => props.home ? '0 0 5px rgba(0,0,0,0.3)' : 'none'};
  padding: 10px 20px;

  a {
    color:${props => props.home ? '#333' : BS.green_d};
  }

  &: hover, a: hover {
    color: ${BS.green_d_hover};
  }
`

const StyleLink_m = styled(StyleLink)`
  color: ${(props: Props) => props.home ? '#fff' : BS.blue_d};
  transition: color 0.2s linear;

  &: hover {
    color: ${BS.blue_d_hover};
  }
`

interface Props {
  title: boolean;
  home: boolean;
  list: boolean;
  add: boolean;
  play: boolean;
  help: boolean;
  name: boolean;
}

const Header = (props: Props) : JSX.Element => {
  const { title, home, list, add, play, help, name } = props; // 值为true时不显示(name除外)
  return (
      <StyleHeader home={home}>
        {!title && <Title home={home}><StyleLink_m to={'/'} home={home}>YOUZHE MUSIC</StyleLink_m></Title>}
        <List>
          {!home && <Item><StyleLink_m to={'/'} home={home}>home</StyleLink_m></Item>}
          {!list && <Item><StyleLink_m to={'/list'} home={home}>list</StyleLink_m></Item>}
          {!add && <Item><StyleLink_m to={'/add'} home={home}>add</StyleLink_m></Item>}
          {!play && <Item><StyleLink_m to={'/play'} query={{name: name?name:''}} home={home}>play</StyleLink_m></Item>}
          {!help && <Item><StyleLink_m to={'/help'} home={home}>help</StyleLink_m></Item>}
        </List>
      </StyleHeader>
    )
}

export default Header;
