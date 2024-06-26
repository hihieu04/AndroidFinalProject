import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {firebase} from '../firebase/FirebaseConfig';
// xử lý nút Sign up, nút x, nút sign in
// bàn phím nhập pass che

function validateEmails(value: string): React.JSX.Element | null {
    const re = /\S+@\S+\.\S+/;
    if (re.test(value) == false) {
        return (
            <Text style={styles.ErrorMessage}>
                Email không hợp lệ!</Text>
        );
    }
    else return null;
}

function comparePass(pass: string, cfPass: string): React.JSX.Element | null {
    if (pass == cfPass)
        return null;
    else
        return <Text style={styles.ErrorMessage}>Mật khẩu không khớp!</Text>

}

function SignUp({navigation}): React.JSX.Element {
    const screenWidth = Dimensions.get('window').width;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [result, setResult] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [hideCfPass, setHideCfPass] = useState(true);

    const createAccountHandle = async () => {
        // if(!email || !password || !confirmPass){
        //     alert('Chưa điền đủ thông tin!')
        //     return;
        // }
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                    const uid = userCredentials?.user?.uid;
                    console.log('Tạo tài khoản thành công');
                    navigation.navigate('Login');
            })
        } catch (error){
            console.log('Error...')
        }
    }

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <ImageBackground style={styles.background}
            source={require('../images/loginBackground.jpg')} >
            <TouchableOpacity style={{ position: 'absolute', top: 10, left: screenWidth - 30 }} onPress={() => handlePress()}>
                <Image source={require('../images/reject.png')}
                    style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
            <GestureHandlerRootView>
                <View style={styles.mainView}>
                    <KeyboardAvoidingView
                        behavior={'padding'}
                        keyboardVerticalOffset={0}
                    >

                        <ScrollView>
                            <View style={styles.items}>
                                <Text style={[styles.fontWeightLight, { fontSize: 11, color: 'black', marginTop: 5 }]}>
                                    Chào mừng bạn đến với</Text>
                                <Text style={[styles.fontWeight, { fontSize: 17, color: 'black', marginTop: 5, marginBottom: 5 }]}>
                                    THE COFFEE HOUSE</Text>
                                <View style={[styles.textBox]}>
                                    <TextInput
                                        keyboardType='email-address'
                                        placeholder='Enter email'
                                        style={styles.textInput}
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                </View>

                                {validateEmails(email)}

                                <View style={[styles.textBox]}>
                                    <TextInput
                                        secureTextEntry={hidePass}
                                        placeholder='Password'
                                        style={styles.textInput}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                    <TouchableOpacity style={styles.hideButton} onPress={() => setHidePass(!hidePass)}>
                                        <Image source={require('../images/visible.png')}
                                            style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.textBox]}>
                                    <TextInput
                                        secureTextEntry={hideCfPass}
                                        placeholder='Confirm Password'
                                        style={styles.textInput}
                                        value={confirmPass}
                                        onChangeText={(text) => setConfirmPass(text)}
                                    />
                                    <TouchableOpacity style={styles.hideButton} onPress={() => setHideCfPass(!hideCfPass)}>
                                        <Image source={require('../images/visible.png')}
                                            style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                </View>

                                {comparePass(password, confirmPass)}

                                <TouchableOpacity style={[styles.button]} onPress={() => createAccountHandle()}>
                                    <Text style={[styles.fontWeight, { fontSize: 14, color: 'white' }]}>
                                        Sign up</Text>
                                </TouchableOpacity>
                                <View style={styles.component1}>
                                    <Text style={[styles.fontWeightLight, { fontSize: 13, color: 'gray' }]}>
                                        Already have an account? </Text>
                                    <TouchableOpacity onPress={() => handlePress()}>
                                        <Text style={[styles.fontWeight, { fontSize: 13, color: 'black' }]}>
                                            Sign in</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>


                        </ScrollView>
                        {/* </GestureHandlerRootView> */}
                    </KeyboardAvoidingView>
                </View>
            </GestureHandlerRootView>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    mainView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    items: {
        margin: 30,
        alignItems: 'center',
    },
    fontWeightLight: {
        fontFamily: 'Roboto-Light',
    },
    fontWeight: {
        fontWeight: 'bold',
    },
    button: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5F374B',
        borderRadius: 8,
        width: '100%',
        height: 40,
    },
    component1: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textBox: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'gainsboro',
        borderRadius: 8,
        borderWidth: 1,
        height: 40,
        width: '100%',
    },
    textInput: {
        fontSize: 13,
        marginLeft: 10,
        width: '80%'
    },
    hideButton: {
        padding: 8,
    },
    ErrorMessage: {
        fontSize: 10,
        alignSelf: 'flex-end',
        color: 'red',

    },
});

export default SignUp;
function userCredentials(value: UserCredential): UserCredential | PromiseLike<UserCredential> {
    throw new Error('Function not implemented.');
}

