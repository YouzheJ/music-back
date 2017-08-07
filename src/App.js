import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, StyleLink } from './styled'
import BS from './config/BASESTYLE'
import Header from './Header'

// import logo from './logo.svg';
import './styles/App.css'

const StyleApp = styled.div`
  overflow: hidden;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &: before {
    content: '';
    display: table;
  }
`

const Mask = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${BS.mask};
  z-index: 100;
`

const Center_box = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Center = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 200px;
`

const Title = styled.div`
  color:#333;
  font-size: 52px;
  width: 100%;
  text-shadow: 0 0 5px rgba(0,0,0,0.3);
`

const Button_group = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Button_r = Button.extend`
  background: ${BS.blue_d};
  z-index: 1000;
  margin-left: 50px;
  transition: background 0.2s linear;

  &: hover {
    background: ${BS.blue_d_hover};
  }
`

const Button_l = Button.extend`
  background: ${BS.green_d};
  z-index: 1000;
  transition: background 0.2s linear;

  &: hover {
    background: ${BS.green_d_hover};
  }
`

class App extends Component {
  componentDidMount() {
    // 代码来自 https://zhuanlan.zhihu.com/p/28257724
    document.addEventListener('touchmove', function (e) {
        e.preventDefault()
    })
    var c = document.getElementById('tri-curve'),
        x = c.getContext('2d'),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 90,
        q,
        m = Math,
        r = 0,
        u = m.PI*2,
        v = m.cos,
        z = m.random
    c.width = w*pr
    c.height = h*pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i(){
        x.clearRect(0,0,w,h)
        q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
        while(q[1].x<w+f) d(q[0], q[1])
    }
    function d(i,j){   
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z()*2-0.25)*f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r-=u/-50
        x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = {x:k,y:n}
    }
    function y(p){
        var t = p + (z()*2-1.1)*f
        return (t>h||t<0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }
  render() {
    return (
      <StyleApp className="App">
        <canvas id="tri-curve"></canvas>
        <Content>
          <Mask></Mask>
          <Header title={true} home={true}></Header>
          <Center_box>
            <Center>
              <Title>YOUZHE &nbsp;&nbsp; MUSIC</Title>
              <Button_group>
                <Button_l><StyleLink to={'/list'}>列表</StyleLink></Button_l>
                <Button_r><StyleLink to={'/add'}>添加</StyleLink></Button_r>
              </Button_group>
            </Center>
          </Center_box>
        </Content>
      </StyleApp>
    );
  }
}

export default App;
