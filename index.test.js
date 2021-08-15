const wait = require("./wait");
const process = require("process");
const cp = require("child_process");
const path = require("path");

test("wait 500 ms", async () => {
    const start = new Date();
    await wait(500);
    const end = new Date();
    var delta = Math.abs(end - start);
    expect(delta).toBeGreaterThanOrEqual(500);
});

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
    process.env["INPUT_ACCESS-TOKEN"] = "test";
    process.env["INPUT_SECRETS-NAMES"] = '{ "names": ["name1","name2"] }';
    const ip = path.join(__dirname, "index.js");
    cp.execSync(`node ${ip}`, { env: process.env });
});
