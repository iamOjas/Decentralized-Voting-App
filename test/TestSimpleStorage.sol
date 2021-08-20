pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voting.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {
    Voting voting = Voting(DeployedAddresses.Voting());

    uint expected = 0;

    Assert.equal(voting.candidateCount(), expected, "It should store the value 1.");
  }

}
