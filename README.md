<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lordshashank/dealflow">
    <img src="frontend/public/logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">DealFlow</h3>

  <p align="center">
DealFlow: Unlocking Decentralized File Storage on Filecoin with Seamless Autonomy, Verifiable Security, and Robust, Scalable Solutions for Users and Storage Providers.
    <br />
    <a href="https://ethglobal.com/showcase/dealflow-af4xp"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://ethglobal.com/showcase/dealflow-af4xp">View Demo</a>
    ·
    <a href="https://github.com/lordshashank/dealflow/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/lordshashank/dealflow/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#How-we-built-it">How we built it?</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Storing Files in a decentralized way, not having to trust centralized servers, and having the same accessibility, who doesn’t want that?
Filecoin has been leading in the space of decentralized storage and presents a perfect solution to the problem, at least on the protocol level. Still, there are many blockers in connecting users who want to store files and Storage providers who want to store them. Moreover, many of the existing solutions to store data in Filecoin have centralized points, are non-retrievable on-chain and there’s no way to verify the storage easily.
DealFlow aims to solve these problems. It is an on-chain solution for the complete verifiable flow of storing files in Filecoin for SPs and end-users. It aims to give complete autonomy to both SPs to decide on their needs and specs and users to choose from different miners having various deliverables.
The main features of DealFlow are:-

- **IPC for scaling:** It's on-chain 🙂. However, having single transaction for each file on mainnet is not at all feasible. IPC comes to the rescue here. Miners can set up their own subnets on-chain from the DealFlow contract, decide its specs, and change or delete them. They can set up their hardware in coherence with subnet for robust deal making process.
- **Stablecoin payment for Storage Providers:** SPs can register for payment in native or any other on-chain stablecoin. They can configure their subnet specs like collateral, etc with same coin, giving them complete autonomy.
- **Verifiable storage and Retrieval:** If you thought deal making so intensive, there’s another problem, how to verify that your file is actually stored? Typical solutions to this are PODSI or retrievability. User wants his data to be retrievable throughout the deal. DealFlow enables it with help of TELLOR oracles. User can challenge any deal, and tellor reporters would post CID on-chain, which can then be verified and miner can be slashed if not validated. With IPC miner can opt to post PODSI on-chain for deal verifiability as well.
- **Easy UI:** In the Filecoin network, there’s no one perfect place for miners and users to get all the options they need. With DealFlow, miner can register themselves with their asks (easily updatable), handle the subnets, view deal status, etc. Users would be able to see all available miners with their specs to choose from and verify retrieval and storage.
  With DealFlow, we aim to flow deals into Filecoin network, make a free-flowing experience for SPs and miners, and solve the universal problem of centralized storage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [Filecoin]
- [FVM]
- [IPC]
- [Beryx]
- [Tellor]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

You can look and interact with our frontend and backend code here. The frontend is built using Next.js and the backend is built using Hardhat and Solidity.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lordshashank/dealflow.git
   ```
2. Initialize the backend
   ```sh
   cd contracts
   npm install
   npm hardhat compile
   ```
3. Initialize the frontend
   ```sh
   cd ../frontend
    npm install
    npm run dev
   ```
4. Open the frontend on localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

We have used various technologies to make DealFlow functional.

### Filecoin and FVM

As being on-chain we used a lot of Filecoin-solidity library to get on-chain data on deals, miners, etc. We implemented deal-making through Filecoin-client contracts, keeping deals on-chain.

### IPC

IPC helps us scale everything on-chain. We spin subnets directly from our contract for each registered miner. The miner can handle the whole deal-making process through this subnet, and have a choice of tokens, collateral, consensus, etc. IPC gives us options for on-chain PODSI verification, etc with its infinite scaling capabilities. While integrating IPC, had to do it manually due to lack of package, thus collaborated with IPC team, and helped resolve few bugs to unblock package publishing through PRs leading to the first smart contract IPC package.

### Tellor

Tellor comes into play for verification, FileCid and DealStatus specs of tellor help to challenge miner retrieval and deals and slash them in case of failure compensating the user.

### Beryx

We don’t like backends in our dApps but this was not possible without Beryx APIs, they provided us directly usable APIs to fetch metadata for various Tokens miners can choose to pay from, giving them wide options and making our dApp give fast responses as well.

### Fleek

Building a dApp and deploying only on centralized services don’t seem apt, we used Fleek to decentralize our deployments

_For more examples, please refer to the [project](https://ethglobal.com/showcase/dealflow-af4xp)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

We look forward to building more features and making DealFlow more robust and scalable. Some of the features we plan to add are:-

- Miner implemenatation of IPC stack for easy to onboard miners
- Make dApp cross-chain compatible using axelar, etc
- File privacy encryption and
- FIle sharing by giving access to files to other accounts

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [0xlord_forever](https://twitter.com/0xlord_forever) - shashanktrivedi1917@gmail.com

Project Link: [https://github.com/lordshashank/dealflow](https://github.com/lordshashank/dealflow)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- Thanks to Ethglobal mentors for guiding us through the project
- Thanks to Filecoin, FVM, IPC and Tellor for helping us throughout the project, solving bugs, etc.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/lordshashank/dealflow.svg?style=for-the-badge
[contributors-url]: https://github.com/lordshashank/dealflow/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lordshashank/dealflow.svg?style=for-the-badge
[forks-url]: https://github.com/lordshashank/dealflow/network/members
[stars-shield]: https://img.shields.io/github/stars/lordshashank/dealflow.svg?style=for-the-badge
[stars-url]: https://github.com/lordshashank/dealflow/stargazers
[issues-shield]: https://img.shields.io/github/issues/lordshashank/dealflow.svg?style=for-the-badge
[issues-url]: https://github.com/lordshashank/dealflow/issues
[license-shield]: https://img.shields.io/github/license/lordshashank/dealflow.svg?style=for-the-badge
[license-url]: https://github.com/lordshashank/dealflow/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Beryx]: https://docs.zondax.ch/
[Filecoin]: https://filecoin.io/
[FVM]: https://fvm.filecoin.io/
[IPC]: https://docs.ipc.space/
[Tellor]: https://tellor.io/
