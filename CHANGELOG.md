# Changelog

### v5.7.0
* Application Optimization
* Revamped pricing tiers
* Minor code refactoring
* Dependency updates & bug fixes
* Deprecated NFT Studio
* Integrated new blockchain apis

### v5.6.0
* Application Optimization
* Introduction of custom scrollbar in UI
* Removal of global search keyword & replacement with search as an event
* Removal of appstate
* Regular dependency updates
* Removed Refresh Id
* Introduction of event driven design pattern in WEB for cross component communication
* Removal of Hobby Plan & Introduction of Trial Plan
* Dependency updates & bug fixes
* Insights Integration for user behaviour tracking 
* Introduction of event driven design pattern in API for cross module communication

### v5.5.3
* Regular dependency updates & bug fixes
* renamed uft & ufc in authorizers to user
* Deprecated Swap & Wallet applications
* Layout sync across app for all products, dashboard & workspace page
* Home page updates
* Minor code refactoring
* Regular dependency updates

### v5.5.2
* Rebranding of Data Exchange to Data Marketplace
* Pricing restructure
* Updated theme from zinc & gray to slate
* Dependency updates & minor bug fixes

### v5.5.1
* Added Credential Authorizer in all tx gateways to enable API solution for blockchain apps 
* Removed all Create TX API
* Removed API Pricing Credits
* Restructured Pricing & Credits 
* Renamed Credits to API calls
* New Analytics Get API released outside platform
* Bug fixes & performance improvements
* Unnecessary code cleanup

### v5.5.0
* Application UI Overhaul with Shadcn UI & Tailwind replacing React Bootstrap & Bootstrap
* Deprecated Ledgerscan app
* Stripe Payment integration
* More generic terms introduction
* Removed Infura Gateway
* Replaced Polygon Mumbai with Polygon Amoy for Blockchain Transactions
* Dependency updates & Bug fixes
* Minor dependency updates
* Bug fixes

### v5.4.2
* Update sustainability settings for better performance
* Integrated reduceCarbonEmissions in users collection
* Removed sustainability settings model & module
* Updated UI for changing sustainability settings
* Removed sustainability page & integrated settings in accounts page

### v5.4.1
* Integration of sustainability settings
* Code optimization for sustainable development to reduce carbon emissions
* New modern way to put items in page center applied for loading & box classes
* Subscription configuration changes

### v5.4.0
* Removal of all useCallback & useMemo as these will be deprecated in React 19 & beyond
* Fix hobby subscription not activating after one time
* Option component improvements
* Improvements in accounts page
* Regular Dependency updates
* Minor bug fixes

### v5.3.3
* Design changes in Account, Pay & Usage page
* Deprecated Usage Page
* Integrated Usage details in New Accounts Page
* Pricing details changes
* Minor bug fixes & performance improvements
* Minor styling changes - merged text-muted and muted-text classnames

### v5.3.2
* Rebranding of identity as auth
* Removed unused code & dependencies
* Bug fixes on auth step
* Removal of getblock gateway
* Minor bug fixes
* Regular dependency updates

### v5.3.1
* Deprecation of platform module
* Integrated product config in products module
* Integrated identity-guard component in auth layout
* Deprecation of dashboard page
* Introduction of new products & exploreproducts page
* Changes in layouts

### v5.3.0
* Migrated entire backend to DDD with CQRS pattern
* Added type safety for dispatcher in context
* Deprecation of Insights 
* Introduction of Analytics
* Deprecation of Datalake 
* Introduction of Data Exchange
* Deprecation of Fabric 
* Introduction of KV Store
* Minor bug fixes & performance improvements
* Deprecated generic transaction gateways
* Introduction of module specific gateways with load distribution
* Code optimization

### v5.2.0
* Minor bug fixes & performance improvements
* Removal of multiple workspace based subscription for a single user
* Introduction of unified user subscription
* Removal of ownerId property & introduction of new userId property
* Changes in identity passkey email template

### v5.1.0
* Improved workspace experience
* Regular dependency updates & bug fixes
* Regular dependency updates & bug fixes
* Introduction of improved cache busting mechanism

### v5.0.0
* Header rendring logic changes
* Regular dependency updates
* Removal of activity module
* Introduction of new UI design
* Removal of old Product card
* Introduction of new Generic card
* Changes in styling
* Migrated Wallet API to CQRS pattern
* Code refactoring
* Introduction of grid component
* Removal of project dependency in insights
* Removal of db dependency in fabric
* Added Client credentials as new way of authentication for fabric & insights
* Added new component based styling system

### v4.5.0
* Removed monthly subscription plans
* Added yearly subscription plans
* Minor bug fixes and performance improvements
* Regular Dependency Updates
* New develop branch
* New dev environment integration

### v4.4.0
* Adeed dynamic details - plans page
* Reuse of pricing component in plans page
* Renaming apps api-server, ui-client
* Regular dependency updates

### v4.3.0
* Update prompt implementation to make to value a required field
* Fix issue - unable to create a project in insights
* Fix issue - unable to create a db in fabric

