# Inex - mobile app for expenses

## 1.1.1

- updated infoPlist

## v1.1.0

- added AppsFlyer
- added Onelink & AASA
- bug fixed with date picker
- added testing events

## v1.0.3

- changed notification button behavior
- changed category btn style

## v1.0.2

- changed notification text message
- changed EnterValue buttons

## v1.0.1

- changed notification behavior
- fixed screens lags
- increased some buttons tuch area

# Dev Commands

Build broject for App Store:
eas build --platform ios

Start project in simulator:
npx expo start

# AppsFlyer installations and settings:

## Install AppsFlyer

npx expo install expo-dev-client
npx expo install react-native-appsflyer
npx expo install expo-tracking-transparency

## Add react-native-appsflyer into the plugins array inside the app.json

"plugins": [
[
"react-native-appsflyer",{}
]
],

## Create build for ios emulator

eas build --profile development-simulator --platform ios

## Move downloaded app to simulator screen

npx expo start --dev-client

## Implement AppsFlyer setup code

import appsFlyer from 'react-native-appsflyer';
... appsFlyer.initSdk...

# Deep linking

## Info:

Helpful links:
https://engineering.razorpay.com/deep-linking-with-our-react-native-app-9cbee7fdcbd7
https://www.appsflyer.com/resources/guides/deep-linking-for-developers/
https://github.com/AppsFlyerSDK/appsflyer-react-native-plugin/tree/master/Docs
https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html
https://reactnative.dev/docs/linking
https://www.patterns.dev/posts/provider-pattern
https://reactnavigation.org/docs/deep-linking/
for IOS AASA - https://reactnative.dev/docs/linking#enabling-deep-links

## Setup Onelink in Appsflyer account

Add to Onelink:
Team ID: https://developer.apple.com/account #membership
BundleId: https://developer.apple.com/account/resources/identifiers/bundleId/

\*AASA file will created automaticaly with Onelink

Validate AASA: https://branch.io/resources/aasa-validator/

## Add Onelink settings to app.json file

ios: {
...,
"associatedDomains": ["applinks:inexbudget.onelink.me"]
}

## Install module react-native-branch

npx expo install react-native-branch @config-plugins/react-native-branch

## Handle deep-linking

...

## Testing

...
