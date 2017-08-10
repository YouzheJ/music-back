import * as React from 'react'
import fetchs from './scripts/fetchs'
import styled from 'styled-components'
import { Ul, Li, ButtonFull, StyleLink } from './styled'

import BS from './config/BASESTYLE'

// import logo from './logo.svg'
import './styles/App.css'

// const AppBox = ({className, children}) => (<div className={className}>{children}</div>);

const StyleApp = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  // justify-content: center;
  align-items: center;
  background: ${BS.bg2};
  height: 50px;
  padding: 0 30px;
  width: 100%;
`

const StyleBody = styled.div`
  display: flex;
  width: 100%;
`

const Bottom = styled.div`
  display: flex;
  width: 100%;
  align-self: flex-end;
  justify-content: center;
  margin-bottom: 50px;
  cursor: pointer;
`

interface Props {

}

interface State {
  list: object[];
}

interface Item {
  name: string;
}

class List extends React.Component<Props, State> {
  public state: State;
  constructor(props: Props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentWillMount() {
    fetchs({url: `/music/list`}).then((res) => {
      console.log(res)
      if(res) {
        this.setState({list: res.data});
      }
    });
  }
  render() {
    const { list } = this.state;
    return (
      <StyleApp>
        <Header>
          列表页
        </Header>
        <StyleBody>
          <p>home page</p>
          <Ul>
          {
            list.map((item: Item, index) => (<Li key={index}>{index + 1}. {item.name}</Li>))
          }
          </Ul>
        </StyleBody>
        <Bottom>
          <ButtonFull>
            <StyleLink to="/add">添加</StyleLink>
          </ButtonFull>
        </Bottom>
      </StyleApp>
    );
  }
}

export default List;