### v4.2.0
* Minor overall UI Changes
* Bug fixes and Performance improvements
* Payment gateway UI Changes
* Prompt UX improvements
* Rebranding of Checkout page as Pay page

### v4.1.1
* UI & API Codebase refactoring
* Regular dependency updates & bug fixes
* Replacement of moment with date-fns library
* Removal of lodash.debounce
* Added new usehooks library

### v4.1.0
* Added new pricing page for unauthorized view
* Regular dependency updates
* Minor changes & bug fixes
* Introduction of API response delay in hobby plan
* Limiting 3 workspaces per user
* Removal of one time trial plan and introduction of Free plan
* Introduction of new interactive pricing plans

### v4.0.0
* Minor design changes in Apps - Copilot, Ledgerscan & Wallet
* Updated email template
* Adding more strict typescript
* Code refactoring
* Restructure contract application
* Introduction of new monorepo architecture
* Introduction of Generative AI - Google Gemini LLM based Copilot application
* Code refactoring & bug fixes
* Custom global confirm provider
* Custom global prompt provider

### v3.5.0
* Introduction of new subscription plans 
* Introduction of new checkout page
* Introduction of 4 new transaction gateways
* Regular dependency updates
* Code refactoring
* Removed dbId conflict in fabric databases
* Removed projectId conflict in insights projects

### v3.4.0
* Code cleanup
* Introduction of new transaction gateway
* Deprecation of separate transation gateways for modules
* Regular dependency updates & bug fixes
* Removed framer motion

### v3.3.1
* Better error handlings with suspense
* Minor changes & performance improvements
* Rebranding of Pay as Wallet
* Rebranding & Redesigned UI

### v3.3.0
* Introduction of new suspense component with fallback ui
* Deprecated Show component
* Added strict types to functions, constants, returns
* Fix resubscribe issue
* Implementation of DDD with CQRS pattern in some modules
* New Card Component
* Introduction of new Suspense Component
* Introduction of Tanstack query default options
* Component new naming convention
* Tanstack query dependency modifications

### v3.2.0
* Node Dependency updates
* Migratred some more components into RSC architecture
* Bug fixes and performance improvements
* Fixed all activity not displayed issue
* Migrated some more components to RSC Architecture
* Introduction of useCallback and useMemo hook for rendering lists and cards in all components

### v3.1.0
* Component specific types introduction
* Migrated layouts & some components to RSC Architecture
* Introduction of new style provider
* Performance Optimization & Code refactoring
* Dashboard changes
* Dependency updates
* Bug fixes & Performance improvements

### v3.0.0
* Restructure API methods
* Fix key warning issue
* Bug fixes & Performance improvements
* UI Overhaul with new design
* Introduction of live activities
* Introduction of Data Quality Standard in Datalake
* Changed header icon and link positions
* Minor bug fixes and performance improvements
* Introduction of new auth layout using Next 14 Route Group Layouts
* Removed legacy Identity Provider

### v2.5.0
* New customized button UI
* Minor bug fixes and UI Performance improvements
* Minor bug fixes and performance improvements
* Code refactoring
* Generic SensitiveInfoPanel component to use across the app
* Added credentials by default in workspace instead of subscription
* Introduction of new Credential authorization with Client Id and Client Secret
* Braking changes - Deprecation of API Key authorization 

### v2.4.1
* Eliminated the CreateDatabase Page in Fabric & added the functionality in prompt modal
* Renamed Insights clientId to projectId and clientSecret to projectPasskey
* Minor changes and bug fixes
* Modified the prompt modal to accept string values & make more reusable
* Eliminated the CreateProject Page in Insights & added the functionality in prompt modal

### v2.4.0
* Fix header links alignment issue
* Added wall on products page when user is not subscribed
* Migrated Redis from AWS to Azure
* Fix APIKey not removed after switching workspace
* Removed dependency on Quicknode, Infura and Alchemy from UI
* Created API services for blockchain transactions to transact securely without exposing the API Keys
* Deprecated method getSecretConfig as configs are no longer required to be exposed
* Moved NPA wallet address to UI Constants
* Renamed schema and models of products with more generic names

### v2.3.1
* Header UI Changes
* Minor changes & performance improvements
* Minor Bug fixes
* Headline change on products page

### v2.3.0
* Keyboard shortcut for global search
* Rebranding of Airlake as Datalake
* Rebranding of Hyperedge as Fabric
* Rebranding of Frostlake as Insights
* Rebranding of Edgescan as Ledgerscan

### v2.2.0
* Rebranding of Edgepay as Pay
* Rebranding of Swapstream as Swap
* Introduction of new & modern UI
* Migration of all mongo databases into Azure from AWS & GCP, existing Azure mongo databases remains same

### v2.1.1
* Product config changes as per new product name standards
* API reference changes as per new product names
* Subscription configuration changes
* File naming changes as per new standard
* Dependency updates & performance improvements
* Code Refactoring

