import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {useState} from "react";

export default function SignUp({navigation}) {
    const [text, onChangeText] = useState("");
    const [password, onChangePassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
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
            <TouchableOpacity style={styles.signUp}>
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
