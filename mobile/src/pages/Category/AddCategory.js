import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function AddCategory({ navigation }){
   const [categoryName, setCategoryName] = useState('');

   async function handleDone(){
      const response = await api.post('/cat/newCat', {
         'name': categoryName,
      });

      navigation.navigate('Categories', {cat: categoryName});
   }

   return(
      <>
         <View> 
            <Text style={styles.inputLabel}>Nome da categoria</Text>
            <TextInput style={styles.input} placeholder='Nome' defaulValue={categoryName} onChangeText={(txt)=> setCategoryName(txt)} onSubmitEnding={(txt)=> {setCategoryName(txt)}}/>
         </View>
         <View style={styles.doneView}>
            <TouchableOpacity style={styles.doneButton} onPress={() => { handleDone()}}>
               <MaterialIcons name='done' size={26} style={{color: '#fff'}}/>
            </TouchableOpacity>
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   inputLabel: {
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: 15,
      marginLeft: 20,
   }, 

   input: {
      color: '#fff',
      height: 55,
      width: '96%',
      marginLeft: 9,
      marginTop: 10,
      fontSize: 15,
      borderRadius: 30,
      padding:20,
      backgroundColor: '#272727', 
   },

   doneView: {
      position: 'absolute',
      bottom: 15, 
      right: 20,
      flex: 1,
      
   }, 

   doneButton: {
      width: 60, 
      height: 60,
      borderRadius: 30,
      backgroundColor: '#868cfc',
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 10
   }, 
});

export default AddCategory;