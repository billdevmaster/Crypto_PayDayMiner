import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';
import { Button, Container, Row, Col, Input, InputGroupAddon, InputGroup, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faBolt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import { HireStyle } from '../../style'
import { minersAddr, minersAbi } from '../../constants/contract';
import {secondsToString} from '../../utility';
import BG from '../../assets/images/hire-bg.jpg';

const eggstohatch1 = 2592000;
const {ethereum} = window;
let web3 = new Web3(ethereum);

const Hire = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector(state => state.userAddress);
  const minerContract = new web3.eth.Contract(
    minersAbi,
    minersAddr
  );

  const [enterBnb, setEnterBnb] = useState(0);
  const [ref, setRef] = useState("");
  const [diggingVal, setDiggingVal] = useState(0)
  const [minedVal, setMinedVal] = useState(0)
  const [contractBalance, setContractBalance] = useState(0);
  const [myBalance, setMyBalance] = useState(0);
  const [lastHatch, setLastHatch] = useState(0);
  const [filltime, setFilltime] = useState("");
  const [myMiner, setMyMiner] = useState(0);

  useEffect(async () => {
   
    const defaultAccounts = await web3.eth.getAccounts();
    if (defaultAccounts.length > 0) {
      dispatch({ type: "set", userAddress:defaultAccounts[0] });
      setRef(defaultAccounts[0])
    }
    // timer.clearInterval();
    const timer = setInterval(async () => {
      if (userAddress !== '') {
        // connect wallet
        // await ethereum.request({method: 'eth_requestAccounts'});
        // const _chainId = await getCurrentChainId();
        // let usreAccount = await getDefaultAddres();
        // const bnbBalance = await getBNBBalance();
        
        // get contract balance
        web3.eth.getBalance(minersAddr).then(result => {
            setContractBalance(web3.utils.fromWei(result));
        }).catch((err) => {
            console.log(err)
        });
    
        // get my balance
        web3.eth.getBalance(userAddress).then(result => {
            setMyBalance(web3.utils.fromWei(result));
        }).catch((err) => {
            console.log(err)
        });
      
        // get last hatch
        minerContract.methods.lastHatch(userAddress).call({from:userAddress}).then(result => {
            setLastHatch(result)
        }).catch((err) => {
            console.log(err)
        });
    
        // get my eggs
        minerContract.methods.getMyGolds().call({from:userAddress}).then(result => {
          setDiggingVal(result)
        }).catch((err) => {
            console.log(err)
        });
    
        // get my miners
        minerContract.methods.getMyMiners().call({from:userAddress}).then(result => {
            if (result == '0x') {
                result = 0;
            }
            setMyMiner(result)
        }).catch((err) => {
            console.log(err)
        });
      }
    }, 2000)

    // get my miner
    // minerContract.methods
    // .getMyMiners().send({from: userAddress})
    // .then( res => {
    //   console.log(res);
    // })
    // .catch( err => {
    //   console.log(err);
    // })
  }, [userAddress]);

  // get mined val
  useEffect(async () => {
    // get mined val
    if (diggingVal > 0) {
      minerContract.methods.calculateGoldsSell(diggingVal).call().then( async result => {
        const devFee = await minerContract.methods.devFee(result).call();
        const ownerFee = await minerContract.methods.ownerFee(result).call();
        setMinedVal(web3.utils.fromWei(result) - web3.utils.fromWei(devFee) -  - web3.utils.fromWei(ownerFee))
      }).catch((err) => {
          console.log(err)
      });
    }
  }, [diggingVal]);

  useEffect(async () => {
    const remainHour = eggstohatch1 - diggingVal / myMiner;
    console.log(remainHour);
    setFilltime(secondsToString(remainHour));
  }, [myMiner, diggingVal])

  const handleInput = (e) => {
    setEnterBnb(e.target.value)
  }

  const handleInputRef = (e) => {
    setRef(e.target.value)
  }

  const buy = async () => {
    if (userAddress !== 'unknown') {
      if (enterBnb === 0) {
        alert("please input field")
        return;
      }
      minerContract.methods
      .rent(ref).send({from: userAddress, value: web3.utils.toWei(enterBnb)})
      .then( res => {
        console.log(res);
        alert("success")
      })
      .catch( err => {
        console.log(err);
      })
    } else {
      alert("please connect wallet")
    }
  }

  const withdraw = async() => {
    if (userAddress !== 'unknown') {
      minerContract.methods
      .withdraw().send({from: userAddress})
      .then( res => {
        console.log(res);
        alert("success")
      })
      .catch( err => {
        console.log(err);
      })
    } else {
      alert("please connect wallet")
    }
  }

  const compound = async () => {
    if (userAddress !== 'unknown') {
      minerContract.methods
      .compound(ref).send({from: userAddress})
      .then( res => {
        console.log(res);
        alert("success")
      })
      .catch( err => {
        console.log(err);
      }) 
    } else {
      alert("please connect wallet")
    }
  }

  const test = async () => {
    const minerContract = new web3.eth.Contract(
      minersAbi,
      minersAddr
    );

    minerContract.methods
    .calculateGoldBuy(web3.utils.toWei(0.1), web3.utils.toWei(0.2)).call({from:userAddress})
    .then( res => {
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    }) 
  }

  return (
    <HireStyle>
      <div style={{ backgroundImage: `url(${BG})` }}>
        <Container>
          <Row>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Card className="bg-red text-white">
                <p className="text-bold">You Have </p>
                <p>{myMiner} <span className="text-bold">STAFF</span></p>
                <p><span className="text-bold">Mined</span> {minedVal} <span className="text-bold">BNB</span></p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Card className="bg-red text-white text-center">
                <p className="text-bold">{filltime} Until Barrel is Full</p>
              </Card>
            </Col>
          </Row>
          <Row style={{ padding: '15px 0' }}>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Row className="buy">
                <Col md="4" sm="12">
                  <Input value={enterBnb} onChange={handleInput} placeholder="Hire Staff"/>
                </Col>
                <Col md="3" sm="12"></Col>
                <Col md="5" sm="12" style={{ textAlign: "right" }}>
                  <Button className="btn btn-primary full" onClick={buy}><FontAwesomeIcon icon={faUserPlus} /> Hires Staff</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ padding: '15px 0' }}>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Button className="btn btn-primary full" onClick={compound}><FontAwesomeIcon icon={faBolt} /> COMPOUND</Button>
            </Col>
          </Row>
          <Row style={{ padding: '15px 0' }}>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Button className="btn btn-primary full" onClick={withdraw}><FontAwesomeIcon icon={faWallet} /> BANK BNB</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </HireStyle>
  );
}

export default Hire;
