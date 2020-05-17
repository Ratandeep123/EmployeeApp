import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
const CreateEmployee = (navigation) => {

    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [Email, setEmail] = useState("")
    const [Salary, setSalary] = useState("")
    const [Picture, setPicture] = useState("")
    const [Position, setPosition] = useState("")
    const [modal, setModal] = useState(false)

    const submitData = () => {
        fetch("http://10.0.2.2:3000/send-data", {
            method: 'post',
            headers: {
                'Content-Type': 'applicatopn/json'
            },
            body: JSON.stringify({
                Name,
                Email,
                Phone,
                Salary,
                Picture,
                Position

            })
        }).then(res => res.json()
        ).then(data => {
            Alert.alert(`${data.name} is saved successfully`)
            navigation.navigate("Home")
        })
    }
    const picFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                // Reduce The Quality of image
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        }
        else {
            Alert.alert("You need to give up permission to work")
        }
    }
    const picFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                // Reduce The Quality of image
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }

        }
        else {
            Alert.alert("You need to give up permission to work")
        }

    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'EmployeeApp')
        data.append("cloud_name", "dwotu3pgo")

        fetch(`https://api.cloudinary.com/v1_1/dwotu3pgo/image/upload`, {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {

                setPicture(data.url)
                setModal(false)
            })
    }
    return (
        <View style={styles.root}>
            <KeyboardAvoidingView>
                <TextInput style={styles.inputStyle}
                    label='Name'
                    value={Name}
                    mode="outlined"
                    theme={{ theme }}
                    onChangeText={text => setName(text)}
                />
                <TextInput style={styles.inputStyle}
                    label='Email'
                    value={Email}
                    mode="outlined"
                    theme={{ theme }}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput style={styles.inputStyle}
                    label='Phone'
                    value={Phone}
                    mode="outlined"
                    keyboardType="number-pad"
                    theme={{ theme }}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput style={styles.inputStyle}
                    label='Salary'
                    value={Salary}
                    mode="outlined"
                    theme={{ theme }}
                    onChangeText={text => setSalary(text)}
                />
                <TextInput style={styles.inputStyle}
                    label='Position'
                    value={Position}
                    mode="outlined"
                    theme={{ theme }}
                    onChangeText={text => setPosition(text)}
                />
                <Button
                    style={styles.inputStyle}
                    icon={Picture == "" ? "upload" : "check"}
                    theme={theme}
                    mode="contained"
                    onPress={() => setModal(true)}>
                    upload Image
             </Button>
                <Button
                    style={styles.inputStyle}
                    icon="content-save"
                    theme={theme}
                    mode="contained"
                    onPress={() => submitData()}>
                    save
             </Button>
                <Modal
                    animationtype="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={styles.ModalView}>
                        <View style={styles.ModalButtonView}>
                            <Button icon="image"
                                theme={theme} mode="contained"
                                onPress={() => picFromGallery()}>
                                Gallery
                      </Button>
                            <Button icon="camera"
                                theme={theme} mode="contained"
                                onPress={() => picFromCamera()}>
                                Camera
                       </Button>
                        </View>
                        <Button theme={theme} onPress={() => setModal(false)}>
                            cancle
                     </Button>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </View>
    )

}
const theme = {
    colors: { primary: "red" }
}
const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5
    },
    ModalButtonView: {
        flexDirection: "row", justifyContent: "space-around", padding: 10
    }, ModalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "lightgray"
    }
})
export default CreateEmployee