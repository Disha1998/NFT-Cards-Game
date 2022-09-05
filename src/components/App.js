
// import React, { Component, useEffect, useState } from 'react';
// import Web3 from 'web3'
// import './App.css';
// import MemoryToken from '../abis/MemoryToken.json'
// import brain from '../brain.png'
// // import blank from '../components/images/blank.png'
// const CARD_ARRAY = [
//   {
//     name: 'fries',
//     img: 'images/fries.png'
//   },
//   {
//     name: 'cheeseburger',
//     img: '/images/cheeseburger.png'
//   },
//   {
//     name: 'ice-cream',
//     img: '/images/ice-cream.png'
//   },
//   {
//     name: 'pizza',
//     img: ' /images/pizza.png'
//   },
//   {
//     name: 'milkshake',
//     img: ' /images/milkshake.png'
//   },
//   {
//     name: 'hotdog',
//     img: ' /images/hotdog.png'
//   },
//   {
//     name: 'fries',
//     img: '/images/fries.png'
//   },
//   {
//     name: 'cheeseburger',
//     img: '/images/cheeseburger.png'
//   },
//   {
//     name: 'ice-cream',
//     img: ' /images/ice-cream.png'
//   },
//   {
//     name: 'pizza',
//     img: ' /images/pizza.png'
//   },
//   {
//     name: 'milkshake',
//     img: ' /images/milkshake.png'
//   },
//   {
//     name: 'hotdog',
//     img: ' /images/hotdog.png'
//   }
// ]
// function App() {
//   const [account, setAccount] = useState('0x0')
//   const [token, setToken] = useState(null)
//   const [alreadyChosen,setAlreadyChosen] = useState([])
//   const [totalSupply, setTotalSupply] = useState(0)
//   const [TokenURI, setTokenURI] = useState([]);
//   const [cardArray, setcardArray] = useState([]);
//   const [cardsChosen, setCardsChosen] = useState([]);
//   const [cardsChosenId, setCardsChosenId] = useState([]);
//   const [cardsWon, setCardsWon] = useState([]);
//   useEffect(() => {
//     loadWeb3();
//     loadBlockchainData();
//     setcardArray(CARD_ARRAY.sort(() => 0.5 - Math.random()));
//   }, []);
//   useEffect(()=>{
//     if (alreadyChosen == 1) {
//           setTimeout(checkForMatch, 100)
//         }
//   },[alreadyChosen])
//   async function loadWeb3() {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum);
//       await window.ethereum.enable();
//     } else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider)
//     } else {
//       window.alert('You should consider trying Metamask..!')
//     }
//   }
//   async function loadBlockchainData() {
//     const web3 = window.web3
//     const accounts = await web3.eth.getAccounts();
//     // console.log('Accounts--->', accounts[0]);
//     setAccount(accounts);
//     // Getting network Id
//     const networkId = await web3.eth.net.getId()
//     // console.log(networkId);
//     // Getting network data
//     const networkData = MemoryToken.networks[networkId]
//     // console.log(networkData);
//     if (networkData) {
//       // Getting abi & smart contract address
//       const abi = MemoryToken.abi;
//       const smartContractAddress = networkData.address;
//       // console.log(smartContractAddress);
//       // Creating new contract instance with all it's method and events define in json object.
//       const token = new web3.eth.Contract(abi, smartContractAddress)
//       // console.log(token);
//       setToken(token)
//       // Total supply
//       const totalSupply = await token.methods.totalSupply().call();
//       // console.log('totalSupply',totalSupply);
//       setTotalSupply(totalSupply);
//       // Load Tokens
//       let balanceOf = await token.methods.balanceOf(accounts[0]).call()
//       for (let i = 0; i < balanceOf; i++) {
//         let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
//         let tokenURI = await token.methods.tokenURI(id).call()
//         setTokenURI(...TokenURI, tokenURI)
//       }
//     } else {
//       alert('Smart contract is not deployed to detected network.')
//     }
//   }
//   const chooseImage =   (cardId) => {
//     cardId = cardId.toString();
//     if (cardsWon.includes(cardId)) {
//       return  window.location.origin + `/images/white.png`;
//     }
//     else if (cardsChosenId.includes(cardId)) {
//       return  CARD_ARRAY[cardId].img
//     } else {
//       return   window.location.origin + `/images/blank.png`;
//     }
//   }
//   const flipCard = async (cardId) => {
//     console.log(cardId);
//     console.log(cardArray);
//    setAlreadyChosen(cardsChosen.length)
//     console.log(alreadyChosen);
// let cardChosed = [...cardsChosen]
// cardChosed.push(cardArray[cardId].name)
//     setCardsChosen(cardChosed);
//     let chosedID = [...cardsChosenId]
//     chosedID.push(cardId)
//  setCardsChosenId(chosedID)
//   }
//   console.log(cardsChosen,'cards chosen--');
//   console.log(cardsChosenId.length);
//   console.log(cardsChosenId,'cards chosen id ---');
//  async function checkForMatch ()  {
//     console.log(cardsChosenId, 'idss in check--');
//     const optionOneId = cardsChosenId[0]
//     console.log(optionOneId,'optionOneId  1');
//     const optionTwoId = cardsChosenId[1]
//     console.log(optionTwoId,'optiontwoId  2');
//     if(optionOneId == optionTwoId){
//       alert("you have click on same img.")
//     }else if(cardsChosen[0] === cardsChosen[1]){
//       alert("you found match")
//       setCardsWon([...cardsWon,optionOneId,optionTwoId])
//     }else{
//       alert("sorry try again")
//     }
//     setCardsChosen([])
//     setCardsChosenId([])
//     if(cardsWon.length === cardArray.length){
//       alert("congratulation you found them all")
//     } 
//   }
//   return (
//     <div>
//       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//         <a
//           className="navbar-brand col-sm-3 col-md-2 mr-0"
//           href="http://www.dappuniversity.com/bootcamp"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={brain} width="30" height="30" className="d-inline-block align-top" alt="" />
//           &nbsp; Memory Tokens
//         </a>
//         <ul className="navbar-nav px-3">
//           <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//             <small className="text-muted"><span id="account">{account}</span></small>
//           </li>
//         </ul>
//       </nav>
//       <div className="container-fluid mt-5">
//         <div className="row">
//           <main role="main" className="col-lg-12 d-flex text-center">
//             <div className="content mr-auto ml-auto">
//               <h1 className="d-4">Edit this file in App.js!</h1>
//               <div className="grid mb-4" >
//                 {cardArray.map((card, key) => {
//                   return (
//                     <img
//                       key={key}
//                       src={chooseImage(key)}
//                       data-id={key}
//                       onClick={(event) => {
//                         let cardId = event.target.getAttribute('data-id')
//                         console.log(cardId);
//                         if (!cardsWon.includes(cardId.toString())) {
//                           console.log('flipping');
//                           flipCard(cardId);
//                         }
//                       }}
//                     >
//                     </img>
//                   )
//                 })}
//               </div>
//               <div>
//                 {/* Code goes here... */}
//                 <div className="grid mb-4" >
//                   {/* Code goes here... */}
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div >
//   );
// }
// export default App;








