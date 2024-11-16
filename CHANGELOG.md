# Changelog

## v17.2

- Dependency updates & bug fixes
- Removal of unused code

## v17.1

- Dependency updates & bug fixes
- Migrated base color to slate from zinc
- UI home page updates

## v17.0

- Dependency updates & bug fixes
- Added prettier code formatter
- Monorepo architectural changes
- Introduced new subscription plans with XP
- Structural changes to subscription plans and UI
- Code refactoring & breakdown into smaller components
- Introduced workspaces and deprecated organizations

## v16.3

- Minor code refactoring
- Dependency updates

## v16.2

- Fixed auth layout scroll issue
- Dependency updates & bug fixes
- Restructured the context in next

## v16.1

- Dependency updates & bug fixes
- Removed unused dependencies across apps
- Simplified Passkey to OTP to avoid conflicts

## v16.0

- Dependency updates & bug fixes
- Added activity search service & Integrated Activity log across the app
- Major UI Overhaul across all pages & components
- Component refactoring for performance improvements

## v15.4

- Added a common request timeout of 60 sec for all requests
- Fix redirect uri not working for payments
- Dependency updates and bug fixes
- Added better error & not found handlers
- Fix intelligence error response
- Deprecated identity application

## v15.3

- Migrated all requests from old axios xhr to new fetch
- Added new request interceptors
- Rebranded account page to settings page
- Added about section in settings page

## v15.2

- Migrated homepage to server component
- Added redirect from api homepage to ui
- Minor UI component changes
- Fixed api request cost issue

## v15.1

- Removal of searchparams and replaced with dynamic routes
- Integrated AI Search in Data Marketplace for dataset search
- Integrated AI Search in Dashboard page for products search
- Rebranded Copilot as Intelligence
- Architectural changes & separate containers for deployment
- Bug fixes & performance improvements

## v15.0

- Application Restructuring
- Updated dependencies across apps
- Minor UI updates
- Dependency updates
- Input OTP UI changes
- Removal of unused dependencies
- Code cleanup
- Changed refresh token type from jwt to custom string
- Minor changes & bug fixes
- Code optimization & cleanup
- Regular dependency updates
- Removal of unused dependencies

## v14.3

- Introduction of Identity product
- Deprecated blockchain product
- Deprecated analytics product
- Deprecated insights produt
- Introduction of Web Analytics product
- Minor UI improvements

## v14.2

- Bug fixes & overall performance improvements
- Regular dependency updates
- Removed subscription based payment system and added wallet based pay
- Added $100 free credits for new users

## v14.1

- Minor UI improvements across apps
- Regular dependency updates
- Fix refresh token implementation not working in PROD
- Regular dependency updates & bug fixes
- Refresh token implementation in auth service

## v14.0

- Dynamic filters in Dashboard page
- Major UI modernization across all products
- Regenerate Credentials for Organization
- UI theme updates
- UI Hotfix for dialog modal position
- UI Redesign
- Replaced React Json view with syntax highlighter
- Upgraded HTTP NoSQL to accept any datatype

## v13.2

- Dynamic items on api reference
- Update api reference docs
- Minor styling changes
- Fix Redis max connection issue
- Minor bug fixes & Performance improvements

## v13.1

- Minor bug fixes & Performance improvements
- Regular dependency updates
- Changed user Insights to user activity log
- Introduction of Insights application for unstructured data

## v13.0

- Migrated stripe from INR to USD
- Removal of event emitter in UI to improve performance
- Minor API structural changes
- Introduction of custom scrollbar in UI
- Minor API structural changes

## v12.4

- Major Code refactoring, optimization & dependency updates across all modules
- Introduction of new core module consists of all platform APIs and events
- Intrduction of new products module consists of all products APIs

## v12.3

- Integrated CQRS design pattern with DDD across all modules for nest server
- Deprecated Token & Credential Authorizer Decorator
- Introduced new Token & Credential Guard
- Removed CreateInsights Event Emitter from Controller and added in Guard
- Restructure backend into platform & product modules
- Create services with event pattern for email

## v12.2

- Rebranded KV Store as HTTP NoSQL
- Rebranded workspace as organization
- Moved organization into account settings
- Minor bug fixes & Performance improvements
- Code refactoring, optimization & dependency updates
- Introduction of CQRS design pattern with DDD in nest server

## v12.1

- Application Optimization
- Revamped pricing tiers
- Minor code refactoring

## v12.0

- Dependency updates & bug fixes
- Deprecated NFT Studio
- Application Optimization
- Removal of global search keyword & replacement with search as an event
- Removal of appstate
- Regular dependency updates
- Removed Refresh Id

