# Doctor Apps
StarWars communication apps

## Preview
- iOS: 
- Android: 

## Prerequisites
#### Common
- nodeJS (v18)
- yarn
- watchman

#### Android
- JDK 17
- Android Studio
- Android SDK

#### iOS
- Xcode
- CocoaPods

## Running Apps
Please navigate to root project.

#### Installing

First install NPM dependencies:

> yarn install

Then, install iOS dependencies:
> cd ios && pod install

#### Run on Android
Open your emulator with Android Studio or connect your Android device to your machine.

Then, simply run:
> yarn android

#### Run on iOS
Open your simulator. Then, simply run:
> yarn ios

## Key Dependencies
This section will list down all dependencies and explain pro's and con's

#### react-native-bootsplash
This package is to maintain the splashscreen / bootsplash for the app. It works for Android and iOS natively and easy to set up.
The drawbacks for this package is unable to create a complex exit animation but fade animation.

#### react-navigation
This package is required to enable navigation in react native app. This navigation lib is the most use of the others.
It's easy to use and the concept is quite simple. In the latest version, It also already support for native navigation.
The drawback is this navigation library wasn't implemented from native at first place. So the integration with native is done by the hacky way.

#### zustand
A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated.

## Improvements
- 

## Production
- Create .env based on release / build variant.
- Need to handle certificates for each store.
- Provide banners for stores
- Enable proguard if needed

## Assumptions
- 

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
