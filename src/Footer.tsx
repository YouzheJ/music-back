import * as React from 'react'
import styled from 'styled-components'
import {  } from './styled'
import BS from './config/BASESTYLE'

const StyleFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  color: ${BS.font_ss};
  background: ${BS.bg1};
  z-index: 1000;
  font-size: 14px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  a {
    color: ${BS.font_ss};
    transition: color .3s linear;
    &: hover {
      color: ${BS.font_s};
    }
  }
`

interface Props {

}

const Footer = (props: Props) => {
  return (
      <StyleFooter>YOUZHEJ [ <a href="https://github.com/YouzheJ/music-back" target="_blank"> https://github.com/YouzheJ/music-back </a> ]</StyleFooter>
    )
}

export default Footer;
