import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, StyleLink, Input } from './styled'
import BS from './config/BASESTYLE'
import Header from './Header'

// import logo from './logo.svg'
import './styles/App.css'

const StyleAdd = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${BS.bg4};
`

const Title = styled.div`
  padding: 20px 30px;
  font-size: 20px;
  color: ${BS.gray};
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  background: #fefefe;
  min-height: 500px;
  padding: 10px 0;
  margin: 0 50px;
`

const Item = styled.div`
  padding: 10px 20px;
`

const Span = styled.span`
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: ${BS.blue_d_hover}
`

const StyleInput = styled(Input)`
  width: 250px;
`

/*{
  name: String,
  alias: [String],
  publish: Date,
  create_date: { type: Date, default: Date.now },
  images: {
    coverSmall: String,
    coverBig: String,
  },
  source: [{
    source: String,
    link: String,
    quality: String,
    size: String,
    version: String,
    create_date: { type: Date, default: Date.now }
  }]
}*/

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'add'
    }
  }
  render() {
    const { type } = this.state;
    return (
      <StyleAdd>
        <Header add={true}></Header>
        <Body>
          <Title>{type == 'add' ? 'ADD' : 'EDIT'} MUSIC</Title>
          <Content>
            <Item>
              <Span>NAME: </Span>
              <StyleInput/>
            </Item>
            <Item>
              <Span>NAME: </Span>
              <StyleInput/>
            </Item>
            <Item>
              <Span>NAME: </Span>
              <StyleInput/>
            </Item>
            <Item>
              <Span>NAME: </Span>
              <StyleInput/>
            </Item>
            <Item>
              <Span>NAME: </Span>
              <StyleInput/>
            </Item>
          </Content>
        </Body>
      </StyleAdd>
    );
  }
}

export default Add;
