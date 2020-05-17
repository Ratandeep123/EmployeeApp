
import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from "react-native-paper"
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
const Profile = (props) => {
    const { _id, name, picture, salary, phone, emails, position } = props.route.params.item
    const openDial = () => {
        if (Platform.os === "android") {
            Linking.openURL("tel:12345")
        } else {
            Linking.openURL("tel:12345")
        }
    }
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "20%" }} />
            <View style={{ alignItems: "center" }}>
                <Image style={{ width: 120, height: 100, borderRadius: 50, marginTop: -50 }}
                    source={{ uri: { picture } }}
                />
            </View>
            <View style={{ alignItems: "center", margin: 7 }}>
                <Title>
                    {name}
                </Title>
                <Text style={{ fontSize: 16 }}>{position}</Text>
            </View>

            <Card style={styles.mycard} onPress={() => {
                Linking.openURL("mailto:abc@abc.com")
            }}

            >
                <View style={styles.cardContent} >
                    <MaterialIcons name="email" size={32} color="#006aff" />
                    <Text style={styles.mytext}>{emails}</Text>
                </View>
            </Card>


            <Card style={styles.mycard} onPress={() => openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="#006aff" />
                    <Text style={styles.mytext}>{phone}</Text>
                </View>
            </Card>

            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#006aff" />
                    <Text style={styles.mytext}>{salary}</Text>
                </View>
            </Card>
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
                <Button icon="account-edit"
                    theme={theme}
                    mode="contained" onPress={() => console.log('Pressed')}>
                    edit
                </Button>
                <Button icon="delete"
                    theme={theme}
                    mode="contained" onPress={() => console.log('Pressed')}>
                    FIRE EMPLOYEE
                </Button>
            </View>
        </View>
    )

}
const theme = {
    colors: {
        primary: "#006aff"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    mycard: {

        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    }, mytext: {
        marginTop: 3,
        marginLeft: 3,
        fontSize: 18
    }
})


export default Profile