import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {View, Text} from 'react-native';
import { useColorScheme } from 'react-native';
import {  BLACK_COLOR, YELLOW_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";

    return  (
        <Tab.Navigator 
        sceneContainerStyle={{
            backgroundColor: isDark ? "#1e272e" : "white",
        }}
        screenOptions={{
            unmountOnBlur: true,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight:"600"
            },
            headerShown: false,
        }}>
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: ({focused, color, size}) => {return <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />}
            }} /> 
            <Tab.Screen name="Tv" component={Tv} options={{
                tabBarIcon: ({focused, color, size}) => {return <Ionicons name={focused ? "tv" : "tv-outline"} size={size} color={color} />}
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => {return <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />}
            }}/>
        </Tab.Navigator>
    )
}
    

export default Tabs;