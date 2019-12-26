import React, {Component} from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import StreamScreen from './screens/Stream';
import SearchScreen from './screens/Search';
import ProfileScreen from './screens/Profile';
import ChiTiet_PlayListOnlineScreen from './screens/ChiTiet_PlayListOnlineScreen'
import ChiTiet_PlayListOfflineScreen from './screens/ChiTiet_PlayListOffline'
import LibraryScreen from './screens/Library';
import ForgotPassScreen from './screens/ForgotPass'
import SongScreen from './screens/Song';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon_ from 'react-native-vector-icons/FontAwesome5';


import store from './redux/store';
import {Provider} from 'react-redux';

//#region Stack
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    ChiTiet_PlayListOnline :ChiTiet_PlayListOnlineScreen
  },
  {
    //headerMode: 'non',
  },
);
const SearchStack = createStackNavigator({
  Search: SearchScreen,

  // Song: SongScreen,
});
const StreamStack = createStackNavigator({
  Stream: StreamScreen,
  // Song: SongScreen,
});
const LibraryStack = createStackNavigator({
  Library: LibraryScreen,
  ChiTiet_PlayListOffline :ChiTiet_PlayListOfflineScreen
  // Song: SongScreen,
});
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  // Song: SongScreen,
});
//#endregion

//createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
const Tabs = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Stream: StreamStack,
    Library:LibraryStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor}) => {
          const {routeName} = navigation.state;
          let iconName = 'home';
          if (routeName === 'Home') {
            iconName = 'home';
          } else if (routeName === 'Stream') {
            iconName = 'headphones-alt';
          } else if (routeName === 'Search') {
            iconName = 'search';
          } else if (routeName === 'Profile') {
            iconName = 'id-card';
          }
          else if (routeName === 'Library') {
            iconName = 'list-alt';
          }

          return (
            <Icon_
              name={iconName}
              size={25}
              
              color={tintColor}
              style={{marginTop: 5, marginRight: 3}}
            />
          );

          /*return iconName === 'search' ? (
                    <MaterialIcons name={iconName} size={25} color={tintColor} />
                ) : (
                        <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
                    );*/
        },

        tabBarOptions: {

          activeTintColor: 'red',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#fff',
          borderColor:'#000',
        },
      };
    },
  },
);

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPass:ForgotPassScreen,

  // Song: SongScreen,
});

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
      
    },
    
      ForgotPass: {
        screen: ForgotPassScreen,
        navigationOptions: {
          header: "Quên mật khẩu",
        },
        
      },


    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'non',
  },
);

/*const Switch = createSwitchNavigator(
    {
        Login: LoginScreen,
        Home: Tabs,
    },
    {
        initialRouteName: 'Login',
    },
);*/

const AppContainer = createAppContainer(RootStack);
export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
