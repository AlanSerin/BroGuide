import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {useState} from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}) {
    const [username, onChangeUsername] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    const createAccount = async () => {
        await axios.post('http://192.168.0.102:3000/api/user/register', {username: username, email: email, password: password}).then(async (res) => {
            console.log(res.data.user)
            await AsyncStorage.setItem('userId', res.data.user)
            navigation.goBack()
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType={'email-address'}
                autoComplete={'email'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity onPress={() => createAccount()} style={styles.signUp}>
                <Text style={styles.signUpText}>Create Account</Text>
            </TouchableOpacity>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Text style={{marginRight: 6,}}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: "blue"}}>Sign in</Text>
                </TouchableOpacity>
            </View>
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
    }
});
