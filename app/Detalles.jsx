import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { View, Text,StyleSheet,Image, ScrollView,Button,TextInput } from 'react-native';
import axios from "axios";

export default function Detalles() {
    const route = useRoute();

    const { planet } = route.params;
    const [actualPlanet,setActualPlanet]=useState([]);
    const [isEditing,setIsEditing]=useState(false);
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [moons,setMoons]=useState(0);
    const [moon_names,setMoonNames]=useState('');
    const [image,setImage]=useState('');
    const navigation = useNavigation();
    useEffect(()=>{
        getPlanet(planet);
    },[]);
    const actualizarPlaneta=async()=>{
        try{
            const moons_names_data=moon_names.split(',');
            await axios.put(`http://localhost:3000/planets/${actualPlanet.id}`,{
                name,
                description,
                moons,
                moon_names:moons_names_data,
                image
            });
            setIsEditing(false);
            const id=actualPlanet.id;
            setActualPlanet({
                id:id,
                name,
                description,
                moons,
                moon_names:moons_names_data,
                image
            });

        }
        catch(error){
            console.log("hubo un error al actualizar el planeta",error)
        }
    }
    const deletePlanet=async()=>{
        try{
            await axios.delete(`http://localhost:3000/planets/${actualPlanet.id}`);
            navigation.goBack();
        }
        catch(error){
            console.log("hubo un error al eliminar el planeta",error)
    }
    }
    const editPlanet=()=>{
        setIsEditing(true);
    }

    const getPlanet = async(id)=>{
        console.log(id)
        try{
            const response=await axios.get(`http://localhost:3000/planets/${id}`);
            setActualPlanet(response.data);
            setName(response.data.name);
            setDescription(response.data.description);
            setMoons(response.data.moons);
            setMoonNames(response.data.moon_names.join(','));
            setImage(response.data.image);
        }
        catch(error){
            console.error("Hubo un error consultando los planetas");
        }
    }
    return (
        (isEditing)?
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
            onPress={actualizarPlaneta}
            />
            <Button
            title="Cancelar"
            onPress={()=>setIsEditing(false)}></Button>
        </View>
        :
        <View
        style={{height:'100%'}}>
            <ScrollView>
            <Text style={styles.planetName}>{actualPlanet.name}</Text>
            <Text style={styles.planetName}>{actualPlanet.description}</Text>
            <Text style={styles.planetName}>{actualPlanet.moons} lunas{actualPlanet.moons>0?':':''}</Text>
            {actualPlanet.moon_names && actualPlanet.moon_names.length > 0 && actualPlanet.moon_names.map((moon, index) => (
                <Text key={index} style={styles.planetName}>- {moon}</Text>
            ))}
            <Image source={{uri: actualPlanet.image}}
             resizeMode='contain'
       style={{width: 400, height: 400}} />
       <Button title='Editar' color={'blue'} onPress={editPlanet}></Button>
       <Button title='Eliminar' color={'red'} onPress={deletePlanet}></Button>
</ScrollView>
        </View>
    );
}
const styles= StyleSheet.create({
    planetName:{
        fontSize:15,
        paddingLeft:'10px',
        borderRadius: '4px',
        paddingTop: '10px',
        paddingBottom: '10px',
        marginBottom: '11px',
    },
    deleteButton:{
        backgroundColor: 'red',
        color: 'white',
  
    },
    editButton:{
        backgroundColor: 'blue',
        color: 'white',
    },
    textFields:{
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
    }
})