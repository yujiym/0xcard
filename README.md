# Card Protocol

Decentralized business card protocol with privacy. The data is stored in IPFS & decentralized db, and encrypted with Lit Protocol.

This repository is for a [HackFS2023](https://www.ethglobal.com/events/hackfs2023) project.

## Description

### 😑 Problem:

Exchanging contact information at events is a hassle. Own your data, but privacy is important.
Existing vCard formats and solutions such as Linktree make all information public., so we can't handle sensitive/private data.
I saw hackathon participants recruiting teammates by posting LinkedIn links or something similar. and wondered if I could make something better with crypto.

### 💡 Solution:

A Linktree-like UI allows users to create pages.
Executing save on the profile screen saves the minimum information for contact list display and association in polybase, and saves all data in VCF format in IPFS.

For items with the public range set to "in each other's contact list," the data is saved encrypted with Lit Protocol and will not be decrypted unless both parties are in each other's contact list.

Since this is an existing VCF format, it is easy to import the data with a smartphone and exchange it via URL reference or file passing of NCF tags.

- e.g. My telegram id is only shared with whom I have exchanged contact information. (Exists on each other's contact list.)
- e.g. NFT icons are public, actual photos are only viewable to those who have exchanged contact information (Solving the problem of who was him/her after the event)

### 💊 Feature Plans:

I'm currently implementing only the basic functionality and the simple condition of "only open to each other's contacts," but I'm also considering extending this to include Lit Protocol conditions, event participants who hold POAPs, and other groupings with ZKP, etc.

## How it's made

The system architecture details is below link:
![architecture](https://0x.cards/img/how-it-works.png)

- web3storage: Upload/read the user's contact data in vCard format to IPFS.
- w3name: Makes the user's contact file address immutable. This CID is also used for use's URLs.
  (https://0x.cards/bafybeiengmxblvgc7byhiksb3ykdnji3px22j4fjglya3lhw6zzua2z4vu)
- polybase: Polybase Auth for singn in with wallet or email. The main data is stored in IPFS, and is used to store additional information such as indexing infomation about the user for display (Contact ids, User's keys ...)
- Lit Protocol: Encrypt/decrypt user's private fields. LitAction is placed in IPFS and decrypt is performed by referencing the Contact table in polybase to determine if we are on each other's Contact list (know each other).
