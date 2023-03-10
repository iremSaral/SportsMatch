import React, { useEffect, useState } from "react";
import { ScrollView, KeyboardAvoidingView, Text, View, TouchableOpacity, ImageBackground, } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Input from '../../Components/LoginInput';
import styles from "./EditTeamPage.style";
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik';
import Button from '../../Components/Button';
import { showMessage } from 'react-native-flash-message';
import { Provider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from "../../Components/BottomSheets/BottomSheet";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';



// Takımdan oyuncu silmek oyuncunun hasTeam değişkenini değiştirmek
//Silinen oyuncunun Team Name silmek 
// takım kaptanlığı varsa false yapmak

// oyuncu eklemek yukarıdaki işlemleri gerçekleştirmek
//Takıma fotoğraf eklemek
//Takım ismini değiştirebilmek
//Takımın şehrini değiştirebilmek
//


/////////DELETE
// const deletePlayer = (playerId, teamName, isCaptain) => {
//   firestore().collection('users').doc(playerId).update({
//       hasTeam: false,
//       Team: firebase.firestore.FieldValue.delete()
//   });
//   firestore().collection('Teams').where('name', '==', teamName)
//   .get()
//   .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//           if (doc.data().captain === playerId && isCaptain) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   captain: firebase.firestore.FieldValue.delete()
//               });
//           } else {
//               firestore().collection('Teams').doc(doc.id).update({
//                   [`mem${doc.data().mem1 === playerId ? 1 : doc.data().mem2 === playerId ? 2 : 3}`]: firebase.firestore.FieldValue.delete()
//               });
//           }
//       });
//   })
//   .catch(function(error) {
//       console.log("Error getting documents: ", error);
//   });
// }


///////////////////ADD
// const addPlayer = (formValues, teamName) => {
//   firestore().collection('users').add({
//       name: formValues.name,
//       email: formValues.email,
//       hasTeam: true,
//       Team: teamName,
//   });
//   firestore().collection('Teams').where('name', '==', teamName)
//   .get()
//   .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//           if (!doc.data().mem1) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   mem1: formValues.name,
//               });
//           } else if (!doc.data().mem2) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   mem2: formValues.name,
//               });
//           } else if (!doc.data().mem3) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   mem3: formValues.name,
//               });
//           }
//       });
//   })
//   .catch(function(error) {
//       console.log("Error getting documents: ", error);
//   });
// }








// const updateTeam= async(team)=>{
//   try {
//       await firestore().collection('Teams').doc(teamId).update(team)
//       navigation.navigate("Home")
//   } catch (error) {
//    console.log(error)   
//   }
// }

const initialFormValues = {
    name: "",
    captain: "",
    mem1: "",
    mem2: "",
    mem3: "",
    mem4: "",
    mem5: "",
    mem6: "",
    city: "",
    ImageUrl: "",
    type: ""
};
const CreateTeamPage = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('')
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/tr/2/25/Eski%C5%9Fehirspor.png");

    //AKTİF KULLANICILARIN VERİLERİNİ ÇEKME
    useEffect(() => {
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get().then((doc) => {
                setUser(doc.data())
            });
    }, []);

    //ADI GİRİLEN KULLANICILARIN BİLGİLERİNİ ÇEKME
    const searchMem = async (name) => {//Sorgu
        console.log("sorguya girildi 1");
        // setLoading(true);
        try {
            const collections = await firestore().collection('users').where('Name', '==', name).limit(1).get()
            const docs = collections.docs;
            try {
                if (docs[0].data().Name) {
                    return docs.map(doc => ({ ...doc.data() }));
                }
            } catch (error) {
                showMessage({
                    message: name + " adında bir oyuncu yok",
                    type: 'danger',
                });
                return;
            }
        } catch (e) {
            console.log(e.message)
            setLoading(false);
        }
    }

    const hasteamControl = async (mem) => {
        console.log(mem[0].Name + 'hasteamcontrol yapılıyor');
        memControl = mem[0].hasTeam;
        console.log(memControl);
        if (memControl == true) {
            console.log('show message');
            showMessage({
                message: mem[0].Name + " isimli oyuncunun zaten bir takımı var.",
                type: 'danger',
            });
            return false;
        }
        return true;
    }

    const handleFormSubmit = async formValues => {
        //TAKIMA SAHİP Mİ KONTROLÜ
        let mem1_id = await searchMem(formValues.mem1);
        const y1 = await hasteamControl(mem1_id)
        if (y1) {
            mem1_id = mem1_id[0].id;
            console.log("mem1 çalıştı");
        } else { return };

        let mem2_id = await searchMem(formValues.mem2);
        const y2 = await hasteamControl(mem2_id)
        if (y2) {
            mem2_id = mem2_id[0].id;
            console.log("mem2 çalıştı");
        } else { return; }

        let mem3_id = await searchMem(formValues.mem3);
        const y3 = await hasteamControl(mem3_id)
        if (y3) {
            mem3_id = mem3_id[0].id;
            console.log("mem3 çalıştı");
        } else { return; }

        let mem4_id = await searchMem(formValues.mem4);
        const y4 = await hasteamControl(mem4_id)
        if (y4) {
            mem4_id = mem4_id[0].id;
            console.log("mem4 çalıştı");
        } else { return; }

        let mem5_id = await searchMem(formValues.mem5);
        const y5 = await hasteamControl(mem5_id)
        if (y5) {
            mem5_id = mem5_id[0].id;
            console.log("mem5 çalıştı");
        } else { return; }

        let mem6_id = await searchMem(formValues.mem6);
        const y6 = await hasteamControl(mem6_id)
        if (y6) {
            mem6_id = mem6_id[0].id;
            console.log("mem6 çalıştı");
        } else { return; }
        //TAKIMA SAHİP Mİ KONTROLÜ
        //FORMDA GİRİLMESİ ZORUNLU ALANLAR KONTROLÜ
        if (formValues.mem1 === "") {
            showMessage({
                message: 'İlk oyuncu Girilmek zorundadır.',
                type: 'danger',
            });
            return;
        }
        if (formValues.name === "") {
            showMessage({
                message: 'Takım İsmi Girilmek Zorundadır.',
                type: 'danger',
            });
            return;
        }
        if (formValues.city === "") {
            showMessage({
                message: 'Şehir İsmi Girilmek Zorundadır.',
                type: 'danger',
            });
            return;
        }
        if (formValues.mem2 === "") {
            showMessage({
                message: 'İkinci oyuncu Girilmek zorundadır.',
                type: 'danger',
            });
            return;
        }
         //FORMDA GİRİLMESİ ZORUNLU ALANLAR KONTROLÜ
         //FİRESTORE İŞLEMLERİ
        try {
            setLoading(true);
            await firestore().collection('Teams').update(
                {
                    name: formValues.name,
                    captain: user.Name,
                    mem1: formValues.mem1,
                    mem2: formValues.mem2,
                    mem3: formValues.mem3,
                    city: formValues.city,
                    ImageUrl: image,
                    type: "team"
                }
            ).then(() => {
                firestore().collection('users').doc(auth().currentUser.uid).update({
                    hasTeam: true,
                    isCaptain: true,
                    Team: formValues.name,
                }),
                    firestore().collection('users').doc(mem1_id).update({
                        hasTeam: true,
                        Team: formValues.name,
                    }),
                    firestore().collection('users').doc(mem2_id).update({
                        hasTeam: true,
                        Team: formValues.name,
                    }),
                {
                    if(mem3_id) {
                        console.log(mem3_id + 'firestore içindeyim');
                        firestore().collection('users').doc(mem3_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                    }
                }
                {
                    if(mem4_id) {
                        console.log(mem4_id + 'firestore içindeyim');
                        firestore().collection('users').doc(mem4_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                    }
                }
                {
                    if(mem5_id) {
                        console.log(mem5_id + 'firestore içindeyim');
                        firestore().collection('users').doc(mem5_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                    }
                }
                {
                    if(mem6_id) {
                        firestore().collection('users').doc(mem6_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                    }
                }
            }).catch(e => {
                console.log(e)
            });
            console.log("başarılı")
            navigation.navigate("Home")
            setLoading(false);
            showMessage({
                message: 'Takım Oluşturuldu',
                type: 'success',
            });
        } catch (error) {
            setLoading(false);
            console.log(error)
            showMessage({
                message: "Ay Bozuldum",
                type: 'danger',
            });
        }
    };
 //FİRESTORE İŞLEMLERİ
  //FOTOOO
  const takePhotos = () => {
    ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 400,
        cropping: true,
        compressImageQuality: 0.7,
    }).then(async image => {

        // console.log(image.path);
        setImage(image.path);
        const reference = storage().ref('teamImage/' + auth().currentUser.uid);
        try {
            const task1 = reference.putFile(image.path);
            task1.on('state_changed', taskSnapshot => {
                // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });
            task1.then(() => {
                ImageUrl = image;
                // console.log('Image uploaded to the bucket!');
            });
        } catch (error) {
            console.log(error);
        }
    });
}
const choosePhotos = () => {
    ImagePicker.openPicker({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 400,
        cropping: true,
        compressImageQuality: 0.7,
    }).then(async image => {

        setImage(image.path);
        const reference = storage().ref('teamImage/' + auth().currentUser.uid);
        try {
            const task = reference.putFile(image.path);
            task.on('state_changed', taskSnapshot => {
                // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });
            task.then(() => {
                ImageUrl = image;
                // console.log('Image uploaded to the bucket!');
            });
        } catch (error) {
            console.log(error);
        }
    });
}
const [show, setshow] = useState(false);
//FOTOOOO
    
    return (
        <Provider>
            <ScrollView>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position'>

                        <View style={styles.TouchableOpacityContainer}>
                            <TouchableOpacity onPress={() => { setshow(true) }}>
                                <View style={styles.imageContainer}>
                                    <ImageBackground source={{ uri: image }}
                                        style={{ height: 100, width: 100 }}
                                        imageStyle={{ borderRadius: 15 }}>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Icon name="camera" size={40} color={'#fff'} style={styles.ıconContainer} />
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <BottomSheet show={show} onDismiss={() => { setshow(false); }}>
                            <Text style={styles.TitleBottomSheetStyle}> Upload Photo</Text>
                            <Text style={styles.textBottomSheetStyle}> Choose your profile picture..</Text>
                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={choosePhotos}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Galeriden Seç</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={takePhotos}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Fotoğraf Çek</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={() => { setshow(false) }}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Cancel</Text>
                            </TouchableOpacity>
                        </BottomSheet>

                        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                            {({ values, handleChange, handleSubmit }) => (
                                <View style={styles.body_container}>
                                    <Input
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="Takım Adını Giriniz"
                                        iconName="name"
                                    />
                                    <Input
                                        value={values.city}
                                        onChangeText={handleChange('city')}
                                        placeholder="Şehrinizi Giriniz"
                                        iconName="name"
                                    />
                                    <Input
                                        value={values.mem1}
                                        onChangeText={handleChange('mem1')
                                        }
                                        placeholder="1. Oyuncuyu.."
                                        iconName="email"
                                    />
                                    <Input
                                        value={values.mem2}
                                        onChangeText={handleChange('mem2')}
                                        placeholder="2. Oyuncu..."
                                        iconName="age"
                                    />
                                    <Input
                                        value={values.mem3}
                                        onChangeText={handleChange('mem3')}
                                        placeholder="3. Oyuncu..."
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem4}
                                        onChangeText={handleChange('mem4')}
                                        placeholder="4. Oyuncu..."
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem5}
                                        onChangeText={handleChange('mem5')}
                                        placeholder="5. Oyuncu..."
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem6}
                                        onChangeText={handleChange('mem6')}
                                        placeholder="6. Oyuncu..."
                                        iconName="height"
                                    />

                                    <Button text={"Takım Oluştur"} loading={loading} onPress={handleSubmit} />
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </Provider>
    );
}
export default CreateTeamPage;