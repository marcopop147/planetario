import { useState,useCallback } from "react";
import  axios from 'axios';
import { View, Text, TextInput, Button,StyleSheet } from "react-native";
import {
    useNavigation,useFocusEffect
  } from '@react-navigation/native';

export default function Nuevo(){
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [moons,setMoons]=useState(0);
    const [moon_names,setMoonNames]=useState('');
    const [image,setImage]=useState('');
    const navigation = useNavigation();
    const nuevoPlaneta=async()=>{
        try{
            const moons_names=moon_names.split(',');
            await axios.post('http://localhost:3000/planets',{
                name,
                description,
                moons,
                moons_names,
                image
            });
            navigation.navigate('index')
        }
        catch(error){
            console.log("hubo un error al crear el planeta",error)
        }
    }
    useFocusEffect(
        useCallback(() => {
           setName('');
              setDescription('');
                setMoons(0);
                setMoonNames('');
                setImage('');
        }, [])
    );
    return (
        <View
        style={styles.container}
        >
            <Text>Nombre</Text>
            <TextInput
            style={styles.textFields}
            value={name}
            onChangeText={setName}
            />
            <Text>Descripción</Text>
            <TextInput
            style={styles.textFields}
            value={description}
            onChangeText={setDescription}
            />
            <Text>Lunas</Text>
            <TextInput
            style={styles.textFields}
            value={moons}
            onChangeText={setMoons}
            />
            <Text>Nombres de las lunas</Text>
            <TextInput
            style={styles.textFields}
            value={moon_names}
            onChangeText={setMoonNames}
            />
            <Text>Imagen</Text>
            <TextInput
            style={styles.textFields}
            value={image}
            onChangeText={setImage}
            />
            <Button
            title="Guardar"
            onPress={nuevoPlaneta}
            />
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:16,
    },
    textFields:{
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
    }
})