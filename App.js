// App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { View, Text, ActivityIndicator } from 'react-native';
import { fonts } from './src/theme';



import Welcome1          from './src/screens/Welcome1';
import Welcome2          from './src/screens/Welcome2';
import Welcome3          from './src/screens/Welcome3';
import Login1            from './src/screens/Login1';
import ForgotPin         from './src/screens/ForgotPin';
import OtpVerification   from './src/screens/OtpVerification';
import SignUp            from './src/screens/SignUp';
import HomeScreen       from './src/screens/HomeScreen';
import ClothingScreen   from './src/screens/ClothingScreen';
import MenuScreen        from './src/screens/MenuScreen';
import RateAppScreen    from './src/screens/RateAppScreen';
import ProfileScreen    from './src/screens/ProfileScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import FAQScreen        from './src/screens/FAQScreen';
import TermsScreen      from './src/screens/TermsScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import SettingsScreen   from './src/screens/SettingsScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ElectronicsScreen from './src/screens/ElectronicsScreen'
import CosmeticsScreen from './src/screens/CosmeticsScreen';
import KidsScreen from './src/screens/KidsScreen';
import FitnessScreen from './src/screens/FitnessScreen';
import HomemadeScreen from './src/screens/HomemadeScreen';
import OrganicFoodScreen from './src/screens/OrganicFoodScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import GroceryScreen from './src/screens/GroceryScreen';
import FurnitureScreen from './src/screens/FurnitureScreen';
import AuthLoading from './src/screens/AuthLoading';
import EditProfile from './src/screens/EditProfile';


import OrderScreen from './src/screens/OrderScreen';

import { CartProvider } from './src/context/CartContext';




const Stack = createNativeStackNavigator();

export default function App() {
   const [fontsLoaded, setFontsLoaded] = useState(false);

 useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
        'Poppins-Medium':  require('./assets/font/Poppins-Medium.ttf'),
        'Poppins-SemiBold':require('./assets/font/Poppins-SemiBold.ttf'),
        'Poppins-Bold':    require('./assets/font/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);


  if (!fontsLoaded) {
      return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <CartProvider>

    <NavigationContainer>
      {/* Use the StatusBar component to control the status bar style */}
      <StatusBar style="dark" />

      <Stack.Navigator
        initialRouteName="Welcome1"
        screenOptions={{ headerShown: false }}
      >
        {/* Onboarding Slides */}
          <Stack.Screen name="AuthLoading" component={AuthLoading} />

        <Stack.Screen name="Welcome1" component={Welcome1} />
        <Stack.Screen name="Welcome2" component={Welcome2} />
        <Stack.Screen name="Welcome3" component={Welcome3} />

        {/* Authentication Flow */}
        <Stack.Screen name="Login1" component={Login1} />
        <Stack.Screen name="ForgotPin" component={ForgotPin} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Main Application */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ClothingScreen" component={ClothingScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
       
       

      
       {/* Menu options */}

        <Stack.Screen name="RateAppScreen" component={RateAppScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
        <Stack.Screen name="FAQScreen" component={FAQScreen} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} />
        <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
        <Stack.Screen name="LogoutScreen" component={LogoutScreen} />

      {/* category details */}
       <Stack.Screen name="ElectronicsScreen" component={ElectronicsScreen} />
       <Stack.Screen name="CosmeticsScreen" component={CosmeticsScreen} />
       <Stack.Screen name="KidsScreen" component={KidsScreen} />
       <Stack.Screen name="FitnessScreen" component={FitnessScreen} />
       <Stack.Screen name='HomemadeScreen' component={HomemadeScreen}/>
       <Stack.Screen name='OrganicFoodScreen' component={OrganicFoodScreen}/>
       <Stack.Screen name='GroceryScreen' component={GroceryScreen}/>
       <Stack.Screen name='MedicineScreen' component={MedicineScreen}/>
       <Stack.Screen name='FurnitureScreen' component={FurnitureScreen}/>



      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>

  );
}