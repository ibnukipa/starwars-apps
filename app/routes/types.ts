// TODO: remove RootStackActions when state management is configured
export type RootStackActions = {
  signInPress?: () => void;
  signOutPress?: () => void;
};

export type RootStackParamList = {
  Home: RootStackActions;
  SignIn: RootStackActions;
  SignUp: undefined;
};
