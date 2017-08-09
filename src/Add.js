import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, StyleLink, Input, Icon } from './styled'
import BS from './config/BASESTYLE'
import Header from './Header'
import Footer from './Footer'

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
  background: ${BS.bg1};
  overflow: hidden;
  overflow-y: auto;
`

const Title = styled.div`
  padding: 20px 30px;
  font-size: 20px;
  color: ${BS.gray};
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-around;
  background: #F9F9F9;
  min-height: 200px;
  padding: 10px 30px;
  margin: 0 auto 20px;
  width: 80%;
  max-width: 1100px;

  @media screen and (max-width: 800px) {
    max-width: 500px;
  justify-content: space-around;
  }
  @media screen and (max-width: 1000px) {
    max-width: 600px;
  justify-content: space-around;
  }
  @media screen and (max-width: 1200px) {
      max-width: 700px;
  }
  @media screen and (min-width: 1800px) {
      min-width: 80%;
  }
`

const ContentBox = styled.div`
  flex: 1;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 10px;
  min-width: 250px;
`

const Item = styled.div`
  padding: 10px 20px;
`

const SubTitle = styled.div`
  font-size: 18px;
  color: ${BS.orange_d};
  border-bottom: 1px solid #f80;
  padding: 10px 0;
  margin: 0 20px 10px;
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
  background: #fefefe;
`

const AddButton = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid ${BS.border_s};
  border-radius: 50%;
  color: ${BS.gray_s};
  cursor: pointer;
  transition: all 1s ease;

  &: hover {
    transform: rotate(360deg) scale(1.2, 1.2);
    color: ${BS.blue_d_hover};
    border-color: #fff;
    box-shadow: 0 0 5px ${BS.shadow};
  }
`

const MoreButton = AddButton.extend``

const UploadButton = AddButton.extend`
  display: block;
  margin: 30px auto;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 0;
  transition: all 1s ease;
  border-radius: 2px;
  border-color: ${BS.border_s};
  transform: scale(2, 2);

  &: hover {
    transform:scale(2, 2);
    border-color: #fff;
    box-shadow: 4px 6px 10px ${BS.shadow};
  }
`

const UploadButton_s = UploadButton.extend`
  margin: -10px auto 10px;
  transform: scale(1.5, 1.5);

  &: hover {
    transform:scale(1.5, 1.5);
  }
`

const Button_s = Button.extend`
  color: #fff;
  background: ${BS.blue_d};

  &: hover {
    background: ${BS.blue_d_hover};
  }
`

const Button_c = Button.extend``

const ButtonGroup = Item.extend`
  display: flex;
  justify-content: space-around;
`

const Bottom = styled.div`
  margin: 20px 0;
  background: #f9f9f9;
  border-top: 1px solid ${BS.blue_s};
  padding-top: 10px;
`

const ButtonGroup_bottom = ButtonGroup.extend`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  align-self: flex-end;
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
      type: 'add',
      show: { // 部分颜色的显示隐藏
        images: false,
        sources: false,
        detail: false,
      },
    }
  }
  render() {
    const { type } = this.state;
    return (
      <StyleAdd>
        <Header add={true}></Header>
        <Body>
          <Title>{type == 'add' ? 'ADD' : 'EDIT'} MUSIC</Title>
          <ContentBox>
            <Content>
              <Block>
                <SubTitle>BASE INFO</SubTitle>
                <Item>
                  <Span>NAME: </Span>
                  <StyleInput/>
                </Item>
                <Item>
                  <Span>ALIAS: </Span>
                  <AddButton>
                    <Icon name='icon-add'></Icon>
                  </AddButton>
                  {/* <StyleInput/> */}
                </Item>
                <Item>
                  <Span>PUBLISH: </Span>
                  <StyleInput/>
                </Item>
                <Item>
                  <Span>IMAGES: </Span>
                  <MoreButton>
                    <Icon name='icon-more'></Icon>
                  </MoreButton>
                  {/* <StyleInput/> */}
                </Item>
                <Item>
                  <Span>SOURCE: </Span>
                  <MoreButton>
                    <Icon name='icon-more'></Icon>
                  </MoreButton>
                  {/* <StyleInput/> */}
                </Item>
              </Block>
              <Block>
                <SubTitle>IMAGES</SubTitle>
                <Item>
                  <Span>COVER L: </Span>
                  <UploadButton>
                    <Icon name='icon-upload'></Icon>
                  </UploadButton>
                  {/* <StyleInput/> */}
                </Item>
                <Item>
                  <Span>COVER S: </Span>
                  <UploadButton>
                    <Icon name='icon-upload'></Icon>
                  </UploadButton>  
                  {/* <StyleInput/> */}
                </Item>
              </Block>
              <Block>
                <SubTitle>SOURCE</SubTitle>
                <Item>
                  <Span>QUALITY: </Span>
                  <AddButton>
                    <Icon name='icon-add'></Icon>
                  </AddButton>
                  {/* <StyleInput/> */}
                </Item>
              </Block>
              <Block>
                <SubTitle>DETAILS</SubTitle>
                <Item>
                  <Span>SOURCE: </Span>
                  <StyleInput/>
                </Item>
                <Item>
                  <Span>LINK: </Span>
                  <UploadButton_s>
                    <Icon name='icon-upload'></Icon>
                  </UploadButton_s>
                  {/* <StyleInput/> */}
                </Item>
                <Item>
                  <Span>QUALITY: </Span>
                  <StyleInput/>
                </Item>
                <Item>
                  <Span>SIZE: </Span>
                  <StyleInput/> 
                </Item>
                <Item>
                  <Span>VERSION: </Span>
                  <StyleInput/> 
                </Item>
                <Item>
                  <ButtonGroup>
                    <Button_s>ADD</Button_s>
                    <Button_c>CANCEL</Button_c>
                  </ButtonGroup>
                </Item>
              </Block>
            </Content>
          </ContentBox>
          <Bottom>
            <ButtonGroup_bottom>
              <Button_s>ADD</Button_s>
              <Button_c>CANCEL</Button_c>
            </ButtonGroup_bottom> 
          </Bottom>
        </Body>
        <Footer></Footer>
      </StyleAdd>
    );
  }
}

Add.PropTypes = {
  show: PropTypes.object,
}

export default Add;
