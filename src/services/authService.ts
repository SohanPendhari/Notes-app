import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo: any = await GoogleSignin.signIn();
    console.log('USER INFO:', userInfo); // 👈 ADD THIS

    const tokens = await GoogleSignin.getTokens();
    console.log('TOKENS:', tokens); // 👈 ADD THIS

    return tokens.accessToken;
  } catch (error) {
    console.log('FULL ERROR:', error); // 👈 IMPORTANT
    return null;
  }
};
