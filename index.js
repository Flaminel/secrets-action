const core = require("@actions/core");
const fetch = require("node-fetch");

async function run() {
    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const body = {
            accessToken: core.getInput("access-token"),
            secretsKeys: JSON.parse(core.getInput("secrets-names")).names,
        };

        const response = await fetch(
            "https://secrets-api.pricegrabber.xyz/api/secrets/multiple",
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers,
            }
        );

        if (response.status === 404) {
            core.setFailed(await response.json());
            return;
        }

        if (response.status !== 200) {
            core.setFailed("Failed with status " + response.status);
            return;
        }

        const content = await response.json();

        core.setOutput("secrets-values", JSON.stringify(content));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
