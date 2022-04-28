import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import alert from "react-native-web/dist/exports/Alert";

export default function Workout({route, navigation}) {
    const [exercises, setExercises] = useState([])
    const workoutName = route.params.workout
    const inspectExercise = (exercise) => {
        navigation.navigate('EXERCISE', {workout: workoutName, exercise: exercise})
    }
    const startWorkout = (exercise) => {
        navigation.navigate('ActiveWorkout', { workout: exercise })
    }
    useEffect(()=>{
        axios.get(`http://192.168.0.102:3000/api/workout/${workoutName}`).then((res) => {
            setExercises(res.data)
            console.log(res.data)
        });
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1, padding: '4%', marginBottom: 16}}>
                {exercises ? exercises.map((day,index) => {
                    return(
                        <View>
                            <Text key={index} style={{fontSize: 16, marginBottom: 16, fontWeight: 'bold'}}>{day.name}</Text>
                            {day.workout.map((exercise, dindex) => {
                                return (
                                    <TouchableOpacity key={index + '-' + dindex} onPress={() => inspectExercise(exercise)} style={styles.exerciseContainer}>
                                        <Image style={styles.sliderImage} source={require('../assets/images/slide1.jpg')}/>
                                        <View style={styles.exerciseText}>
                                            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                                            <Text numberOfLines={2} style={styles.exerciseBodyText}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eius mod tempor incididunt ut labore et   dolore magna aliqua.</Text>
                                            <View style={styles.exerciseInfo}>
                                                <Text style={styles.exerciseLighterText}>{exercise.sets} Sets</Text>
                                                <Text style={styles.exerciseLighterText}>{exercise.reps} Reps</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    )
                }) : null}
            </ScrollView>
            <TouchableOpacity onPress={() => startWorkout(workoutName)} style={styles.nextButton}>
                <Ionicons name={'play'} size={28} color={'white'} />
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'space-between',
      //padding: '5%',
    },
    sliderImage: {
      width: '40%',
      height: 85,
      borderRadius: 4,
      marginRight: '5%',
    },
    exerciseContainer: {
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    exerciseText: {
      width: '55%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    exerciseTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    exerciseBodyText: {
      fontSize: 13,
        marginTop: -4,
    },
    exerciseLighterText: {
      fontSize: 12,
      color: '#60646b',
    },
    exerciseInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    nextButton: {
        backgroundColor: '#EF223B',
        overflow: 'hidden',
        borderRadius: 48,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 16,
        paddingRight: 16,
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
});
