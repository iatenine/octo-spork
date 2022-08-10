# OctoSpork

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Table of Contents

[Description](#description)  
[Installation](#installation)  
[Usage](#usage)  
[Contributing](#contributing)  
[Tests](#tests)  
[FAQ](#faq)
[Support](#support)  
[License](#license)

# Description

OctoSpork aims to create an intuitive, centralized area to access information
regarding public servants representing a user

# Installation

To configure a local instance of this server, clone the repo and follow the steps below:

- Obtain API keys from [ProPublica](https://www.propublica.org/datastore/api/propublica-congress-api) and [FEC](https://api.open.fec.gov/developers)
- Run `npm install` to install dependencies
- Create `.env` at the the project root with the following structure

```
PROPUBLICA_KEY=<your ProPublica API key>
FEC_KEY=<your FEC API key>
```

- Run either `npm run start` to build `/dist` and run the generated files or `npm run dev` to run the `/src` files directly without a build step (useful for debugging)

# Usage

This repo only represents the server of the OctoSpork project,
providing endpoints that can be used by any FE or REST client

# Contributing

If you'd like to contribute, visit our `issues` tab to either
file a new issue or begin working on one already created. We
use a [trunk-based development](https://trunkbaseddevelopment.com/) approach and do not permit
direct pushes to `main` so please open a PR for any proposed
improvements

If you'd like to work directly with the OctoSpork team or help
in some other way, please use the contact link in the [questions](#questions)
section

# Tests

This repository uses a Jest testing suite and requires all new PRs to pass existing tests. Any new files should have be committed alongside a corresponding unit test and have, at a minimum, 1 `toBe()` and one `not.toBe()` expect statements that test the new functionality in some way

# FAQ

Q: Why did the chicken cross the road?

A: Your mother

# Support

Maintainer: [Jack Linhart](https://github.com/iatenine)

For further questions, direct emails [here](mailto:FullJackDevelopment@gmail.com)

# License

This project is covered under [The MIT License](https://opensource.org/licenses/MIT)
