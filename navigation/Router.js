import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SplashScreen from '../screens/splash-screen';
import LoginScreen from '../screens/login-screen';
import HomeScreen from '../screens/home-screen';
import PaymentScreen from '../screens/pay-screen';

const AppNavigator = createStackNavigator({

    Splash: SplashScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Payment: PaymentScreen,

}, {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
        header: null

    },

});

export default createAppContainer(AppNavigator);