import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

import { FooterStyle } from './style';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaDiscord, FaTelegram, FaYoutube } from "react-icons/fa";
import LogoImage from '../assets/images/logo.png';

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
                  <a href=''>
                    <FaFacebookF/>
                  </a>
                </li>
                <li>
                  <a href=''>
                    <FaTwitter/>
                  </a>
                </li>
                <li>
                  <a href=''>
                    <FaLinkedinIn/>
                  </a>
                </li>
                <li>
                  <a href=''>
                    <FaDiscord/>
                  </a>
                </li>
                <li>
                  <a href=''>
                    <FaTelegram/>
                  </a>
                </li>
                <li>
                  <a href=''>
                    <FaYoutube/>
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