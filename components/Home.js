import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from 'axios';

export default function Home({navigation}) {
    const [workouts, setWorkouts] = useState([])
    const showExercise = (exercise) => {
        navigation.navigate('WORKOUT', { workout: exercise })
    }
    const startWorkout = (workout) => {
        navigation.navigate('ActiveWorkout', { workout: workout })
    }
    useEffect(()=>{
        axios.get(`http://192.168.0.102:3000/api/workout`).then((res) => {
            setWorkouts(res.data)
        });
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1, paddingLeft: '4%', paddingRight: '4%', overflow: 'visible'}}>
                <View style={{marginTop: 12}}>
                    {workouts ? workouts.map((workout, index) => {
                        return (
                            <View key={index} style={{width: '100%',  shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 1, borderRadius: 8, backgroundColor : "rgba(0,0,0,0)", marginBottom: 12}}>
                                <ImageBackground imageStyle={{ borderRadius: 8}} style={styles.workoutContainer} source={require('../assets/images/slide3.jpeg')}>
                                    <TouchableOpacity onPress={() => showExercise(workout.name)} style={styles.workoutTextContainer}>
                                        <Text style={styles.workoutTitle}>{workout.name} WORKOUT</Text>
                                        <View style={styles.exerciseInfo}>
                                            <Text style={styles.workoutText}>{workout.exercises} Exercises</Text>
                                            <Text style={styles.workoutText}>{workout.duration} Minutes</Text>
                                        </View>
                                        <TouchableOpacity style={styles.nextButton} onPress={() => startWorkout(workout.name)}>
                                            <Ionicons name={'play'} size={22} color={'white'} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        )
                    }) : null}
                </View>
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'space-between',
        // padding: '5%',
    },
    workoutContainer: {
        width: '100%',
        height: 200,
    },
    exerciseInfo: {
        display: 'flex',
        flexDirection: 'row',
    },
    workoutTextContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .35)',
        justifyContent: 'flex-end',
        borderRadius: 8,
        padding: 16,
    },
    workoutTitle: {
        fontSize: 22,
        color: 'white',
        marginBottom: 6,
    },
    workoutText: {
        fontSize: 14,
        color: 'white',
        marginRight: 16,
    },
    nextButton: {
        // backgroundColor: '#EF223B',
        borderColor: 'white',
        borderWidth: 1.5,
        overflow: 'hidden',
        borderRadius: 48,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 10,
        position: 'absolute',
        bottom: 14,
        right: 14,
    },
});
