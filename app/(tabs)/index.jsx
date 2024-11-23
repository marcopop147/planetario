import axios from "axios";
import { useEffect, useState,useCallback } from "react";
import { TouchableOpacity,FlatList, View,StyleSheet,Text } from "react-native";
import {
    useNavigation,useFocusEffect
  } from '@react-navigation/native';
import { ScrollView } from "react-native-web";


export default function PlanetListScreen(){
    const [planets,setPlanets]=useState([]);
    useEffect(()=>{
        getPlanets();
    },[]);
    const navigation = useNavigation();

    const getPlanets = async()=>{
        try{
            const response=await axios.get('http://localhost:3000/planets');
            setPlanets(response.data);
        }
        catch(error){
            console.error("Hubo un error consultando los planetas");
        }
    }
    useFocusEffect(
        useCallback(() => {
            getPlanets();
        }, [])
    );
    return (
        <View
        style={styles.container}
        
        >
            <FlatList
            data={planets}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
                <TouchableOpacity
                onPress={()=>
                    navigation.navigate('Detalles', { planet: item.id })
                }>
                    <Text
                    style={
                        styles.planetName
                    }
                    >{item.name}</Text>
                </TouchableOpacity>
            )}>
                </FlatList>
        </View>
    );
 
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:16,
    },
    planetName:{
        fontSize:15,
        color:'white',
        backgroundColor: '#781cff',
        paddingLeft:'10px',
        borderRadius: '4px',
        paddingTop: '10px',
        paddingBottom: '10px',
        marginBottom: '11px',
    }
})