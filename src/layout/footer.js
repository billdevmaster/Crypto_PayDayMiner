import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

import { FooterStyle } from './style';
import { FaFacebookF, FaTwitter, FaTelegram } from "react-icons/fa";
import LogoImage from '../assets/images/logo.png';
import BSCIcon from '../assets/images/bsc-icon.png';

const Footer = () => {
  return (
    <FooterStyle>
      <footer className="border-t"> 
        <Container>
          <Row>
            <Col md="2" sm="12">
              <img src={LogoImage}  className="footer-logo"/>
            </Col>
            <Col md="2" sm="12"></Col>
            <Col className="md-8 sm-12">
              <ul className="social-link">
                <li>
                  <a href='https://bscscan.com/address/0x4e794B6955c2987Af20902943A4B2507eA4F1dC1' target="_blink">
                    <img src={BSCIcon}/>
                  </a>
                </li>
                <li>
                  <a href='https://www.facebook.com/paydofficial' target="_blink">
                    <FaFacebookF/>
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/paydofficial' target="_blink">
                    <FaTwitter/>
                  </a>
                </li>
                <li>
                  <a href='https://t.me/paydofficial' target="_blink">
                    <FaTelegram/>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div>
          <Container style={{ paddingTop: 0 }}>
            <p className="risk">
              High Risk Investment Notice<br />
              The content shared on this website is for informational purposes only and should not be considered financial advice. Always seek professional advice before making any investment. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other content on this website before making any decisions based on such information or other content.
            </p>
          </Container>
        </div>
        <div className="border-t meta">
          <Container>
            <p>© All rights reserved</p>
            <p className="text-right">Made with ❤ in Oz</p>
          </Container>
        </div>
      </footer>
    </FooterStyle>
  );
}

export default Footer;