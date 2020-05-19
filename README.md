# kea-dhcp-rest-client
[![npm version](https://badge.fury.io/js/kea-dhcp-rest-client.svg)](https://badge.fury.io/js/kea-dhcp-rest-client)
[![](https://github.com/egs33/kea-dhcp-rest-client/workflows/ci/badge.svg?branch=master)](https://github.com/egs33/kea-dhcp-rest-client/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A client for kea rest API

## Install

```shell
npm install kea-dhcp-rest-client
```

## Usage

```javascript
const { KeaClient } = require('kea-dhcp-rest-client');
// or
import { KeaClient } from 'kea-dhcp-rest-client';

const client = new KeaClient({
  scheme: 'http',
  host: 'localhost',
  path: '/',
  port: 8080,
});

client.versionGet(['dhcp4', 'd2']).then(response => {
  console.log(response);
  // => [ { arguments:
  //         { extended:
  //            '1.6.1\ntarball\nlinked with:\nlog4cplus 1.1.2\nOpenSSL 1.1.1  11 Sep 2018\ndatabase:\nMySQL backend 8.2, library 5.7.28\nPostgreSQL backend 5.1, library 100010\nMemfile backend 2.1' },
  //        result: 0,
  //        text: '1.6.1' },
  //      { arguments:
  //         { extended:
  //            '1.6.1\ntarball\nlinked with:\nlog4cplus 1.1.2\nOpenSSL 1.1.1  11 Sep 2018\n' },
  //        result: 0,
  //        text: '1.6.1' } ]
});

// for specify control-agent, use [] or nil.
client.versionGet([]).then(response => {
  console.log(response);
  // => [ { arguments:
  //         { extended: '1.6.1\ntarball\nlinked with:\nlog4cplus 1.1.2\n' },
  //        result: 0,
  //        text: '1.6.1' } ]
});
```

## ES modules
For using builded for esm, import `kea-dhcp-rest-client/dist-esm`.

## Reference

### Kea API Reference
- https://kea.readthedocs.io/en/latest/api.html
