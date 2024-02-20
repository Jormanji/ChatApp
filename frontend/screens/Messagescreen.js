import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import { useContext } from "react/cjs/react.production.min";
import { GlobalContext } from "../context/index"
import Messagecomponent from "../components/Messagecomponent";

const Messagescreen = () => {

    const allChatMessages = useContext(GlobalContext)
    const setAllChatMessages = useContext(GlobalContext)
    const currentUser = useContext(GlobalContext)
    const currentChatMessage = useContext(GlobalContext)
    const setCurrentChatMessage = useContext(GlobalContext)

    return <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
        {
                allChatMessages.allChatMessages && allChatMessages.allChatMessages[0] ?
                <FlatList 
                    data={allChatMessages.allChatMessages}
                    renderItem={({ item }) => <Messagecomponent item={item} currentUser={currentUser.currentUser} />}
                    keyExtractor={(item) => item.id}
                />
                : ''
            }
        </View>
        <View style={styles.messageInputContainer}>
            <TextInput 
            style={styles.messageInput}
            value={currentChatMessage.currentChatMessage}
            onChangeText={(value) => setCurrentChatMessage.setCurrentChatMessage(value)}
            placeholder="Enter your message"
            >
            
            <Pressable style={styles.button}>
                <View>
                    <Text style={styles.buttonText}>
                        Send
                    </Text>
                </View>
            </Pressable>
            </TextInput>
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