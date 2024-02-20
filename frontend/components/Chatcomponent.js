import { Pressable, Text, View, StyleSheet } from "react-native"
import { FontAwesome } from '@expo/vector-icons'
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context"
import { useNavigation } from "@react-navigation/native"

export default function Chatcomponent({ item }) {
    const { messages, setMessages } = useContext(GlobalContext)
    const navigation = useNavigation()

    useEffect(() => {
        if (item.messages && item.messages.length > 0) {
            setMessages(item.messages[item.messages.length - 1])
        } else {
            setMessages({ text: 'Tap to start messaging', time: 'Now' })
        }
    }, [item.messages])

    function handleNavigateToMessageScreen(){
        navigation.navigate('Messagescreen', {
            currentGroupName: item.currentGroupName,
            id: item.id})
    }

    return (
        <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
            <View style={styles.circle}>
                <FontAwesome name="group" size={24} color={"black"} />
            </View>
            <View style={styles.rightContainer}>
                <View>
                    <Text style={styles.userName}>{item.currentGroupName}</Text>
                    <Text style={styles.message}>
                        {messages.text}
                    </Text>
                </View>
                <View>
                    <Text style={styles.time}>
                        {messages.time}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    chat: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        height: 80,
        marginBottom: 10
    },
    userName: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 14,
        opacity: 0.8
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    time: {
        opacity: 0.6
    },
    circle: {
        width: 50,
        borderRadius: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginRight: 10
    }
})