## v11.3

- Introduction of event driven design pattern in WEB for cross component communication
- Removal of Hobby Plan & Introduction of Trial Plan
- Dependency updates & bug fixes
- Insights Integration for user behaviour tracking
- Introduction of event driven design pattern in API for cross module communication

## v11.2

- Regular dependency updates & bug fixes
- renamed uft & ufc in authorizers to user
- Deprecated Swap & Wallet applications
- Layout sync across app for all products, dashboard & workspace page
- Home page updates

## v11.1

- Minor code refactoring
- Regular dependency updates
- Rebranding of Data Exchange to Data Marketplace
- Pricing restructure
- Dependency updates & minor bug fixes

## v11.0

- Removed all Create TX API
- Removed API Pricing Credits
- Restructured Pricing & Credits
- Renamed Credits to API calls
- Bug fixes & performance improvements
- Unnecessary code cleanup
- Application UI Overhaul with Shadcn UI & Tailwind replacing React Bootstrap & Bootstrap
- Deprecated Ledgerscan app
- Stripe Payment integration

## v10.4

- More generic terms introduction
- Removed Infura Gateway
- Dependency updates & Bug fixes
- Minor dependency updates
- Bug fixes

## v10.3

- Update sustainability settings for better performance
- Integrated reduceCarbonEmissions in users collection
- Removed sustainability settings model & module

## v10.2

- Updated UI for changing sustainability settings
- Removed sustainability page & integrated settings in accounts page
- Integration of sustainability settings
- Code optimization for sustainable development to reduce carbon emissions
- New modern way to put items in page center applied for loading & box classes
- Subscription configuration changes

## v10.1

- Removal of all useCallback & useMemo as these will be deprecated in React 19 & beyond
- Fix hobby subscription not activating after one time
- Option component improvements
- Improvements in accounts page
- Regular Dependency updates

## v10.0

- Minor bug fixes
- Design changes in Account, Pay & Usage page
- Deprecated Usage Page
- Integrated Usage details in New Accounts Page
- Pricing details changes
- Minor bug fixes & performance improvements
- Minor styling changes - merged text-muted and muted-text classnames

## v9.4

- Rebranding of identity as auth
- Removed unused code & dependencies
- Bug fixes on auth step
- Removal of getblock gateway

## v9.3

- Minor bug fixes
- Regular dependency updates
- Added type safety for dispatcher in context
- Deprecation of Insights
- Deprecation of Datalake

## v9.2

- Introduction of Data Exchange
- Deprecation of Fabric
- Introduction of KV Store
- Minor bug fixes & performance improvements
- Deprecated generic transaction gateways
- Introduction of module specific gateways with load distribution
- Code optimization

## v9.1

- Deprecation of platform module
- Integrated product config in products module
- Integrated identity-guard component in auth layout
- Deprecation of dashboard page
- Introduction of new products & exploreproducts page
- Changes in layouts

## v9.0

- Minor bug fixes & performance improvements
- Removal of multiple workspace based subscription for a single user
- Introduction of unified user subscription
- Removal of ownerId property & introduction of new userId property
- Changes in identity passkey email template

## v8.4

- Header rendring logic changes
- Regular dependency updates
- Removal of activity module
- Introduction of new UI design
- Removal of old Product card

## v8.3

- Introduction of new Generic card
- Improved workspace experience
- Regular dependency updates & bug fixes
- Regular dependency updates & bug fixes
- Introduction of improved cache busting mechanism

## v8.2

- Removed monthly subscription plans
- Added yearly subscription plans
- Minor bug fixes and performance improvements
- Regular Dependency Updates
- New develop branch
- New dev environment integration

## v8.1

- Changes in styling
- Code refactoring
- Introduction of grid component
- Removal of project dependency in insights
- Removal of db dependency in fabric
- Added Client credentials as new way of authentication for fabric & insights
- Added new component based styling system

## v8.0

- Minor overall UI Changes
- Bug fixes and Performance improvements
- Payment gateway UI Changes
- Prompt UX improvements
- Rebranding of Checkout page as Pay page
- Update prompt implementation to make to value a required field

## v7.4

- Fix issue - unable to create a project in insights
- Fix issue - unable to create a db in fabric
- Adeed dynamic details - plans page
- Reuse of pricing component in plans page
- Renaming apps api-server, ui-client
- Regular dependency updates

## v7.3

- Added new pricing page for unauthorized view
- Regular dependency updates
- Minor changes & bug fixes
- Introduction of API response delay in hobby plan
- Limiting 3 workspaces per user

