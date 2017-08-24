import * as React from 'react';
import styled from 'styled-components';
import { StyleLink } from './styled';
import BS from './config/BASESTYLE';

// import logo from './logo.svg';
import './styles/App.css';

interface Props {
  title: boolean;
  home: boolean;
  list: boolean;
  add: boolean;
  play: boolean;
  help: boolean;
  name: boolean;
}

const StyleHeader: any = styled.div`
  display: flex;
  flex-direction: ${(props: Props) => props.home ? 'row-reverse' : 'row'};
  justify-content: space-between;
  height: 50px;
  width: 100%;
  color: #fff;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const List = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const Item = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`;
const Title: any = styled.div`
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
`;

const StyleLinkM: any = styled(StyleLink)`
  color: ${(props: any) => props['data-home'] ? '#fff' : BS.blue_d};
  transition: color 0.2s linear;

  &: hover {
    color: ${BS.blue_d_hover};
  }
`;

const Header = (props: Props): any => {
  const { title, home, list, add, play, help, name } = props; // 值为true时不显示(name除外)
  return (
      <StyleHeader home={home}>
        {!title && <Title home={home}><StyleLinkM to={'/'} data-home={home}>YOUZHE MUSIC</StyleLinkM></Title>}
        <List>
          {!home && <Item><StyleLinkM to={'/'} data-home={home}>home</StyleLinkM></Item>}
          {!list && <Item><StyleLinkM to={'/list'} data-home={home}>list</StyleLinkM></Item>}
          {!add && <Item><StyleLinkM to={'/add'} data-home={home}>add</StyleLinkM></Item>}
          {!play && <Item>
            <StyleLinkM to={{pathname: '/play', state: {name: name ? name : ''}}} data-home={home}>play</StyleLinkM>
          </Item>}
          {!help && <Item><StyleLinkM to={'/help'} data-home={home}>help</StyleLinkM></Item>}
          <Item><StyleLinkM to={'/demo'} data-home={home}>demo</StyleLinkM></Item>
        </List>
      </StyleHeader>
    );
};

export default Header;