import React, { Component, useEffect, useState } from 'react';
import Web3 from 'web3'
import './App.css';
import MemoryToken from '../abis/MemoryToken.json'
import brain from '../brain.png'
// import { fries } from '/images/fries.png'

const CARD_ARRAY = [
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  },
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  }
]

function App() {

  const [account, setAccount] = useState('0x0')
  const [token, settoken] = useState(null)
  const [totalSupply, settotalSupply] = useState(0)
  const [TokenURIs, setTokenURIs] = useState([])
  const [cardArray, setcardArray] = useState([])
  const [cardsChosen, setcardsChosen] = useState([])
  const [cardsChosenId, setcardsChosenId] = useState([])
  const [cardsWon, setcardsWon] = useState([])
  const [alreadyChosen, setAlreadyChosen] = useState(0);



  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    // EventcardArray()
    setcardArray(CARD_ARRAY.sort(() => 0.5 - Math.random()))

  }, []);


  useEffect(() => {
    if (alreadyChosen === 1) {

      setTimeout(checkForMatch, 100)

    }
  }, [alreadyChosen])


  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('You should consider trying Metamask..!')
    }
  }


  //  to check that web3 js is connected with the frontend or not------
  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts--->', accounts[0]);
    setAccount(accounts[0]);


    //Load smart contract  [Fethch the okenSmartcontract]------------ 
    const networkId = await web3.eth.net.getId()

    const networkData = MemoryToken.networks[networkId]
    if (networkData) {
      const abi = MemoryToken.abi
      const Contractaddress = networkData.address

      // token
      const token = new web3.eth.Contract(abi, Contractaddress)
      settoken(token)

      // totalSupply
      const totalSupply = await token.methods.totalSupply().call()
      settotalSupply(totalSupply)


      // Load Tokens balanceOf
      let nfts= [];
      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()
        console.log(tokenURI)
        nfts.push(tokenURI);
       
      }
      setTokenURIs(nfts)
    } else {
      alert('Smart contract not Deployed on etected network')
    }
    console.log('totalSupply---', totalSupply);
  }

  // Choose Image -------------------------

  const chooseImage = (cardId) => {
    cardId = cardId.toString()
    if (cardsWon.includes(cardId)) {
      return window.location.origin + `/images/white.png`
    } else if (cardsChosenId.includes(cardId)) {
      return CARD_ARRAY[cardId].img
    } else {
      return window.location.origin + `/images/blank.png`

    }

  }



  // flipCard

  const flipCard = async (cardId) => {

    setAlreadyChosen(cardsChosen.length);
    let cardChoosed = [...cardsChosen];
    cardChoosed.push(cardArray[cardId].name)
    setcardsChosen(cardChoosed);
    // console.log(cardsChosen);
    let cardChosedIds = [...cardsChosenId];
    cardChosedIds.push(cardId);
    setcardsChosenId(cardChosedIds)

  }


  // chekForMatch----------


  async function checkForMatch() {
    console.log('cardsChosenId---', cardsChosenId);
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    console.log('optionOneId----', optionOneId);
    console.log('optionTwoId----', optionTwoId);

    if (optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')

      // for mint an images
      token.methods.mint(
        account,
        window.location.origin + CARD_ARRAY[optionOneId].img.toString()
      ).send({ from: account })
        .on('transaction hash', (hash) => {
          alert('onnn minted')
          setcardsWon([...cardsWon, optionOneId, optionTwoId]);
          setTokenURIs([...TokenURIs, CARD_ARRAY[optionOneId].img])
        })
    }
    else {
      alert('Sorry, try again')
    }

    setcardsChosen([])
    setcardsChosenId([])

    if (cardsWon.length === CARD_ARRAY.length) {
      alert('Congratulations! You found them all!')
    }
  }




  return (
    <div>

      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={brain} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Memory Tokens
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-muted"><span id="account">{account}</span></small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1 className="d-4">Start Matching Now..!</h1>
              {/* <image src={fries} alt="fries"></image> */}

              <div className="grid mb-4" >

                {
                  cardArray.map((card, key) => {
                    return (
                      <img
                        key={key}
                        src={chooseImage(key)}
                        data-id={key}
                        onClick={(event) => {
                          let cardId = event.target.getAttribute('data-id')
                          if (!cardsWon.includes(cardId.toString())) {
                            flipCard(cardId);
                            console.log();
                          }
                        }}
                      >

                      </img>)
                  })
                }

              </div>

              <div>

                <h5>Tokens Collected : <span id='result'>&nbsp;{TokenURIs.length}</span></h5>
                <div className="grid mb-4" >

                  {
                    TokenURIs.length > 0 && TokenURIs.map((tokenURI, key) => {
                      return (
                        <img
                          key={key}
                          src={tokenURI}
                        >
                        </img>
                      )
                    })
                  }
                </div>

              </div>

            </div>

          </main>
        </div>
      </div>
    </div >
  );
}



export default App;
