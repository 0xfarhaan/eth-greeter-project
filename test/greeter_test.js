const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
  it("had been deployed sucessfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "contract was not deployed");
  });

  describe("greet()", () => {
    it("returns 'Hello, world!'", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Hello, World!";
      const actual = await greeter.greet();

      assert.equal(actual, expected, "greeted with Hello, World!'");
    });
  });

  describe("owner()", () => {
    it("returns the address of the owner", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();

      assert(owner, "the current owner");
    });
    it("matches the address that origonally deployed the contract", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      const expected = accounts[0];

      assert.equal(
        owner,
        expected,
        "matches address used to deploy the contract"
      );
    });
  });
});

contract("Greeter: updated greeting", (accounts) => {
  describe("setGreeting(string)", () => {
    it("when message is sent by the owner", () => {
      it("sets the greeting that was passed as a string", async () => {
        const greeter = await GreeterContract.deployed();
        const expected = "The owner changed the message";

        await greeter.setGreeting(expected);
        const actual = await greeter.greet();

        assert.equal(actual, expected, "greeting updated");
      });
    });
  });

  describe("when message is sent by another account", () => {
    it("does not set the greeting", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = await greeter.greet();

      try {
        await greeter.setGreeting("Not the owner", { from: accounts[1] });
      } catch(err) {
        const errorMessage = "Ownable: caller is not the owner";
        assert.equal(err.reason, errorMessage, "Greeting should not update");
        return;
      }
      assert(false, "greeting should not update");
    });
  });
});
