import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, Keyboard, StyleSheet, ImageBackground } from 'react-native';
import { GlobalContext } from "../context";
import messageImage from "../assets/messageImage.png"
import { useNavigation } from '@react-navigation/native';

const checkUserInAllUsersAndNavigate = (currentUser, allUsers, navigation) => {
    if(allUsers.includes(currentUser)) {
        navigation.navigate('Chatscreen');
    }
};

const Homescreen = () => {
    const { showLoginView, setShowLoginView, 
        currentUserName, setCurrentUserName,
         currentUser, setCurrentUser, 
         allUsers, setAllUsers } = useContext(GlobalContext);
         
    const navigation = useNavigation();

    useEffect(() => {
        checkUserInAllUsersAndNavigate(currentUser, allUsers, navigation);
    }, [currentUser, allUsers, navigation]);

    function handleRegisterAndSignIn(isLogin) {
        if (currentUserName.trim() !== '') {
            const index = allUsers.findIndex(userItem => userItem === currentUserName);
            if (isLogin) {
                if (index === -1) {
                    Alert.alert('Please register first');
                } else {
                    setCurrentUser(currentUserName);
                }
            } else {
                if (index === -1) {
                    allUsers.push(currentUserName);
                    setAllUsers(allUsers);
                    setCurrentUser(currentUserName);
                } else {
                    Alert.alert('Already registered, please login');
                }
            }
            setCurrentUserName('');
        } else {
            Alert.alert('User name field is empty');
        }
        Keyboard.dismiss();
    }

    return (
        <View style={styles.mainWrapper}>
            <ImageBackground source={messageImage} style={styles.messageImage} />
            <View style={styles.content}>
                {showLoginView ?
                    <View style={styles.infoBlock}>
                        <View style={styles.loginInputContainer}>
                            <Text style={styles.heading}>Enter Your User Name</Text>
                            <TextInput autoCorrect={false}
                                placeholder="Enter your user name"
                                style={styles.loginInput}
                                onChangeText={(value) => setCurrentUserName(value)}
                                value={currentUserName}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Pressable onPress={() => handleRegisterAndSignIn(false)} style={styles.button}>
                                <View>
                                    <Text style={styles.buttonText}>Register</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => handleRegisterAndSignIn(true)} style={styles.button}>
                                <View>
                                    <Text style={styles.buttonText}>Login</Text>
                                </View>
                            </Pressable>
                            {/* Removed navigation to Chatscreen */}
                        </View>
                    </View>
                    : <View style={styles.infoBlock}>
                        <Text style={styles.heading}>Chat to your friends!</Text>
                        <Text style={styles.subHeading}>Connect to other book lovers</Text>
                        <Pressable style={styles.button} onPress={() => setShowLoginView(true)}>
                            <View>
                                <Text style={styles.buttonText}>Get started</Text>
                            </View>
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1
    },
    messageImage: {
        width: "100%",
        flex: 1,
        justifyContent: "center"
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    infoBlock: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10
    },
    subHeading: {
        fontSize: 15,
        color: '#acacac',
        marginBottom: 15
    },
    loginInput: {
        borderRadius: 50,
        borderWidth: 1,
        padding: 8
    },
    button: {
        backgroundColor: '#703efe',
        padding: 15,
        marginVertical: 10,
        width: '34%',
        elevation: 1,
        borderRadius: 50
    },
    buttonWrapper: {
        flexDirection: 'row',
        gap: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default Homescreen;