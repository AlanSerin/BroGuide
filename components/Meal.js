import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, Image, ScrollView} from 'react-native';
import CircularProgress from "react-native-circular-progress-indicator/index";
import { CircularProgressWithChild } from 'react-native-circular-progress-indicator';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import HTMLView from 'react-native-htmlview';

export default function Meal({route, navigation}) {
    const recipeId = route.params.recipeId
    // const exerciseIndex = route.params.index
    const [amount, onChangeAmount] = useState(100);
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=7900b26e638443b5851b4c38f0f2e2e2&includeNutrition=true`).then((res) => {
            setRecipe(res.data)
        });
    }, [])
    const removeAmount = () => {
        if(amount - 100 <= 100) {
            onChangeAmount(100)
        }
        else {
            onChangeAmount(amount => amount-100)
        }
    }
    const addAmount = () => {
        onChangeAmount(amount => amount+100)
    }
    return (
        <View style={styles.container}>
            { recipe ?
                <>
                    <ScrollView style={{flex: 1,  paddingLeft: '5%', paddingRight: '5%',}}>
                        <Image style={styles.sliderImage} source={{uri: recipe.image,}}>
                        </Image>
                        <View style={{marginTop: 12}}>
                            {/*<Text>{workoutName + ' ' + exerciseIndex}</Text>*/}
                            <View>
                                <Text style={styles.exerciseTitle}>{recipe.title}</Text>
                                <HTMLView
                                    value={"<Text>" +recipe.summary + "</Text>"}
                                    style={styles.recipeSummary}
                                />
                                <View style={styles.exerciseInfo}>
                                    <View>
                                        <Text style={{textAlign: 'center', marginBottom: 4}}>Carbs</Text>
                                        <CircularProgress
                                            value={recipe.nutrition.nutrients[3].amount}
                                            radius={30}
                                            // valueSuffix={'%'}
                                            // title={'1200/2400'}
                                            activeStrokeColor={'#EF223B'}
                                            inActiveStrokeColor={'rgba(255,62,84,0.3)'}
                                            // textStyle={{fontSize: 38}}
                                            // titleFontSize={16}
                                            // activeStrokeSecondaryColor={'#ef9d22'}
                                        />
                                        <Text style={{textAlign: 'center', marginTop: 4}}>{Math.round( ( (amount * recipe.nutrition.nutrients[0].amount) / (recipe.nutrition.nutrients[0].amount * 0.129598) * recipe.nutrition.nutrients[3].amount ) / recipe.nutrition.nutrients[0].amount)} g</Text>
                                    </View>
                                    <View>
                                        <Text style={{textAlign: 'center', marginBottom: 4}}>Fat</Text>
                                        <CircularProgress
                                            value={recipe.nutrition.nutrients[1].amount}
                                            radius={30}
                                            // valueSuffix={'%'}
                                            // title={'1200/2400'}
                                            activeStrokeColor={'#82bd4a'}
                                            inActiveStrokeColor={'rgba(155,229,87,0.30)'}
                                            // textStyle={{fontSize: 38}}
                                            // titleFontSize={16}
                                            // activeStrokeSecondaryColor={'#ef9d22'}
                                        />
                                        <Text style={{textAlign: 'center', marginTop: 4}}>{Math.round( ( (amount * recipe.nutrition.nutrients[0].amount) / (recipe.nutrition.nutrients[0].amount * 0.129598) * recipe.nutrition.nutrients[1].amount ) / recipe.nutrition.nutrients[0].amount)} g</Text>
                                    </View>
                                    <View>
                                        <Text style={{textAlign: 'center', marginBottom: 4}}>Protein</Text>
                                        <CircularProgress
                                            value={recipe.nutrition.nutrients[8].amount}
                                            radius={30}
                                            // valueSuffix={'%'}
                                            // title={'1200/2400'}
                                            activeStrokeColor={'#229def'}
                                            inActiveStrokeColor={'rgba(64,178,255,0.3)'}
                                            // textStyle={{fontSize: 38}}
                                            // titleFontSize={16}
                                            // activeStrokeSecondaryColor={'#ef9d22'}
                                        />
                                        <Text style={{textAlign: 'center', marginTop: 4}}>{ Math.round( ( (amount * recipe.nutrition.nutrients[0].amount) / (recipe.nutrition.nutrients[0].amount * 0.129598) * recipe.nutrition.nutrients[8].amount ) / recipe.nutrition.nutrients[0].amount)} g</Text>
                                    </View>
                                    <View>
                                        <Text style={{textAlign: 'center', marginBottom: 4}}>Calories</Text>
                                        <CircularProgressWithChild
                                            value={recipe.nutrition.nutrients[3].amount}
                                            radius={30}
                                            activeStrokeColor={'#EF223B'}
                                            inActiveStrokeColor={'rgba(255,62,84,0.3)'}
                                        >
                                            <CircularProgressWithChild
                                                value={recipe.nutrition.nutrients[1].amount}
                                                radius={20}
                                                activeStrokeColor={'#82bd4a'}
                                                inActiveStrokeColor={'rgba(155,229,87,0.30)'}
                                            >
                                                <CircularProgressWithChild
                                                    value={recipe.nutrition.nutrients[8].amount}
                                                    radius={10}
                                                    activeStrokeColor={'#229def'}
                                                    inActiveStrokeColor={'rgba(64,178,255,0.3)'}
                                                />
                                            </CircularProgressWithChild>
                                        </CircularProgressWithChild>
                                        <Text style={{textAlign: 'center', marginTop: 4}}>{ Math.round((amount * recipe.nutrition.nutrients[0].amount) / (recipe.nutrition.nutrients[0].amount * 0.129598))} kcal</Text>
                                    </View>
                                    {/*<Text style={{fontSize: 16}}>4 Sets</Text>*/}
                                    {/*<Text style={{fontSize: 16}}>12 Reps</Text>*/}
                                </View>
                                <View>
                                    <View style={styles.IngredientsHeader}>
                                        <Text style={styles.IngredientsTitle}>Ingredients</Text>
                                        <Text style={styles.IngredientsAmount}>{recipe ? recipe.extendedIngredients.length : 0} Items</Text>
                                    </View>
                                    {recipe ? recipe.extendedIngredients.map((ingredient, index) =>  <View style={styles.IngredientsItem}>
                                        <View key={index} style={styles.IngredientsLeft}>
                                            <Image style={{width: 36, height: 36, marginRight: 8, borderRadius: 4}} source={{uri: 'https://spoonacular.com/cdn/ingredients_100x100/'+ingredient.image}}/>
                                            <Text>{ingredient.originalName}</Text>
                                        </View>
                                        <Text>{Math.round(ingredient.measures.metric.amount)} {ingredient.measures.metric.unitShort}</Text>
                                    </View>) : null}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomButtons}>
                        <View style={styles.searchBar}>
                            <TouchableOpacity onPress={() => removeAmount()}>
                                <Ionicons name={'remove'} size={16} color={'rgba(96,100,107,0.75)'} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.searchInput}
                                onChangeText={onChangeAmount}
                                value={amount.toString()}
                                placeholder="Amount"
                                keyboardType="numeric"
                                textAlign={'center'}
                            />
                            <TouchableOpacity onPress={() => addAmount()}>
                                <Ionicons name={'add'} size={16} color={'rgba(96,100,107,0.75)'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.nextButton}>
                            <Text style={{fontSize: 16, color: 'white'}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </> : null }

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'space-between',

    },
    sliderImage: {
        width: '100%',
        marginTop: 18,
        height: 200,
        borderRadius: 8,
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
        marginBottom: 32,
    },
    nextButton: {
        backgroundColor: '#EF223B',
        overflow: 'hidden',
        borderRadius: 8,
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 27,
        paddingRight: 27,
    },
    bottomButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4,
        paddingTop: '2%',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingBottom: '2%',
        // paddingLeft: '5%',
        // paddingRight: '5%',
        // marginBottom: 16,
    },
    recipeSummary: { marginBottom: 20, fontSize: 16, lineHeight: 20},
    searchBar: {
        width: '50%',
        borderWidth: 1,
        borderColor: 'rgba(96,100,107,0.25)',
        borderRadius: 6,
        display: 'flex',
        paddingLeft: 10,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        padding: 10,
        width: '80%'
    },
    IngredientsHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    IngredientsItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    IngredientsLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    IngredientsTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    IngredientsAmount: {
        fontSize: 14,
        opacity: 0.5,
    }
});
