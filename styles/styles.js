import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

const StylesGlobal = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
    },
    h1:{
        fontSize:24,
        fontFamily:'sdsdadadsad'
    },
    btn:{

    },
   
});

export default StylesGlobal;