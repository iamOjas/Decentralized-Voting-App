// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Voting{
  struct candidate{
    uint id;
    string name;
    uint voteCount;
  }

  mapping(uint => candidate) public candidates;
  mapping(address => uint) public noOfVotes;

  uint public candidateCount;

  event Candidateadded(uint id,string name, uint voteCount);
  event VoteAdded(uint id, uint voteCount);

  function _addCandidates(string memory _name) private{
    candidateCount++;
    candidates[candidateCount] = candidate(candidateCount, _name,0);
    emit Candidateadded(candidateCount, _name,0);
  }

  // function election() public{
  // }

  constructor() public{
    _addCandidates("Ojas");
    _addCandidates("Anshu");
  }

  function addVote(uint _id) public {
    require(noOfVotes[msg.sender] < 1,"Cannot Vote more than once");
    candidate memory _candidate = candidates[_id];
    _candidate.voteCount++;
    candidates[_id] = _candidate;
    emit VoteAdded(_id, _candidate.voteCount);
    noOfVotes[msg.sender]++;
  }

}
