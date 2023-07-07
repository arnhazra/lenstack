## Lenstack

### Introduction

Lenstack is not just a standalone application; it serves as a comprehensive platform hosting multiple Software-as-a-Service (SaaS) applications. In technical terms, Lenstack can be considered a Platform-as-a-Service (PaaS). Let's explore the various applications hosted within Lenstack:

#### Airlake
An open-source application designed for effortless discovery, subscription, and utilization of third-party cloud data.

#### Evolake
An open-source application that harnesses the capabilities of the OpenAI GPT-4 Davinci model to generate complex and efficient database queries.

#### Icelake
An open-souce application that offers secure and scalable storage solution for files and data, designed to meet your storage needs.

#### Snowlake
An open-source prototype management application that that efficiently organizes and manages prototypes and uses Ethereum Blockchain to store prototypes.

#### Frostlake
An open-source analytics provider for web applications. It empowers you to make informed decisions by offering valuable insights and data analysis.

### What is the cost of using this platform ?

Typically, utilizing this platform incurs no cost. However, a subscription fee of 0.19 MATIC/month is required for the standard subscription, while the premium subscription is available at 0.49 MATIC/month. It's worth noting, as we utilize the Polygon Testnet, allowing you to receive free MATIC tokens daily into your wallet, enabling you to use this platform completely free of charge.
Upon successfully creating an account on the application, an Ethereum wallet will be promptly allocated to you. This wallet serves as a designated repository for your funds, allowing you to conveniently deposit the desired amount to cover the subscription charges and enable seamless utilization of the platform's services.

### Tech Stack

* OpenAI Davinci model for generating queries
* Mongo DB For Users, Transactions Management
* Ethereum Blockchain for decentralized transactions - ERC-20 token for payment & ERC-721 token for subscription ownership representation
* Web3 JS for Ethereum blockchain for Web3 transactions
* Redis for Managing user authentication, access tokens
* Express JS as a framework on top of Node JS for API - Microservices
* Next JS as a framework on top of React as a UI library
* Google OAuth2 with nodemailer for 2 factor authentication (OTP based)