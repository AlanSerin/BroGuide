import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import * as Progress from 'react-native-progress';

export default function Diet({route, navigation}) {
    const [percentage, setPercentage] = useState(0)
    useEffect(() => {
        setPercentage(50)
    })
    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1, paddingLeft: '4%', paddingRight: '4%'}}>
                {/*<View style={{backgroundColor: '#EF223B', padding: 9,borderRadius: 9, shadowColor: "#000", shadowOffset: {width: 0, height: 4,}, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 9,marginBottom: 12}}>*/}
                {/*    <Text style={[styles.progressTitle, {color: 'white', textAlign:'center'}]}>Daily Calories Consumed</Text>*/}
                {/*    <View style={{display: 'flex', flexDirection: 'row', width: '100%',marginBottom: 28}}>*/}
                {/*        <View style={styles.progressBarContainer}>*/}
                {/*            <CircularProgress*/}
                {/*                value={percentage}*/}
                {/*                radius={100}*/}
                {/*                valueSuffix={'%'}*/}
                {/*                title={'1200/2400'}*/}
                {/*                subtitle={'kcal'}*/}
                {/*                activeStrokeColor={'white'}*/}
                {/*                inActiveStrokeColor={'white'}*/}
                {/*                inActiveStrokeOpacity={0.25}*/}
                {/*                textStyle={{fontSize: 38}}*/}
                {/*                titleFontSize={16}*/}
                {/*                activeStrokeSecondaryColor={'white'}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*        <View style={{width: '30%', marginLeft: '10%', display: 'flex', justifyContent:'space-between', paddingTop: '4%', paddingBottom: '4%'}}>*/}
                {/*            <View>*/}
                {/*                <Text style={{marginBottom: 2, fontWeight: 'bold', color: 'white'}}>Protein</Text>*/}
                {/*                <Progress.Bar borderWidth={0} unfilledColor={'rgba(255,255,255,0.25)'} color={'white'} progress={0.2} width={null} />*/}
                {/*                <Text style={{marginTop: 2, color: 'white'}}>14/200g</Text>*/}
                {/*            </View>*/}
                {/*            <View>*/}
                {/*                <Text style={{marginBottom: 2, fontWeight: 'bold', color: 'white'}}>Carbs</Text>*/}
                {/*                <Progress.Bar borderWidth={0} unfilledColor={'rgba(255,255,255,0.25)'} color={'white'} progress={0.6} width={null} />*/}
                {/*                <Text style={{marginTop: 2, color: 'white'}}>120/200g</Text>*/}
                {/*            </View>*/}
                {/*            <View>*/}
                {/*                <Text style={{marginBottom: 2, fontWeight: 'bold', color: 'white'}}>Fat</Text>*/}
                {/*                <Progress.Bar borderWidth={0} unfilledColor={'rgba(255,255,255,0.25)'} color={'white'} progress={0.4} width={null} />*/}
                {/*                <Text style={{marginTop: 2, color: 'white'}}>47/200g</Text>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    <View style={styles.progressInfo}>*/}
                {/*        <View>*/}
                {/*            <Text style={{textAlign: 'center', fontSize: 16, color: 'white', opacity: 0.75}}>Consumed</Text>*/}
                {/*            <Text style={{textAlign: 'center', fontSize: 21, fontWeight: 'bold', color: 'white'}}>1200</Text>*/}
                {/*        </View>*/}
                {/*        <View style={{width: 2, backgroundColor: 'white'}}></View>*/}
                {/*        <View>*/}
                {/*            <Text style={{textAlign: 'center', fontSize: 16, color: 'white', opacity: 0.75}}>Remaining</Text>*/}
                {/*            <Text style={{textAlign: 'center', fontSize: 21, fontWeight: 'bold', color: 'white'}}>1200</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <Text style={styles.progressTitle}>Daily Calories Consumed</Text>
                <View style={{display: 'flex', flexDirection: 'row', width: '100%',marginBottom: 28}}>
                    <View style={styles.progressBarContainer}>
                        <CircularProgress
                            value={percentage}
                            radius={100}
                            valueSuffix={'%'}
                            title={'1200/2400'}
                            subtitle={'kcal'}
                            activeStrokeColor={'#EF223B'}
                            inActiveStrokeColor={'rgba(0,0,0,0.25)'}
                            inActiveStrokeOpacity={0.25}
                            textStyle={{fontSize: 38}}
                            titleFontSize={16}
                        />
                    </View>
                    <View style={{width: '30%', marginLeft: '10%', display: 'flex', justifyContent:'space-between', paddingTop: '4%', paddingBottom: '4%'}}>
                        <View>
                            <Text style={{marginBottom: 2, fontWeight: 'bold'}}>Protein</Text>
                            <Progress.Bar borderWidth={0} color={'#ff811e'} unfilledColor={'rgba(239,123,34,0.3)'} progress={0.2} width={null} />
                            <Text style={{marginTop: 2, }}>14/200g</Text>
                        </View>
                        <View>
                            <Text style={{marginBottom: 2, fontWeight: 'bold', }}>Carbs</Text>
                            <Progress.Bar borderWidth={0} color={'#8fd24e'} unfilledColor={'rgba(155,229,87,0.30)'} progress={0.6} width={null} />
                            <Text style={{marginTop: 2, }}>120/200g</Text>
                        </View>
                        <View>
                            <Text style={{marginBottom: 2, fontWeight: 'bold', }}>Fat</Text>
                            <Progress.Bar borderWidth={0} color={'#229def'} unfilledColor={'rgba(64,178,255,0.3)'} progress={0.4} width={null} />
                            <Text style={{marginTop: 2, }}>47/200g</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.progressTitle}>Previous Meals</Text>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                        {/*<View style={styles.exerciseInfo}>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>450g Protein</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>75g Carbs</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>25g Fat</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>600 Calories</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                        {/*<View style={styles.exerciseInfo}>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>450g Protein</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>75g Carbs</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>25g Fat</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>600 Calories</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                        {/*<View style={styles.exerciseInfo}>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>450g Protein</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>75g Carbs</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>25g Fat</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>600 Calories</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                        {/*<View style={styles.exerciseInfo}>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>450g Protein</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>75g Carbs</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Text style={styles.exerciseLighterText}>25g Fat</Text>*/}
                        {/*        <Text style={styles.exerciseLighterText}>600 Calories</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View style={styles.exerciseContainer}>
                    <Image style={styles.foodImage} source={require('../assets/images/chicken.jpeg')}/>
                    <View style={styles.exerciseText}>
                        <Text style={styles.exerciseTitle}>Chicken Nuggets</Text>
                        <Text style={styles.exerciseLighterText}>600 Calories</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Add Meal')} style={styles.nextButton}>
                <Ionicons name={'add'} size={32} color={'white'} />
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        //padding: '5%',
    },
    progressTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 24,
      marginTop: 12,
    },
    progressBarContainer: {
      width: '60%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    progressInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width:'80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 0,
    },

    foodImage: {
        width: '30%',
        height: 70,
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
        width: '65%',
        // alignSelf: 'center',
    },
    exerciseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    exerciseLighterText: {
        fontSize: 12,
        color: '#60646b',
        marginBottom: 4,
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
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 14,
        paddingRight: 14,
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
});
