# Release notes

### v5.0

### v4.5
* Added credentials by default in workspace instead of subscription
* Minor bug fixes and performance improvements

### v4.4
* Introduction of new Credential authorization with Client Id and Client Secret
* Braking changes - Deprecation of API Key authorization 
* Modified the prompt modal to accept string values & make more reusable
* Eliminated the CreateProject Page in Insights & added the functionality in prompt modal
* Eliminated the CreateDatabase Page in Fabric & added the functionality in prompt modal
* Renamed Insights clientId to projectId and clientSecret to projectPasskey
* Minor changes and bug fixes

### v4.3
* Fix header links alignment issue
* Added wall on products page when user is not subscribed
* Migrated Redis from AWS to Azure
* Fix APIKey not removed after switching workspace
* Removed dependency on Quicknode, Infura and Alchemy from UI
* Created API services for blockchain transactions to transact securely without exposing the API Keys
* Deprecated method getSecretConfig as configs are no longer required to be exposed
* Moved NPA wallet address to UI Constants
* Renamed schema and models of products with more generic names

### v4.2
* Header UI Changes
* Minor changes & performance improvements
* Minor Bug fixes
* Headline change on products page

### v4.1
* Subscription configuration changes
* File naming changes as per new standard
* Dependency updates & performance improvements
* Code Refactoring

### v4.0
* Migration of all mongo databases into Azure from AWS & GCP, existing Azure mongo databases remains same
* Product config changes as per new product name standards
* API reference changes as per new product names
* Keyboard shortcut for global search
* Introduction of new & modern UI
* Rebranding of Airlake as Lenstack Datalake
* Rebranding of Hyperedge as Lenstack Fabric
* Rebranding of Frostlake as Lenstack Insights
* Rebranding of Edgescan as Lenstack Ledgerscan
* Rebranding of Snowlake as Lenstack NFT Studio
* Rebranding of Edgepay as Lenstack Pay
* Rebranding of Swapstream as Lenstack Swap
* Created DTO for all controllers wherever required to avoid raw data extraction from request body
* Code refactoring
* APIReference updates for products API as per new API Routes
* Braking API Changes - Added products as prefix on each product api
* Replaced Infura with Alchemy Gateway for Swapstream to distribute load
* Replaced Infura with Quicknode Gateway for Snowlake to distribute load
* Added Quicknode & Alchemy Web3 Gateway
* Fix search not being displayed on PROD
* Removed Infura secret from env and merged with infura endpoint api to achieve reusability
* Minor changes & performance improvements

### v3.5
* Minor code refactoring
* UX Improvements
* Client directory structural changes
* Added useCallback to display search based results for all products and dashboard
* Removed generic product page
* Added APIReference module replacing Documentation module
* Fixed issus related to new subscription
* Fixed minor issues in UI

### v3.4
* UI Code Refactoring
* Replaced dbRegion field from Platformconfig with appCategory
* App Category based image for generic app card
* Move Swapstreamtokenconfig to DB

### v3.3
* Resolve the problem of automatic subscription deletion upon expiration.
* Rectify the issue causing the API key to change with every subscription renewal.
* Incorporate the workspace object within user details for display on the subscription page.

### v3.2
* Include the workspace name in the context for improved user experience.
* Implement the automatic creation of a default workspace for new users.
* Code optimizations, removed userdetails api call method on subscription & workspace changes
* Added refreshId to revalidate API and update context

### v3.1
* Introduction of workspaces
* Integrated workspaces with UI
* Added global search - UI
* Rebranding of Apps as Products with No Braking API Changes
* Added similar search feature as Airlake in Dashboard, Frostlake, Hyperedge, Snowlake, Swapstream - API & UI

### v3.0
* Fixed framer motion animation issue on header
* Minor UX imporvements & code refactoring
* Introduction of generic hero component
* Documentation UI changes
* New & Modern Dark UI layout for Platform & all app Home Page
* Removed owner field from app transactions and entities and added workspaceId to separate workspaces
* Fixed some UI issues where subscription not updated after switching workspace or new subscription
* Deprecated getUsageByWorkspaceId api as data is already available in userdetails api
* Added 2 more parameters in the appstate object

### v2.5
* Introduction of Hexscan - Blockchain Analyzer on Polygon Platform
* Fixed user registration issues
* Changes in authentication params, no requirements of name
* UI Design Changes

### v2.4
* Documentation Changes
* Removed Tx records from Decentralized apps
* Removed apiKey from dto as that is no more used in controller/services and only in middleware
* Rebranded Vuelock to Hyperedge

### v2.3
* Added the api key authorizer call before blockchain transactions to restrict user if no/expired api key
* Removed APIKey dependency from request body and added in header with x-api-key
* Fix Hyperedge db view security issue, added dbPassword field as mandatory

### v2.2
* Rebranded Dwallet to Edgepay
* Implemented significant Performance & Security Enhancements - Eliminated the need for recalculating APIKey dependency from the DB
* Implemented Minor Enhancements to the Identity Provider

### v2.1
* Implemented Minor Performance Improvements
* Enhanced UX for NFT & Image Support on Snowlake
* Conducted Codebase Refactoring, eliminating unnecessary components

### v2.0
* Significantly Upgraded Platform API Key Authorizer, enhancing performance and removing the need for API credits calculation
* Added the remainingCredits field in the subscription to prevent recalculation
* Eliminated the findUsageByAPIkey method from apps
* Implemented a Global 401 handler on the platform
* Conducted Major Dependency Upgrades
* Upgraded Platform Authorization system significantly, enhancing performance
* Modified error handling with the new Tanstack query
* Scaled Subscription charges and replaced tokens used with credits
* Merged Subscription & Usage Module with API Changes
* Introduced the new key database manager app - Hyperedge
* Implemented Minor Bug Fixes & Performance Improvements

### v1.5
* Conducted Major Codebase Refactoring
* Added Generic Documentation
* Implemented Breaking API Changes in Airlake Data API
* Made Minor Visual Enhancements

### v1.4
* Implemented Major Visual Enhancements
* Introduced the new Passkey based Identity Provider for IAM replacing the legacy Auth Provider
* Conducted Bug Fixes on the API key authorizer & optimized the code
* Introduced AuthProvider, replacing Auth HOC & Auth Page

### v1.3
* Re-architected the backend APIs with a New Tech Stack, introducing Nest JS to replace Express
* Introduced Dwallet and Swapstream
* Implemented a Direct and Faster Ethereum Payment System, removing the dependency on ERC-20

### v1.2
* Introduced Auth HOC for authorization within the App
* Implemented Advanced Cache Controls
* Integrated Frostlake - Analytics Platform (previously a separate app) into the Platform
* Introduced Auth HOC for authorization within the App

### v1.1
* Implemented Advanced Cache Controls
* Changed Technology Stack - Introduced Next JS, replacing CRA
* Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
* Introduced a new app, Snowlake - NFT Toolkit, to the Platform

### v1.0
* Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
* Introduced subscription & subscription key based on Ethereum payment
* Integrated Airlake - Dataset Marketplace (previously a separate app) into the Platform
* Introduced the new Lenstack Platform