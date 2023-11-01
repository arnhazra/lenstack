# Lenstack Changelog

### v1.8
* Major upgrade in Platform API Key Authorizer, removed api credits calculation, improved performance
* Added remainingCredits field in subscription to avoid recalculation
* Removed findUsageByAPIkey method from apps

### v1.7
* Better UX for NFT & Image Support on Snowlake
* Global 401 handler on the platform
* Major dependency upgradation
* Major upgrade in Platform Authorization system, improved performance
* Changes in error handling with new tanstack query

### v1.6
* Merge of Subscription & Usage Module & API Changes
* Introduction of new key vault manager app - Vuelock
* Minor Bux Fixes & Performance Improvements

### v1.5
* Added Generic Documentation
* Breaking API Changes in Airlake Data API
* Minor Visual Enhancements
* Subscription charges scaling & credits replacing tokens used

### v1.4
* Introduced new Passkey based Identity Provider for IAM - Lenstack Id, replacing legacy Auth Provider
* Bug Fixes on api key authorizer & code optimization
* Introduced AuthProvider replacing Auth HOC & Auth Page
* Major Codebase Refactoring

### v1.3
* Introduction of Dwallet and Swapstream
* New Direct and faster Ethereum Payment System, removed dependency on ERC-20
* Major Visual Enhancements

### v1.2
* New tech stack and rearchitecture of backend APIs, Introducted Nest JS replacing Express
* Integrated Frostlake - Analytics Platform (Previously Different App) to the Lenstack Platform
* Introduced Auth HOC for authorization within App
* Advanced cache controls

### v1.1
* Integrated Frostlake - Analytics Platform (Previously Different App) to the Lenstack Platform
* Introduced Auth HOC for authorization within App
* Advanced cache controls
* Change in Technology Stack - Introduction of Next JS replacing CRA
* Introduction of subscribe and unsubscribe based on conversion of Ether to ERC-20 token transfer
* Introducted new app Snowlake - NFT Toolkit to the Lenstack Platform

### v1.0
* Introduction of subscribe and unsubscribe based on conversion of Ether to ERC-20 token transfer
* Introduction subscription & subscription key based on ethereum payment
* Integrated Airlake - Dataset Marketplace (Previously Different App) to the Lenstack Platform
* Introduction of new Lenstack Platform