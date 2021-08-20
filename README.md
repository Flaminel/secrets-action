# Secrets action

<p align="center">
  <a href="https://github.com/flaminel/secrets-action/actions"><img alt="secrets-action status" src="https://github.com/flaminel/secrets-action/workflows/units-test/badge.svg"></a>
</p>

## Code

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ wait 500 ms (504ms)
  ✓ test runs (299ms)
...
```

## Usage

```yaml
uses: flaminel/secrets-action@v1
with:
    access-token: "test"
    secrets-names: "test"
```
