import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleLogin = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.file'],
    webClientId: '.........................',
  });
};
