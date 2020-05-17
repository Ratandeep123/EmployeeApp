import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, FAB, } from 'react-native-paper'

const Home = ({ navigation }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://10.0.2.2:3000/").then(res => res.json()).then(getresult => {
            setData(results)
            setLoading(false)
        })
    }, [])
    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}
                onPress={() => navigation.navigate("Profile", { item: item })}
            >

                <View style={styles.cardView}

                >
                    <Image style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=515&q=80" }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>

                </View>

            </Card >
        )
    })
    return (
        <View style={{ flex: 1 }}>
            {
                loading ?

                    < ActivityIndicator size="large" color="#0000ff" />
                    : <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return renderList(item)
                        }}
                        keyExtractor={item => `${item._id}`}
                    />
            }

            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}
                onPress={() => navigation.navigate("CreateEmployee")}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    mycard: {
        margin: 5,
    }, cardView: {
        flexDirection: "row",
        paddingRight: 200,
        paddingTop: 10
    }, text: {
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
export default Home;
