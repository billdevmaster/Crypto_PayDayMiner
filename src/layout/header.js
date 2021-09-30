import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Web3 from 'web3';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  Container,
  Button,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { HeaderStyle } from './style';
import LogoImage from '../assets/images/logo.png';

const {ethereum} = window;
const web3 = new Web3(ethereum);

const Header = () => {
  const dispatch = useDispatch();
  const {userAddress} = useSelector((state) => {
    return {
      userAddress: state.userAddress
    }
  })

  const [isOpen, setIsOpen] = useState(false);
  const [showAddress, setShowAddress] = useState("connect")
  
  const toggle = () => setIsOpen(!isOpen);
  const connectWallet = async () => { 
    await ethereum.request({method: 'eth_requestAccounts'});
    const defaultAccounts = await web3.eth.getAccounts();
    dispatch({ type: "set", userAddress:defaultAccounts[0] });
  }

  useEffect(() => {
    if (userAddress !== '') {
      setShowAddress(userAddress.substr(0, 4) + "..." + userAddress.substr(userAddress.length - 3))
    }
  }, [userAddress]);

  return (
    <HeaderStyle>
      <Container className="text-center">
        <Navbar light expand="md">
          <NavbarBrand>
            <NavLink to="/"><img src={LogoImage} /></NavLink> 
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/hire-staff/">Hire Staff</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/become-ceo/">Become CEO</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/how-to-fire/">How to hire</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={`/payday-merch/`}>Payday Merch</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Button onClick={connectWallet} className="btn-connect">
          <FontAwesomeIcon icon={faWallet} />
          <span>
            {showAddress!==''?showAddress:`CONNECT WALLET`}
          </span>
        </Button>
      </Container>
    </HeaderStyle>
  );
}

export default Header;