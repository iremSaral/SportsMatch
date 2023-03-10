import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Image, ImageBackground } from "react-native";
import styles from "./profile.style";
import Button from "../../Components/Button";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from "../../Components/LoginInput/Input";
import { ScrollView } from "react-native-gesture-handler";

function Profile({ navigation }) {
    const [imageName, setImageName] = useState('https://pbs.twimg.com/media/FZukxoeUsAABmXt.jpg');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('')

    useEffect(() => {
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get().then((doc) => {
                setUser(doc.data())
            });
        storage().ref('userImage/' + auth().currentUser.uid)
            .getDownloadURL()
            .then((url) => {
                setImageName({ profileImageUrl: url });
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);
    return (
        <ScrollView>
        <SafeAreaView style={styles.container}>
            <View style={styles.person_container}>
                <Image source={{ uri: imageName.profileImageUrl }} style={styles.image} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                <View>
                    <Text style={{ width: 170, textAlign: 'center', fontWeight: 'bold', color: '#006400' }}>Oyuncu Profili</Text>
                </View>
                <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
            </View>
            <View style={styles.inner_container}>
                <View style={styles.person}>
                    <Text style={styles.info}>      Ad :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Icon name="ios-person" size={20} color="#006400" />
                            <Text style={styles.info}>{user.Name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>  ??ehir :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="business" size={20} color="#006400" />
                        <Text style={styles.info}> {user.City}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>    Boy :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="md-ellipsis-vertical" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Height}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>    Kilo :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="ios-barbell-sharp" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Weight}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>Tak??m :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="shirt" size={20} color="#006400" />
                        <Text style={styles.info}>{!(user.Team) ? "Tak??m?? Yok" : user.Team}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>Mevki :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="ios-football-sharp" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Position}</Text>
                    </View>
                </View>

                <View style={styles.person}>
                    <Text style={styles.info}>    Ya?? :</Text>
                    <View style={{ flexDirection: 'row', marginLeft: '29%' }}>
                        <Icon name="calendar-sharp" size={20} color="#006400" />
                        <Text style={styles.info}> {user.Age}</Text>
                    </View>
                </View>

            </View>
            <Input placeholder={"Kendinizi tan??t??n...."}  />
            {/* <View style={styles.text_container}> 
             <Text style={styles.text_style}>{user.Description}</Text>
             </View> */}

           
            <View>
            <Button color={"#fff"} icon={"account-edit"}
            onPress={() => navigation.navigate('Edit', { userToUpdate: user })} />
                <Button theme="tertiary" size={15} icon={"logout"} onPress={() => { auth().signOut() }}></Button></View>
        </SafeAreaView>
        </ScrollView>
    )

        }

export default Profile;