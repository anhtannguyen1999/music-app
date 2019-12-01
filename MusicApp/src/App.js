import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import StreamScreen from './screens/Stream';
import SearchScreen from './screens/Search';
import ProfileScreen from './screens/Profile';
import SongScreen from './screens/Song';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


//#region Stack
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    //Song: SongScreen,
});
const SearchStack = createStackNavigator({
    Search: SearchScreen,
   // Song: SongScreen,
});
const StreamStack = createStackNavigator({
    Stream: StreamScreen,
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
        Profile: ProfileStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigations.state;
                let iconName = 'home';
                if (routeName === 'Home') {
                    iconName = 'home';
                } else if (routeName === 'Stream') {
                    iconName = 'flash';
                } else if (routeName === 'Search') {
                    iconName = 'search';
                } else if (routeName === 'Profile') {
                    iconName = 'account';
                }

                // return <Icon name='soundcloud' size={25} color={'#F02'} />;

                return iconName === 'search' ? (
                    <MaterialIcons name={iconName} size={25} color={tintColor} />
                ) : (
                        <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
                    );
            },
        }),
        tabBarOption: {
            activeTintColor: '#000',
            inactiveTintColor: '#000',
            activeBackgroundColor: '#000',
            showLabel: true,
            style: {
                backgroundColor: '#000',
            },
        },
    },
);

const RootStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
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

//const AppContainer = createAppContainer(Switch);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
