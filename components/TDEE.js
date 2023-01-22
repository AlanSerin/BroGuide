import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from 'react-native-picker-select';
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'm',
    color: "#EF223B",
    borderColor: "#EF223B",
    selected: true,
}, {
    id: '2',
    label: 'Female',
    value: 'f',
    color: "#EF223B",
    borderColor: "#EF223B",
    selected: false,
}]
export default function TDEE({navigation}) {
    const [age, onChangeAge] = useState("");
    const [weight, onChangeWeight] = useState("");
    const [height, onChangeHeight] = useState("");
    const [activity, onChangeActivity] = useState("");
    const [sex, onChangeSex] = useState("m");

    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        console.log(radioButtonsArray)
        radioButtonsArray.forEach(object => {
            if(object.selected) {
                onChangeSex(object.value)
            }
        })
        setRadioButtons(radioButtonsArray);
    }
    const sendData = async () => {

    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Age</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeAge}
                value={age}
                keyboardType={"number-pad"}
            />
            <Text style={styles.label}>Weight</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeWeight}
                value={weight}
                keyboardType={"number-pad"}
            />
            <Text style={styles.label}>Height</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeHeight}
                value={height}
                keyboardType={"number-pad"}
            />
            <Text style={styles.label}>Activity</Text>
            <View style={{borderColor: 'rgba(96,100,107,0.25)', borderWidth: 1, borderRadius: 8, marginBottom: 16}}>
                <RNPickerSelect
                    onValueChange={(value) => onChangeActivity(value)}
                    items={[
                        { label: 'Light Exercise', value: 'LE' },
                        { label: 'Heavy Exercise', value: 'HE' },
                        { label: 'Sedentary', value: 'SE' },
                    ]}
                    value={activity}
                    style={selectBoxStyle}
                />
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8,marginBottom: 16}}>
                <Text style={styles.label}>Sex</Text>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                    layout={"row"}
                    containerStyle={{padding: 0, margin: 0}}
                />
            </View>
            <TouchableOpacity onPress={() => sendData()} style={styles.signUp}>
                <Text style={styles.signUpText}>Calculate</Text>
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'space-between',
        padding: '6%',
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(96,100,107,0.25)',
        borderRadius: 6,
        padding: 10,
        marginBottom: 18,
    },
    label: {
        marginBottom: 8,
        fontWeight: "bold",
    },
    signUp: {
        backgroundColor: "#EF223B",
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 24,
    },
    signUpText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
const selectBoxStyle = {
    inputIOS: {
        color: "black",
        paddingHorizontal: 10 // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 18,
        right: 10
    },
    placeholder: {
        color: 'lightgray',
        fontSize: 14
    },
    inputAndroid: {
        color: "black",
        paddingHorizontal: 10 // to ensure the text is never behind the icon
    }
}
