import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from "axios";

export default function ActiveWorkout({route, navigation}) {
    const workoutName = route.params.workout
    const [exercises, setExercises] = useState([])
    const [currentExercise, setCurrentExercise] = useState(0)
    const [timerState, setTimerState] = useState(false)
    const [timeLeft, setTimeLeft] = useState(60)
    const [setsLeft, setSetsLeft] = useState(0)
    const [myInterval, setMyInterval] = useState(0)
    const [myTimeout, setMyTimeout] = useState(0)
    const goBack = () => {
        navigation.navigate('WORKOUTS')
    }
    const decreaseSet = () => {
        if(setsLeft === 1) {
            console.log(currentExercise)
            console.log(exercises.length)
            if(currentExercise + 1 < exercises.length) {
                setSetsLeft(exercises[currentExercise + 1].sets)
            }
            setCurrentExercise(currentExercise => currentExercise + 1)
        }
        clearInterval(myInterval)
        setSetsLeft(setsLeft => setsLeft - 1)
        setTimerState(false)
        setTimeLeft(60)
    }
    const startTimer = () => {
        setTimerState(timer => !timer)
        setMyInterval(setInterval( () => {
            setTimeLeft(timeLeft => timeLeft - 1)
        },1000))
        setMyTimeout(setTimeout(()=> {
            skipRest()
        }, timeLeft * 1000))
    }
    const skipRest = () => {
        clearTimeout(myTimeout)
        decreaseSet()
    }
    useEffect(()=> {
        navigation.setOptions({tabBarStyle: {display: 'false'}});
        console.log(workoutName)
        axios.get(`http://192.168.0.102:3000/api/workout/${workoutName}`).then((res) => {
            // only monday for now gonna figure this out later
            setExercises(res.data[0].workout)
            setSetsLeft(res.data[0].workout[0].sets)
            console.log(res.data[0].workout)
        });
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.sliderImage} source={require('../assets/images/Squat.jpeg')}>
                <View style={styles.imageFilter}>
                    {exercises && exercises.length > 0 && currentExercise < exercises.length ?
                        !timerState ?
                            <View key={currentExercise} style={{width: '75%'}}>
                                <View>
                                    <Text style={styles.exerciseTitle}>{exercises[currentExercise].name}</Text>
                                    <Text style={styles.exerciseDescription}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua.</Text>
                                    <View style={styles.exerciseInfo}>
                                        {/*<Text style={{fontSize: 16}}>4 Sets</Text>*/}
                                        {/*<Text style={{fontSize: 16}}>12 Reps</Text>*/}
                                        <View>
                                            <Text style={{fontSize: 34, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>{setsLeft}</Text>
                                            <Text style={{color: 'white', textAlign: 'center'}}>Sets</Text>
                                        </View>
                                        <View style={{ width: 1, height: '100%', backgroundColor: 'white', opacity: 1 }}></View>
                                        <View>
                                            <Text style={{fontSize: 34, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>{exercises[currentExercise].reps}</Text>
                                            <Text style={{color: 'white', textAlign: 'center'}}>Reps</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            : <CircularProgress
                                value={timeLeft}
                                radius={120}
                                valueSuffix={''}
                                title={''}
                                subtitle={''}
                                activeStrokeColor={'white'}
                                inActiveStrokeColor={'white'}
                                inActiveStrokeOpacity={0.25}
                                textStyle={{fontSize: 48}}
                                titleFontSize={16}
                                activeStrokeSecondaryColor={'white'}
                            />
                         : null}
                    {currentExercise >= exercises.length ?
                        <View style={{padding: '6%', display:'flex', flex: 1, height: '70%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <Ionicons name={'checkmark-circle'} size={256} color={'white'} />
                                <Text style={{color: 'white', textAlign: 'center', fontSize: 24, marginBottom: 24, fontWeight: 'bold'}}>WORKOUT FINISHED</Text>
                                <Text style={{color: 'white', textAlign: 'center', fontSize: 16, lineHeight: 21}}>Congratulations on finishing your workout. Now its time to get to the kitchen and cook up a very delicious and nutritious meal!</Text>
                            </View>
                            <TouchableOpacity onPress={() => goBack()} style={styles.finishButton}>
                                <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Finish Workout</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
                <TouchableOpacity style={{position: 'absolute', top: '6%', left: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} onPress={() => goBack()}>
                    <Ionicons name={'chevron-back'} size={28} color={'white'} />
                </TouchableOpacity>
                {currentExercise < exercises.length ?
                    <View style={{position: 'absolute', bottom: 16, paddingLeft: '5%', paddingRight: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <TouchableOpacity>
                            <Text style={{color: 'white'}}>Skip Exercise</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => !timerState ? startTimer() : skipRest()} style={styles.nextButton}>
                            <Text style={{fontSize: 16, color: 'black'}}>{ !timerState ? 'Finish Rep' : 'Skip Rest'}</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            </ImageBackground>
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
        // padding: '5%',
    },
    sliderImage: {
        width: '100%',
        flex: 1,
    },
    imageFilter: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .35)',
    },
    exerciseTitle: {
        fontSize: 42,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    exerciseDescription: {
        marginBottom: 28,
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        textAlign: 'center',
    },
    exerciseInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    nextButton: {
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 27,
        paddingRight: 27,
    },
    finishButton: {
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 25,
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // width: '100%',
        // paddingLeft: '5%',
        // paddingRight: '5%',
        // marginBottom: 16,
    },
});
