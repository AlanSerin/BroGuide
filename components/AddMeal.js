import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import axios from "axios";


export default function AddMeal({navigation}) {
    const [text, onChangeText] = useState("");
    const [results, setResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const inspectMeal = (mealId) => {
        navigation.navigate("Meal", {recipeId: mealId})
    }
    const searchMeal = () => {
        if(searchTimeout) {
            clearTimeout(searchTimeout)
        }
        setSearchTimeout(setTimeout(()=> {
            if(text.length > 3) {
                axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=7900b26e638443b5851b4c38f0f2e2e2&query=${text}`).then((res) => {
                    console.log(res.data)
                    setResults(res.data)
                });
            }
        }, 600))
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1, paddingLeft: '4%', paddingRight: '4%',}}>
                <View style={styles.searchBar}>
                    <Ionicons name={'search'} size={16} color={'rgba(96,100,107,0.75)'} />
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={onChangeText}
                        onKeyPress={() => searchMeal()}
                        value={text}
                        placeholder="Enter Meal"
                    />
                </View>
                <View style={{width: '100%'}}>
                    { results ?
                        <View>
                            <Text style={{fontSize: 16, marginBottom: 16}}>{results.totalResults} Results</Text>
                            {results.results && results.results.length > 0 ? results.results.map((result, index) => <TouchableOpacity key={index} onPress={() => inspectMeal(result.id)} style={styles.exerciseContainer}>
                                <Image style={styles.foodImage} source={{uri: result.image,}}/>
                                <View style={styles.exerciseText}>
                                    <Text style={styles.exerciseTitle}>{result.title}</Text>
                                    <Text numberOfLines={2} style={styles.exerciseBodyText}>Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire.</Text>
                                </View>
                            </TouchableOpacity>): null}
                        </View>
                        : null}
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
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    searchBar: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(96,100,107,0.25)',
        borderRadius: 6,
        display: 'flex',
        paddingLeft: 10,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 12,
    },
    searchInput: {
        height: 40,
        padding: 10,
        width: '95%',
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
    exerciseBodyText: {
        fontSize: 13,
        marginTop: -4,
    },
});
