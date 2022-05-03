import * as React from 'react';
import {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Slides from './components/Slides'
import Home from './components/Home'
import Workout from './components/Workout'
import Exercise from './components/Exercise'
import ActiveWorkout from './components/ActiveWorkout'
import Diet from './components/Diet'
import AddMeal from './components/AddMeal'
import Meal from './components/Meal'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function WORKOUTS({navigation, route}) {
    const [workouts,setWorkouts] = useState(<Stack.Navigator>
        <Stack.Screen name="WORKOUTS" component={Home}/>
        <Stack.Screen name="WORKOUT" component={Workout} options={({ route }) => ({ title: route.params.workout.toString().toUpperCase() + ' WORKOUT'})}/>
        <Stack.Screen name="EXERCISE" component={Exercise} options={{headerShown:false}} />
        <Stack.Screen name="ActiveWorkout" component={ActiveWorkout} options={{headerShown: false}}/>
    </Stack.Navigator>)
    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName != "EXERCISE" && routeName != "Slides" && routeName != "ActiveWorkout"){
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }else {
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }
        // if(AsyncStorage.getItem('x1asdasd') === 4) {
        //     setWorkouts(<Stack.Navigator>
        //         <Stack.Screen name="WORKOUTS" component={Home}/>
        //         <Stack.Screen name="WORKOUT" component={Workout} options={({ route }) => ({ title: route.params.workout.toString().toUpperCase() + ' WORKOUT'})}/>
        //         <Stack.Screen name="EXERCISE" component={Exercise} options={{headerShown:false}} />
        //     </Stack.Navigator>)
        // }
    }, [navigation, route]);
    return (workouts);
}

function DIETSTACK({navigation,route}) {
    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName != "Meal"){
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }else {
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dieting" component={Diet}/>
            <Stack.Screen name="Add Meal" component={AddMeal}/>
            <Stack.Screen name="Meal" component={Meal} options={{headerShown: true}}/>
        </Stack.Navigator>
    );
}

function TabStack({navigation, ruote }) {
    return (
        <Tab.Navigator screenOptions={ ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Workout') {
                    iconName = focused
                        ? 'barbell-sharp'
                        : 'barbell-sharp';
                } else if (route.name === 'Dieting') {
                    iconName = focused ? 'restaurant' : 'restaurant';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#EF223B',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}>
            <Tab.Screen name="Workout" component={WORKOUTS}  />
            <Tab.Screen name="Dieting" component={DIETSTACK} />
        </Tab.Navigator>
    )
}

export default function App() {
    const [loggedIn, changeLoggedIn] = useState(null)
    AsyncStorage.getItem('userId').then(res => {
        changeLoggedIn(res)
        console.log(loggedIn)
    })
    return (
      <NavigationContainer>
          {loggedIn ?
              <Stack.Navigator>
                  <Stack.Screen name="TabStack" component={TabStack} options={{headerShown:false}} />
                  <Stack.Screen name="Create Account" component={SignUp} />
                  <Stack.Screen name="Login" component={SignIn} />
              </Stack.Navigator> :
              <Stack.Navigator>
                  <Stack.Screen name="Slides" component={Slides} options={{headerShown:false}} />
                  <Stack.Screen name="TabStack" component={TabStack} options={{headerShown:false}} />
                  <Stack.Screen name="Create Account" component={SignUp} />
                  <Stack.Screen name="Login" component={SignIn} />
              </Stack.Navigator> }
      </NavigationContainer>
  );
}
