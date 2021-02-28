const GreeterContract = artifacts.require("Greeter");

contract("Greeter", () => {
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
    })
  })

});



contract("Greeter: updated greeting", () => {
  describe("setGreeting(string)", () => {
    it("sets greeting that was passed in the string", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Hi there!"

      await greeter.setGreeting(expected)
      const actual = await greeter.greet()

      assert.equal(actual, expected, "greeting was not updated")
    })
  })
})
