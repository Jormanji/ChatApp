import react from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Pressable, FlatList, Modal } from 'react-native';
import { io } from 'socket.io-client';
import { useRoute } from '@react-navigation/native';
import { useContext } from "react"
import { GlobalContext } from "../context/index"
import { AntDesign } from '@expo/vector-icons'
import Chatcomponent from '../components/Chatcomponent'
import NewGroupModal from '../components/Modal';
import { socket } from "../utils/index"

const Chatscreen = ({ navigation }) => {
    const loggedInUser = useContext(GlobalContext)
    const chatRooms = useContext(GlobalContext)
    const modalVisible = useContext(GlobalContext)
    const setModalVisible = useContext(GlobalContext)
    const setAllChatRooms = useContext(GlobalContext)
    const setCurrentUser = useContext(GlobalContext)
    const setShowLoginView = useContext(GlobalContext)


    useEffect(() => {
        socket.emit('getAllGroups');

        socket.on('groupList', (groups) => {
            console.log(groups, "groups")
            setAllChatRooms.setAllChatRooms(groups)
        })

    }, [socket])

    function handleLogout() {
        setCurrentUser.setCurrentUser('')
        setShowLoginView.setShowLoginView(false)
    }

    useEffect(() => {
        if(loggedInUser.currentUser.trim() === '') navigation.navigate('Homescreen')
    }, [loggedInUser.currentUser])


    return <View style={styles.mainWrapper}>
        <View style={styles.topContainer}>
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome {loggedInUser.currentUser} </Text>
                <Pressable onPress={handleLogout}>
                    <AntDesign name="logout" size={30} color={'black'} />
                </Pressable>
            </View>
            <View>
                <Button
                    title="Go to Message Screen"
                    onPress={() => navigation.navigate('Messagescreen')}
                />
            </View>
        </View>
        <View style={styles.listContainer}>
            <FlatList
                data={chatRooms.allChatRooms}
                renderItem={({ item }) => <Chatcomponent item={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable onPress={() => setModalVisible.setModalVisible(true)} style={styles.button}>
                <View>
                    <Text style={styles.buttonText}> Create New Chat </Text>
                </View>
            </Pressable>
        </View>
        {
            modalVisible.modalVisible && <NewGroupModal />
        }
    </View>
}

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: '#eee',
        flex: 1
    },
    topContainer: {
        backgroundColor: "#fff",
        height: 70,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        marginBottom: 15,
        flex: 0.3
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    listContainer: {
        flex: 3.4,
        paddingHorizontal: 10
    },
    bottomContainer: {
        flex: 0.3,
        padding: 10,
    },
    button: {
        backgroundColor: '#703efe',
        padding: 12,
        width: '100%',
        elevation: 1,
        borderRadius: 50
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default Chatscreen;
