import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Slides({navigation}) {
    const [slide, setSlide] = useState(0);
    const swiperRef = useRef(null);
    const swipe = (n) => {
        if(n === 1) {
            if(slide <= 1) {
                swiperRef.current.scrollBy(n)
            }
            else {
                navigation.navigate('WORKOUTS')
                AsyncStorage.setItem('firstTime', '1')
            }
        }
        else if(n === 2) {
            swiperRef.current.scrollTo(2)
        }
    }

    return (
        <View style={styles.container}>
            <Swiper removeClippedSubviews={false} ref={swiperRef} style={styles.wrapper} onIndexChanged={(index) => setSlide(index)} index={0} showsButtons={false} showsPagination={false} loop={false} >
                <View style={styles.slide}>
                    <Image style={styles.sliderImage} source={require('../assets/images/slide1.jpg')}/>
                    <View style={styles.sliderContentContainer}>
                        <Text style={styles.sliderTitle}>WELCOME TO BRO GUIDE</Text>
                        <View style={styles.sliderTextContainer}>
                            <Text style={styles.sliderText}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eius mod tempor incididunt ut labore et   dolore magna aliqua.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image style={styles.sliderImage} source={require('../assets/images/slide2.jpg')}/>
                    <View style={styles.sliderContentContainer}>
                        <Text style={styles.sliderTitle}>BECOME A BETTER YOU</Text>
                        <View style={styles.sliderTextContainer}>
                            <Text style={styles.sliderText}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eius mod tempor incididunt ut labore et   dolore magna aliqua.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image style={styles.sliderImage} source={require('../assets/images/slide3.jpeg')}/>
                    <View style={styles.sliderContentContainer}>
                        <Text style={styles.sliderTitle}>READY TO START BRO?</Text>
                        <View style={styles.sliderTextContainer}>
                            <Text style={styles.sliderText}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eius mod tempor incididunt ut labore et   dolore magna aliqua.</Text>
                        </View>
                    </View>
                </View>
            </Swiper>
            <View style={styles.sliderControls}>
                <Pressable onPress={() => swipe(2)}>
                    <Text style={styles.sliderButtons}>SKIP</Text>
                </Pressable>
                <View style={styles.sliderCircles}>
                    <View style={[styles.sliderCircle, slide === 0 ? styles.sliderCircleActive: styles.sliderCircleInactive]}/>
                    <View style={[styles.sliderCircle, slide === 1 ? styles.sliderCircleActive: styles.sliderCircleInactive]}/>
                    <View style={[styles.sliderCircle, slide === 2 ? styles.sliderCircleActive: styles.sliderCircleInactive]}/>
                </View>
                <Pressable onPress={() => swipe(1)}>
                    <Text style={styles.sliderButtons}>{slide === 2 ? 'START' : 'NEXT'}</Text>
                </Pressable>
            </View>
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
        paddingTop: '6%',
        paddingBottom: '6%',
    },
    wrapper: {},
    slide: {
        width: '88%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
    },
    sliderImage: {
        width: '100%',
        height: '45%',
        borderRadius: 6,
        marginTop: '20%',
        marginBottom: '20%',
    },
    sliderContentContainer: {
        flex: 1,
        // marginTop: 40,
    },
    sliderTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sliderTextContainer: {
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sliderText: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 21,
        color: '#60646b',
    },
    sliderControls: {
        display: 'flex',
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    sliderButtons: {
        color:'#EF223B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sliderCircle: {
        width: 9,
        height: 9,
        marginLeft: 9,
        marginRight: 9,
    },
    sliderCircleActive: {
        backgroundColor: '#EF223B',
        borderRadius: 9,
    },
    sliderCircleInactive: {
        backgroundColor: '#E0E0E0',
        borderRadius: 9,
    },
    sliderCircles: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
});