### v2.1.0
* Replaced Infura with Alchemy Gateway for Swapstream to distribute load
* Replaced Infura with Quicknode Gateway for Snowlake to distribute load
* Added Quicknode & Alchemy Gateway
* Created DTO for all controllers wherever required to avoid raw data extraction from request body
* Code refactoring
* APIReference updates for products API as per new API Routes
* Braking API Changes - Added products as prefix on each product api

### v2.0.0
* Fix search not being displayed on PROD
* Removed Infura secret from env and merged with infura endpoint api to achieve reusability
* Minor changes & performance improvements
* Added useCallback to display search based results for all products and dashboard
* Removed generic product page
* Added APIReference module replacing Documentation module
* Added global search - UI
* Rebranding of Apps as Products with No Braking API Changes
* Added similar search feature as Airlake in Dashboard, Frostlake, Hyperedge, Snowlake, Swapstream - API & UI
* Minor code refactoring
* UX Improvements
* Client directory structural changes

### v1.5.0
* UI Code Refactoring
* Replaced dbRegion field from Platformconfig with appCategory
* App Category based image for generic app card
* Move Swapstreamtokenconfig to DB
* Fixed issus related to new subscription
* Fixed minor issues in UI

### v1.4.0
* Resolve the problem of automatic subscription deletion upon expiration
* Rectify the issue causing the API key to change with every subscription renewal
* Incorporate the workspace object within user details for display on the subscription page
* Include the workspace name in the context for improved user experience
* Implement the automatic creation of a default workspace for new users
* Code optimizations, removed userdetails api call method on subscription & workspace changes
* Added refreshId to revalidate API and update context

### v1.3.2
* Introduction of workspaces
* Integrated workspaces with UI
* Removed owner field from app transactions and entities and added workspaceId to separate workspaces
* Fixed some UI issues where subscription not updated after switching workspace or new subscription
* Deprecated getUsageByWorkspaceId api as data is already available in userdetails api
* Added 2 more parameters in the appstate object

### v1.3.1
* Introduction of generic hero component
* Documentation UI changes
* New & Modern Dark UI layout for Platform & all app Home Page
* Fixed framer motion animation issue on header
* Minor UX imporvements & code refactoring

### v1.3.0
* Introduction of Hexscan - Blockchain Analyzer on Polygon Platform
* Fixed user registration issues
* Changes in authentication params, no requirements of name
* UI Design Changes
* Documentation Changes
* Removed Tx records from Decentralized apps
* Added the api key authorizer call before blockchain transactions to restrict user if no/expired api key
* Removed APIKey dependency from request body and added in header with x-api-key
* Fix Hyperedge db view security issue, added dbPassword field as mandatory
* Removed apiKey from dto as that is no more used in controller/services and only in middleware

### v1.2.2
* Rebranded Vuelock to Hyperedge
* Rebranded Dwallet to Edgepay
* Implemented significant Performance & Security Enhancements - Eliminated the need for recalculating APIKey dependency from the DB
* Implemented Minor Enhancements to the Identity Provider
* Implemented Minor Performance Improvements
* Conducted Codebase Refactoring, eliminating unnecessary components
* Significantly Upgraded Platform API Key Authorizer, enhancing performance and removing the need for API credits calculation
* Added the remainingCredits field in the subscription to prevent recalculation

### v1.2.1
* Eliminated the findUsageByAPIkey method from apps
* Implemented a Global 401 handler on the platform

### v1.2.0
* Scaled Subscription charges and replaced tokens used with credits
* Merged Subscription & Usage Module with API Changes
* Introduced the new key database manager app - Hyperedge
* Implemented Minor Bug Fixes & Performance Improvements
* Conducted Major Dependency Upgrades
* Upgraded Platform Authorization system significantly, enhancing performance
* Modified error handling with the new Tanstack query

### v1.1.1
* Conducted Major Codebase Refactoring
* Added Generic Documentation
* Implemented Breaking API Changes in Airlake Data API
* Made Minor Visual Enhancements

### v1.1.0
* Re-architected the backend APIs with a New Tech Stack, introducing Nest JS to replace Express
* Introduced Dwallet and Swapstream
* Implemented a Direct and Faster Ethereum Payment System, removing the dependency on ERC-20
* Implemented Major Visual Enhancements
* Introduced the new Passkey based Identity Provider for IAM replacing the legacy Auth Provider
* Conducted Bug Fixes on the API key authorizer & optimized the code
* Introduced AuthProvider, replacing Auth HOC & Auth Page

### v1.0.0
* Implemented Advanced Cache Controls
* Changed Technology Stack - Introduced Next JS, replacing CRA
* Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
* Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
* Introduced subscription & subscription key based on Ethereum payment
* Integrated Airlake - Dataset Marketplace (previously a separate app) into the Platform
* Introduced the new Platform
* Introduced Auth HOC for authorization within the App
* Implemented Advanced Cache Controls
* Integrated Frostlake - Analytics Platform (previously a separate app) into the Platform
* Introduced Auth HOC for authorization within the App
