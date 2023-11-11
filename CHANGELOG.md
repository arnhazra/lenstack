# Lenstack Changelog

### v2.7
* Minor code refactoring

### v2.6
* Fixed issus related to new subscription
* Fixed minor issues in UI

### v2.5
* UI Code Refactoring
* Replaced dbRegion field from Platformconfig with appCategory
* App Category based image for generic app card
* Move Swapstreamtokenconfig to DB

### v2.4
* Resolve the problem of automatic subscription deletion upon expiration.
* Rectify the issue causing the API key to change with every subscription renewal.
* Incorporate the workspace object within user details for display on the subscription page.
* Include the workspace name in the context for improved user experience.
* Implement the automatic creation of a default workspace for new users.
* Code optimizations, removed userdetails api call method on subscription & workspace changes
* Added refreshId to revalidate API and update context

### v2.3
* Introduction of Lenstack workspaces
* Integrated workspaces with UI
* Removed owner field from app transactions and entities and added workspaceId to separate workspaces
* Fixed some UI issues where subscription not updated after switching workspace or new subscription
* Deprecated getUsageByWorkspaceId api as data is already available in userdetails api
* Added 2 more parameters in the appstate object

### v2.2
* Introduction of generic hero component
* Documentation UI changes
* New & Modern Dark UI layout for Lenstack & all app Home Page

### v2.1
* Fixed framer motion animation issue on header
* Minor UX imporvements & code refactoring

### v2.0
* Introduction of Hexscan - Blockchain Analyzer on Polygon Platform
* Fixed user registration issues
* Changes in authentication params, no requirements of name
* UI Design Changes
* Documentation Changes
* Removed Tx records from Decentralized apps as it"s not required
* Added the api key authorizer call before blockchain transactions to restrict user if no/expired api key
* Removed APIKey dependency from request body and added in header with x-api-key
* Fix Hyperedge db view security issue, added dbPassword field as mandatory
* Removed apiKey from dto as it"s not used in controller/services and only in middleware
* Rebranded Vuelock to Hyperedge
* Rebranded Dwallet to Edgepay
* Implemented significant Performance & Security Enhancements - Eliminated the need for recalculating APIKey dependency from the DB
* Implemented Minor Enhancements to the Identity Provider

### v1.9
* Implemented Minor Performance Improvements
* Enhanced UX for NFT & Image Support on Snowlake
* Conducted Codebase Refactoring, eliminating unnecessary components

### v1.8
* Significantly Upgraded Platform API Key Authorizer, enhancing performance and removing the need for API credits calculation
* Added the "remainingCredits" field in the subscription to prevent recalculation
* Eliminated the "findUsageByAPIkey" method from apps
* Implemented a Global 401 handler on the platform

### v1.7
* Conducted Major Dependency Upgrades
* Upgraded Platform Authorization system significantly, enhancing performance
* Modified error handling with the new Tanstack query

### v1.6
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
* Introduced the new Passkey based Identity Provider for IAM - Lenstack Id, replacing the legacy Auth Provider
* Conducted Bug Fixes on the API key authorizer & optimized the code
* Introduced AuthProvider, replacing Auth HOC & Auth Page

### v1.3
* Re-architected the backend APIs with a New Tech Stack, introducing Nest JS to replace Express
* Introduced Dwallet and Swapstream
* Implemented a Direct and Faster Ethereum Payment System, removing the dependency on ERC-20

### v1.2
* Introduced Auth HOC for authorization within the App
* Implemented Advanced Cache Controls
* Integrated Frostlake - Analytics Platform (previously a separate app) into the Lenstack Platform
* Introduced Auth HOC for authorization within the App

### v1.1
* Implemented Advanced Cache Controls
* Changed Technology Stack - Introduced Next JS, replacing CRA
* Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
* Introduced a new app, Snowlake - NFT Toolkit, to the Lenstack Platform

### v1.0
* Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
* Introduced subscription & subscription key based on Ethereum payment
* Integrated Airlake - Dataset Marketplace (previously a separate app) into the Lenstack Platform
* Introduced the new Lenstack Platform