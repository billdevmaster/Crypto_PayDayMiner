import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';
import { Button, Container, Row, Col, Input, Card, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { faWallet, faBolt, faUserPlus, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

import { HireStyle } from '../../style'
import { minersAddr, minersAbi } from '../../constants/contract';
import { secondsToString, parseIntDecimal } from '../../utility';
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
  const [processingBuy, setProcessingBuy] = useState(false);
  const [processingCompound, setProcessingCompound] = useState(false);
  const [processingWithdraw, setProcessingWithdraw] = useState(false);
  const timer = () => {
    if (userAddress !== '') {
           
      // get contract balance
      web3.eth.getBalance(minersAddr).then(result => {
          setContractBalance(parseIntDecimal(web3.utils.fromWei(result), 3));
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
  }
  
  useEffect(async () => {
    const defaultAccounts = await web3.eth.getAccounts();
    if (defaultAccounts.length > 0) {
      dispatch({ type: "set", userAddress:defaultAccounts[0] });
      const queryParams = new URLSearchParams(window.location.search);
      const ref = queryParams.get("ref") === null ? defaultAccounts[0] : queryParams.get("ref");
      setRef(ref)
    }
    clearInterval(timer);
    setInterval(timer, 2000);
  }, [userAddress]);

  // get mined val
  useEffect(async () => {
    // get mined val
    if (diggingVal > 0) {
      minerContract.methods.calculateGoldsSell(diggingVal).call().then( async result => {
        const devFee = await minerContract.methods.devFee(result).call();
        const ownerFee = await minerContract.methods.ownerFee(result).call();
        const value = web3.utils.fromWei(result) - web3.utils.fromWei(devFee) -  - web3.utils.fromWei(ownerFee);
        setMinedVal(parseIntDecimal(value, 5))
      }).catch((err) => {
          console.log(err)
      });
    }
  }, [diggingVal]);

  useEffect(async () => {
    const remainHour = eggstohatch1 - diggingVal / myMiner;
    setFilltime(secondsToString(remainHour));
  }, [myMiner, diggingVal])

  const handleInput = (e) => {
    setEnterBnb(e.target.value)
    
  }

  const buy = async () => {
    setProcessingBuy(true);
    if (userAddress !== '') {
      if (isNaN(enterBnb) || enterBnb === '' || enterBnb === 0) {
        setProcessingBuy(false);
        toast.warning("please input field")
        return;
      }
      minerContract.methods
      .rent(ref).send({from: userAddress, value: web3.utils.toWei(enterBnb)})
      .then( res => {
        setProcessingBuy(false);
        toast.success("Successfully Done.")
      })
      .catch( err => {
        setProcessingBuy(false);
        toast.error("something is wrong.")
        console.log(err);
      })
    } else {
      setProcessingBuy(false);
      toast.warning("please connect the metamask.")
    }
  }

  const withdraw = async() => {
    console.log(ref);
    setProcessingWithdraw(true)
    if (userAddress !== '') {
      minerContract.methods
      .withdraw().send({from: userAddress})
      .then( res => {
        setProcessingWithdraw(false)
        toast.success("Successfully Done.")
      })
      .catch( err => {
        console.log(err);
        setProcessingWithdraw(false)
        toast.error("something is wrong.")
      })
    } else {
      setProcessingWithdraw(false)
      toast.warning("please connect wallet")
    }
  }

  const compound = async () => {
    setProcessingCompound(true)
    if (userAddress !== '') {
      minerContract.methods
      .compound(ref).send({from: userAddress})
      .then( res => {
        setProcessingCompound(false)
        toast.success("Successfully Done.")
      })
      .catch( err => {
        setProcessingCompound(false)
        toast.error("something is wrong.")
        console.log(err);
      }) 
    } else {
      setProcessingCompound(false)
      toast.warning("please connect wallet")
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

  const copyAddress = () => {
    console.log("okay");
    toast.success("Successfully copyed")
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
                <p><span className="text-bold">Minted</span> {minedVal} <span className="text-bold">BNB</span></p>
                <p><span className="text-bold">Contract Balance</span> {contractBalance} <span className="text-bold">BNB</span></p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Card className="bg-red text-white text-center">
                <p className="text-bold">{filltime} Until Briefcase is Full</p>
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
                  <Button className="btn btn-primary full" onClick={buy}>
                    {
                    processingBuy ? <Spinner size="sm" color="dark"/> : <><FontAwesomeIcon icon={faUserPlus} /> Hires Staff</>
                    }
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ padding: '15px 0' }}>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Button className="btn btn-primary full" onClick={compound}>
              {processingCompound ? <Spinner size="sm" color="dark"/> : <><FontAwesomeIcon icon={faBolt} /> COMPOUND</>}
              </Button>
            </Col>
          </Row>
          <Row style={{ padding: '15px 0' }}>
            <Col md="4" sm="12"></Col>
            <Col md="4" sm="12">
              <Button className="btn btn-primary full" onClick={withdraw}>
              {processingWithdraw ? <Spinner size="sm" color="dark"/> : <><FontAwesomeIcon icon={faWallet} /> BANK BNB</>}
              </Button>
            </Col>
          </Row>
          {userAddress !== '' ? 
            <Row>
              <Col md="4" sm="12"></Col>
              <Col md="4" sm="12">
                <Card className="bg-red text-white">
                  <p>Share your referral link</p>
                  <CopyToClipboard text={`https://paydofficial.com?ref=${userAddress}`} onCopy={copyAddress}>
                    {/* <>
                      <p>Share your referral link<a style={{ float: 'right', cursor: 'pointer' }}><FontAwesomeIcon icon={faClipboardCheck} /></a></p> */}
                      <a style={{ fontSize: 16, textDecoration: 'underline', cursor: 'pointer' }}>https://paydofficial.com?ref={userAddress}</a>
                    {/* </> */}
                  </CopyToClipboard>
                </Card>
              </Col>
            </Row>
          : ''}
        </Container>
      </div>
    </HireStyle>
  );
}

export default Hire;
