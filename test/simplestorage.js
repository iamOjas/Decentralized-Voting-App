const Voting = artifacts.require("./Voting.sol");

contract("Voting", accounts => {
  it("...should store the value '2'", async () => {
    const VotingInstance = await Voting.deployed();

    // Set value of 89
    await VotingInstance.election();

    // Get stored value
    const storedData = await VotingInstance.candidateCount();

    assert.equal(storedData, 2, "The value Hello World was not stored.");
  });
});
