import lessJSON from './index.js';

const json = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "cardano-babbage.json",
  "title": "Cardano Domain Types",
  "definitions": {
    "BigInt": {
      "title": "BigInt",
      "type": "string",
      "description": "A long integer domain type",
      "pattern": "^(0|-?[1-9][0-9]*)$",
      "examples": [
        "0",
        "-123",
        "123"
      ]
    },
  }
};

const go = async () => {
  await lessJSON(json);
  await lessJSON({
  hi: 'hello',
  who: [
    'world',
  ]
  });
  await lessJSON({
    0: null,
    2: 13123,
    1: [
      0
    ]
  });
};

go();
