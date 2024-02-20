import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../context/index"
import Messagecomponent from "../components/Messagecomponent";
import { socket } from "../utils";
import { useEffect } from "react"
import { Keyboard } from "react-native";

const Messagescreen = ({navigation, route}) => {

    const {currentGroupName, currentGroupID} = route.params

    const {allChatMessages, 
        currentUser, 
        currentChatMessage, setCurrentChatMessage,
        setAllChatMessages} = useContext(GlobalContext)

    function handleAddNewMessage(){
        const timeData = {
            hr : new Date().getHours()< 10 ? `0${new Date().getHours()}` : new Date().getHours(),
            mins : new Date().getMinutes()< 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
        };

        if(currentUser){
            socket.emit('newChatMessage', {
                currentChatMessage,
                groupIdentifier : currentGroupID,
                currentUser,
                timeData
            })
            setCurrentChatMessage('')
            Keyboard.dismiss()
        }
    }

    useEffect(() => {
            socket.emit('findGroup', currentGroupID)
            socket.on('foundGroup', (allChats) => setAllChatMessages(allChats))
        }, [socket])

    return <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
            { allChatMessages && allChatMessages[0] ? (
                <FlatList 
                    data={allChatMessages}
                    renderItem={({ item }) => <Messagecomponent item={item} currentUser={currentUser} />}
                    keyExtractor={(item) => item.id.toString()}
                />
             ) : ('')
            }
        </View>
        <View style={styles.messageInputContainer}>
            <TextInput 
            style={styles.messageInput}
            value={currentChatMessage}
            onChangeText={(value) => setCurrentChatMessage(value)}
            placeholder="Enter your message"
            />
            <Pressable onPress={handleAddNewMessage} style={styles.button}>
                <View>
                    <Text style={styles.buttonText}>
                        Send
                    </Text>
                </View>
            </Pressable>
            
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor : '#eee'
    },
    innerWrapper: {
        flex: 1,
        backgroundColor: '#eee',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    messageInputContainer: {
        width : '100%',
        backgroundColor : '#fff',
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    messageInput : {
        borderWidth: 1,
        padding: 15,
        flex: 1,
        borderRadius: 50,
        marginRight: 10
    },
    button : {
        width : '30%',
        backgroundColor: '#703efe',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius: 50
    },
    buttonText : {
        color : '#fff',
        fontSize: 20
    }
})


export default Messagescreen