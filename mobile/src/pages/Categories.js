import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Categories({ navigation }){
   const [cat, setCat] = useState([]);
   
   async function load(){
      const response = await api.get('/cat/index');

      const cats = response.data;
      let tmp = [];
      cats.map((k) => {
         tmp = [...tmp, k.name];
      });

      setCat(tmp);
   }

   useEffect(() => {
      load();
   }, []);

   return (
      <>
         <View style={styles.catPage}>
            {  
               cat.map((category, index) =>{
                  return(
                     <TouchableOpacity key={index} style={styles.category} onPress={() =>{
                        navigation.navigate('Tasks', { Task_category: category})
                     }}>
                        <Text style={styles.categoryText}> {category} </Text>
                     </TouchableOpacity>
                  )
               })    
            }
            

         </View>

         <View style={styles.addButton}>
            <TouchableOpacity style={styles.addCategories}>
               <MaterialIcons name='more-horiz' size={20} style={{color: '#fff'}}/>
            </TouchableOpacity>
         </View>
      </>
   );

}

const styles = StyleSheet.create({
      categoryText: {
         fontSize: 20, 
         color: '#f8f8f8',
         marginLeft: 10, 
         textAlign: 'center',
         fontWeight: 'bold'    
      },
      
      catPage: {
         flex: 1,
         backgroundColor: '#fafafa',
      },

      category: {
         height: 70,
         width: '97%',
         marginTop: 20,
         marginLeft: 5, 
         marginRight: 5,
         backgroundColor: '#515fc8',
         justifyContent: 'center', 
         borderRadius: 35, 
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 12,
         },
         shadowOpacity: 0.58,
         shadowRadius: 16.00,

         elevation: 24,
         
      },

      addButton: {
         position: 'absolute',
         bottom: 15, 
         right: 20,
         flex: 1,

      },

      addCategories: {
         width: 60, 
         height: 60,
         borderRadius: 30,
         backgroundColor: '#868cfc',
         flexDirection: 'row', 
         justifyContent: 'center', 
         alignItems: 'center',
      },
})

export default Categories;