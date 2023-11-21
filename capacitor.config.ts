import { CapacitorConfig } from '@capacitor/cli';
import { SplashScreen } from '@capacitor/splash-screen';

const config: CapacitorConfig = {
  appId: 'com.invsys.pilatesbymary',
  appName: 'pilatesbymary',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
  SplashScreen:{
    launchShowDuration:2000,
    backgroundColor:"#C8DBF7",
    showSpinner:true,
    androidSpinnerStyle:"small",
    iosSpinnerStyle:"small",
    splashFullScreen:true,
    splashImmersive:true
  },
  PushNotifications:{
    presentationOptions:["badge", "sound", "alert"],
  }
}
};


export default config;
