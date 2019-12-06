import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SplashScreen from '../screens/splash-screen';
import LoginScreen from '../screens/login-screen';
import HomeScreen from '../screens/home-screen';
import PaymentScreen from '../screens/pay-screen';
import OfertScreen from '../screens/oferts-screen';
import MapsScreen from '../screens/maps-screen';
import AddRentScreen from '../screens/add-rent-screen';
import InfoProductScreen from '../screens/info-product-screen';
import MyAccountScreen from '../screens/my-accoutn-screen';

const AppNavigator = createStackNavigator({

    Splash: SplashScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Payment: PaymentScreen,
    Ofert: OfertScreen,
    Maps: MapsScreen,
    AddProducto:AddRentScreen,
    InfoProduct:InfoProductScreen,
    Account: MyAccountScreen

}, {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
        header: null

    },

});

export default createAppContainer(AppNavigator);