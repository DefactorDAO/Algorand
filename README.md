# Algorand PoC

The PoC includes:

- Minting NFT
- Upload & Retrieve encrypted Folder to/from IPFS

## Prerequisites

- [Docker & Docker Compose](https://docs.docker.com/engine/install/)
- [Algorand Sandbox](https://github.com/algorand/sandbox)
- [NodeJs](https://nodejs.org/en/)
- [Pinata Service](https://www.pinata.cloud/)

## Executing Application

The executing of the application consist of 2 steps.

### Setting up the Algorand Sandbox

1. start the docker service.

2. clone the sandbox repo.  
   `git clone https://github.com/algorand/sandbox.git`
3. start devnet.  
   `./sandbox up -v`
4. show available accounts.  
   `./sandbox goal account list`
5. export an account (generate 25 word mnemonic).  
   `./sandbox goal account export -a account-address`

### Setting up the Algorand PoC Rest Api

1. clone the repo.
2. install the packages.  
   `npm ci`
3. copy `.env.tempalte` to `.env` and edit it.
4. run the development server.  
   `npm run start:dev`
