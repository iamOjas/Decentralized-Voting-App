import React, {
  useEffect,
  useState
} from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

var App = () => {
  const [candidateCount, setCandidateCount] = useState(0);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [Contract, setContract] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  // const [toggle,updateToggle] = useState(true);

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const instance = new web3.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // this.setState({ web3, accounts, contract: instance }, this.runExample);
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, [])

  useEffect(() => {
    const init = async() => {

        // Get the value from the contract to prove it worked.
        const count = await Contract.methods.candidateCount().call();

        // Update state with the result.

        setCandidateCount(count)


        for(let i=1;i<=count;i++)
        {
          let temp = await Contract.methods.candidates(i).call();
          setCandidates(arr => {return [...arr,temp]});
        }
        
      }
      if (typeof web3 !== 'undefined' && typeof accounts !== 'undefined' && typeof Contract !== 'undefined') {
      init();
    }

  }, [web3, accounts, Contract])

  if(typeof web3 === 'undefined'){
    return <div> Loading Web3, accounts, and contract... </div>;
  }

  // async function handleSubmit(event){
  //   event.preventDefault();

  //   await Contract.methods.set(value).send({
  //     from: accounts[0]
  //   });

  //   // Get the value from the contract to prove it worked.
  //   const count = await Contract.methods.get().call();

  //   // Update state with the result.

  //   setStorageValue(count)
  // }
  
  async function handleButton(id){
    try {
      await Contract.methods.addVote(id).send({from: accounts[0]});
      window.location.reload(false);
    } catch (err) {
      alert("Cannot vote more than once");
      console.log(err.message)
    }
  }

  return(
    <div className="App" >
    <h1> Total number of candidates : {candidateCount} </h1>
    <ul>{candidates.map((arr,key) =><li key = {key}> {arr.name}    {arr.voteCount}     <button onClick={()=>{handleButton(arr.id)}}>Vote</button></li>)}</ul>
    <span>Your Account : {accounts}</span>
  </div>
  )

}

export default App;