import { StatusBar } from 'expo-status-bar';
import {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";

export default function Exercise({route, navigation}) {
    const workoutName = route.params.workout
    const exercise = route.params.exercise
    const goBack = () => {
        navigation.navigate('WORKOUT', {workout: workoutName})
    }
    const startWorkout = (exercise) => {
        navigation.navigate('ActiveWorkout', { workout: exercise })
    }
    useEffect(()=> {
        navigation.setOptions({tabBarStyle: {display: 'false'}});
        console.log(exercise)
    })
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.sliderImage} source={require('../assets/images/slide2.jpg')}>
                <View style={styles.imageFilter}></View>
                <TouchableOpacity style={{position: 'absolute', top: '10%', left: '5%'}} onPress={() => navigation.goBack()}>
                    <Ionicons name={'chevron-back'} size={28} color={'white'} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={{flex: 1, paddingLeft: '5%', paddingRight: '5%',paddingTop: 12, paddingBottom: '5%', justifyContent: 'space-between'}}>
                {/*<Text>{workoutName + ' ' + exerciseIndex}</Text>*/}
                <View>
                  <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                  <Text style={{ marginBottom: 24, fontSize: 16, lineHeight: 20}}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eius mod tempor incididunt ut labore et   dolore magna aliqua.</Text>
                  <View style={styles.exerciseInfo}>
                      {/*<Text style={{fontSize: 16}}>4 Sets</Text>*/}
                      {/*<Text style={{fontSize: 16}}>12 Reps</Text>*/}
                      <View>
                          <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#EF223B'}}>{exercise.sets}</Text>
                          <Text style={{color: 'black', textAlign: 'center'}}>Sets</Text>
                      </View>
                      <View>
                          <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#EF223B'}}>{exercise.reps}</Text>
                          <Text style={{color: 'black', textAlign: 'center'}}>Reps</Text>
                      </View>
                      <View>
                          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                              <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#EF223B'}}>10</Text>
                              <Text style={{color: 'gray', textAlign: 'center', paddingBottom: 4, paddingLeft: 4}}>Min</Text>
                          </View>
                          <Text style={{color: 'black', textAlign: 'center'}}>Duration</Text>
                      </View>
                      <View>
                          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                              <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#EF223B'}}>1</Text>
                              <Text style={{color: 'gray', textAlign: 'center',  paddingBottom: 4, paddingLeft: 4}}>Min</Text>
                          </View>
                          <Text style={{color: 'black', textAlign: 'center'}}>Rest time</Text>
                      </View>
                  </View>
                    {/*<View style={styles.exerciseInfo}>*/}
                    {/*    <View style={styles.exerciseInfo}>*/}
                    {/*        <View style={{padding: 10, borderRadius: 6, backgroundColor: 'rgba(239,34,59,0.25)', marginRight: 12}}>*/}
                    {/*            <Ionicons name={'bonfire'} size={32} color={'#ff2b45'} />*/}
                    {/*        </View>*/}
                    {/*        <View>*/}
                    {/*            <Text style={{fontSize: 22, fontWeight: 'bold'}}>80</Text>*/}
                    {/*            <Text style={{color: 'gray'}}>Calories</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={styles.exerciseInfo}>*/}
                    {/*        <View style={{padding: 10, borderRadius: 6, backgroundColor: 'rgba(255,209,43,0.25)', marginRight: 12}}>*/}
                    {/*            <Ionicons name={'timer'} size={32} color={'#ffd12b'} />*/}
                    {/*        </View>*/}
                    {/*        <View>*/}
                    {/*            <Text style={{fontSize: 22, fontWeight: 'bold'}}>5</Text>*/}
                    {/*            <Text style={{color: 'gray'}}>Minutes</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>
                {/*<View style={styles.bottomButtons}>*/}
                {/*    /!*<TouchableOpacity onPress={() => navigation.goBack()}>*!/*/}
                {/*    /!*    <Text style={{fontSize: 16, color:'#EF223B'}}>BACK</Text>*!/*/}
                {/*    /!*</TouchableOpacity>*!/*/}
                {/*  <TouchableOpacity style={styles.nextButton}>*/}
                {/*    <Text style={{fontSize: 16, color: 'white'}}>NEXT</Text>*/}
                {/*  </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
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
        // padding: '5%',
    },
    sliderImage: {
      width: '100%',
      flex: 1,
    },
    imageFilter: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, .35)',
    },
    exerciseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    exerciseInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
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
