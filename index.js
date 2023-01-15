const core = require("@actions/core");
import fetch from 'node-fetch';

async function run() {
    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        const secrets = core.getInput("secrets-names");
        const body = {
            accessToken: core.getInput("access-token")
        };
        var response;

        if (secrets === "") {
            response = await fetch(
                "https://secrets.mariusne.com/api/secrets/all",
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body)
                }
            );
        }
        else {
            body['secretsKeys'] = JSON.parse().names;
    
            response = await fetch(
                "https://secrets.mariusne.com/api/secrets/multiple",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: headers,
                }
            );
        }

        

        if (response.status === 404) {
            core.setFailed(await response.json());
            return;
        }

        if (response.status !== 200) {
            core.setFailed("Failed with status " + response.status);
            return;
        }

        const content = await response.json();
        const keys = Object.keys(content);

        keys.forEach((key) => {
            core.setSecret(content[key]);
            core.exportVariable(key, content[key]);
        });

        core.setOutput("secrets-values", JSON.stringify(content));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