## v7.2

- Removal of one time trial plan and introduction of Free plan
- Introduction of new interactive pricing plans
- UI & API Codebase refactoring
- Regular dependency updates & bug fixes
- Replacement of moment with date-fns library
- Removal of lodash.debounce
- Added new usehooks library

## v7.1

- Introduction of new subscription plans
- Introduction of new checkout page
- Introduction of 4 new transaction gateways
- Regular dependency updates
- Introduction of new monorepo architecture
- Introduction of Generative AI - Google Gemini LLM based application
- Code refactoring & bug fixes

## v7.0

- Custom global confirm provider
- Custom global prompt provider
- Minor design changes in Apps - Ledgerscan & Wallet
- Updated email template
- Adding more strict typescript
- Code refactoring
- Restructure contract application

## v6.4

- Better error handlings with suspense
- Minor changes & performance improvements
- Rebranding of Pay as Wallet
- Rebranding & Redesigned UI
- Code cleanup
- Introduction of new transaction gateway

## v6.3

- Deprecation of separate transation gateways for modules
- Regular dependency updates & bug fixes
- Removed framer motion
- Code refactoring
- Removed dbId conflict in fabric databases
- Removed projectId conflict in insights projects

## v6.2

- Node Dependency updates
- Migratred some more components into RSC architecture
- Bug fixes and performance improvements
- Fixed all activity not displayed issue

## v6.1

- Migrated some more components to RSC Architecture
- Introduction of useCallback and useMemo hook for rendering lists and cards in all components
- New Card Component
- Introduction of new Suspense Component
- Introduction of Tanstack query default options
- Component new naming convention

## v6.0

- Tanstack query dependency modifications
- Introduction of new suspense component with fallback ui
- Deprecated Show component
- Added strict types to functions, constants, returns
- Fix resubscribe issue

## v5.3

- Introduction of Data Quality Standard in Datalake
- Changed header icon and link positions
- Minor bug fixes and performance improvements
- Introduction of new auth layout using Next 14 Route Group Layouts
- Removed legacy Identity Provider
- Restructure API methods
- Fix key warning issue

## v5.2

- UI Overhaul with new design
- Introduction of live activities
- Component specific types introduction
- Migrated layouts & some components to RSC Architecture
- Introduction of new style provider
- Performance Optimization & Code refactoring
- Dashboard changes
- Dependency updates
- Bug fixes & Performance improvements

## v5.1

- Fix header links alignment issue
- Added wall on products page when user is not subscribed
- Migrated Redis from AWS to Azure
- Fix APIKey not removed after switching workspace

## v5.0

- Removed dependency on Quicknode, Infura and Alchemy from UI
- Deprecated method getSecretConfig as configs are no longer required to be exposed
- Moved NPA wallet address to UI Constants
- Renamed schema and models of products with more generic names
- Eliminated the CreateDatabase Page in Fabric & added the functionality in prompt modal
- Renamed Insights clientId to projectId and clientSecret to projectPasskey

## v4.4

- Minor changes and bug fixes
- Modified the prompt modal to accept string values & make more reusable
- Eliminated the CreateProject Page in Insights & added the functionality in prompt modal
- New customized button UI
- Minor bug fixes and UI Performance improvements
- Minor bug fixes and performance improvements

## v4.3

- Code refactoring
- Generic SensitiveInfoPanel component to use across the app
- Added credentials by default in workspace instead of subscription
- Introduction of new Credential authorization with Client Id and Client Secret
- Braking changes - Deprecation of API Key authorization

## v4.2

- Product config changes as per new product name standards
- API reference changes as per new product names
- Subscription configuration changes
- File naming changes as per new standard
- Dependency updates & performance improvements
- Code Refactoring

## v4.1

- Rebranding of Edgepay as Pay
- Rebranding of Swapstream as Swap
- Introduction of new & modern UI
- Migration of all mongo databases into Azure from AWS & GCP, existing Azure mongo databases remains same
- Header UI Changes
- Minor changes & performance improvements
- Minor Bug fixes

## v4.0

- Headline change on products page
- Keyboard shortcut for global search
- Rebranding of Airlake as Datalake
- Rebranding of Hyperedge as Fabric
- Rebranding of Frostlake as Insights
- Rebranding of Edgescan as Ledgerscan

## v3.3

- Fix search not being displayed on PROD
- Removed Infura secret from env and merged with infura endpoint api to achieve reusability
- Minor changes & performance improvements
- Added useCallback to display search based results for all products and dashboard
- Removed generic product page

## v3.2

