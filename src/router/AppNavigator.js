import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import SafeArea from 'components/SafeArea';
import AddNumberScreen from 'screens/AddNumber';
import CallingScreen from 'screens/Calling';
import ContactsScreen from 'screens/Contacts';
import DialKeypadScreen from 'screens/Dialing';
import EditContactScreen from 'screens/EditContact';
import FiltersScreen from 'screens/Filters';
import OnboardingScreen from 'screens/Onboarding';
import SlidesScreen from 'screens/Onboarding/Slides';
import RecentCallsScreen from 'screens/RecentCalls';

import SearchScreen from 'screens/Search';

import { isAndroid } from 'utils/helpers';

import { TabBar } from './TabBar';

// import HomeScreen from 'Screens/HomeScreen';
// import CallScreen from 'Screens/CallScreen/CallScreen';
// import CompanyListScreen from 'Screens/CompanyListScreen/CompanyListScreen';
// import SearchScreen from 'Screens/SearchScreen';
// import FreeCallScreen from 'Screens/FreeCallScreeen/FreeCallScreen';

// const AppNavigator = createStackNavigator(
//   {

//     Home: HomeScreen,
//     Search: SearchScreen,
//     CompanyList: CompanyListScreen,
//     Call: CallScreen,
//     FreeCall: FreeCallScreen,
//   },
//   {
//     headerMode: 'none',
//   },
// );

const OnboardingStack = createStackNavigator();
const OnboardingScreens = () => (
  <OnboardingStack.Navigator headerMode="none">
    <OnboardingStack.Screen name="Onboarding" component={OnboardingScreen} />
    <OnboardingStack.Screen
      name="Slides"
      component={SlidesScreen}
      options={{ animationEnabled: false }}
    />
  </OnboardingStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchScreens = () => (
  <SearchStack.Navigator headerMode="none">
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen name="Filters" component={FiltersScreen} />
  </SearchStack.Navigator>
);

const DialStack = createStackNavigator();
const DialScreens = () => (
  <DialStack.Navigator headerMode="none">
    <DialStack.Screen name="Dial" component={DialKeypadScreen} />
    <DialStack.Screen name="AddNumber" component={AddNumberScreen} />
  </DialStack.Navigator>
);

const ContactsStack = createStackNavigator();
const ContactsScreens = () => (
  <ContactsStack.Navigator headerMode="none">
    <ContactsStack.Screen name="ContactsList" component={ContactsScreen} />
    <DialStack.Screen name="AddContact" component={AddNumberScreen} />
    <ContactsStack.Screen name="EditContact" component={EditContactScreen} />
  </ContactsStack.Navigator>
);

const styles = StyleSheet.create({
  outterContainer: { flex: 1, backgroundColor: '#fff' },
  innerContainer: { flex: 1, backgroundColor: '#F4F4F4' },
});
const Tab = createMaterialTopTabNavigator();
const Tabs = () => {
  return (
    <View style={styles.outterContainer}>
      <SafeArea position="top" />
      <View style={styles.innerContainer}>
        <Tab.Navigator
          swipeEnabled={false}
          tabBar={props => <TabBar {...props} />}>
          <Tab.Screen name="Contacts" component={ContactsScreens} />
          <Tab.Screen name="Keypad" component={DialScreens} />
          <Tab.Screen name="Recent" component={RecentCallsScreen} />
          <Tab.Screen name="Search" component={SearchScreens} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const RootStack = createStackNavigator();
export const AppNavigator = () => {
  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
    StatusBar.setBarStyle('dark-content');
    if (isAndroid) {
      StatusBar.setBackgroundColor('#ffffff');
    }
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Onboarding" component={OnboardingScreens} />
        <RootStack.Screen name="Home" component={Tabs} />
        <RootStack.Screen name="Calling" component={CallingScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