- Added APIReference module replacing Documentation module
- Added global search - UI
- Rebranding of Apps as Products with No Braking API Changes
- Added similar search feature as Airlake in Dashboard, Frostlake, Hyperedge, Snowlake, Swapstream - API & UI
- Minor code refactoring

## v3.1

- UX Improvements
- Client directory structural changes
- Replaced Infura with Alchemy Gateway for Swapstream to distribute load
- Replaced Infura with Quicknode Gateway for Snowlake to distribute load
- Added Quicknode & Alchemy Gateway
- Created DTO for all controllers wherever required to avoid raw data extraction from request body
- Code refactoring
- APIReference updates for products API as per new API Routes
- Braking API Changes - Added products as prefix on each product api

## v3.0

- Introduction of workspaces
- Integrated workspaces with UI
- Removed owner field from app transactions and entities and added workspaceId to separate workspaces
- Fixed some UI issues where subscription not updated after switching workspace or new subscription

## v2.3

- Deprecated getUsageByWorkspaceId api as data is already available in userdetails api
- Added 2 more parameters in the appstate object
- UI Code Refactoring
- Replaced dbRegion field from Platformconfig with appCategory
- App Category based image for generic app card
- Move Swapstreamtokenconfig to DB
- Fixed issus related to new subscription
- Fixed minor issues in UI

## v2.2

- Resolve the problem of automatic subscription deletion upon expiration
- Rectify the issue causing the API key to change with every subscription renewal
- Incorporate the workspace object within user details for display on the subscription page
- Include the workspace name in the context for improved user experience
- Implement the automatic creation of a default workspace for new users
- Code optimizations, removed userdetails api call method on subscription & workspace changes
- Added refreshId to revalidate API and update context

## v2.1

- Introduction of generic hero component
- Documentation UI changes
- New & Modern Dark UI layout for Platform & all app Home Page
- Fixed framer motion animation issue on header
- Minor UX imporvements & code refactoring
- Fixed user registration issues
- Changes in authentication params, no requirements of name

## v2.0

- UI Design Changes
- Documentation Changes
- Removed Tx records from Decentralized apps
- Removed APIKey dependency from request body and added in header with x-api-key
- Fix Hyperedge db view security issue, added dbPassword field as mandatory
- Removed apiKey from dto as that is no more used in controller/services and only in middleware

## v1.4

- Rebranded Vuelock to Hyperedge
- Rebranded Dwallet to Edgepay
- Implemented significant Performance & Security Enhancements - Eliminated the need for recalculating APIKey dependency from the DB
- Implemented Minor Enhancements to the Identity Provider
- Implemented Minor Performance Improvements

## v1.3

- Conducted Codebase Refactoring, eliminating unnecessary components
- Significantly Upgraded Platform API Key Authorizer, enhancing performance and removing the need for API credits calculation
- Added the remainingCredits field in the subscription to prevent recalculation
- Eliminated the findUsageByAPIkey method from apps
- Implemented a Global 401 handler on the platform

## v1.2

- Scaled Subscription charges and replaced tokens used with credits
- Merged Subscription & Usage Module with API Changes
- Introduced the new key database manager app - Hyperedge
- Implemented Minor Bug Fixes & Performance Improvements
- Conducted Major Dependency Upgrades
- Upgraded Platform Authorization system significantly, enhancing performance
- Modified error handling with the new Tanstack query
- Conducted Major Codebase Refactoring
- Added Generic Documentation

## v1.1

- Implemented Breaking API Changes in Airlake Data API
- Made Minor Visual Enhancements
- Re-architected the backend APIs with a New Tech Stack, introducing Nest JS to replace Express
- Introduced Dwallet and Swapstream
- Implemented a Direct and Faster Ethereum Payment System, removing the dependency on ERC-20
- Implemented Major Visual Enhancements
- Introduced the new Passkey based Identity Provider for IAM replacing the legacy Auth Provider
- Conducted Bug Fixes on the API key authorizer & optimized the code
- Introduced AuthProvider, replacing Auth HOC & Auth Page
- Implemented Advanced Cache Controls
- Changed Technology Stack - Introduced Next JS, replacing CRA

## v1.0

- Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
- Introduced subscribe and unsubscribe based on the conversion of Ether to ERC-20 token transfer
- Introduced subscription & subscription key based on Ethereum payment
- Integrated Airlake - Dataset Marketplace (previously a separate app) into the Platform
- Introduced the new Platform
- Introduced Auth HOC for authorization within the App
- Implemented Advanced Cache Controls
- Introduced Auth HOC for authorization within the App
