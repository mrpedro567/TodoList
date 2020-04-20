import React, { useState, useEffect } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

function EditTask({ navigation }){
   const [categoryName, setCategoryName] = useState({});
   const [nameTxt, setNameTxt] = useState('');
   const [id, setId] = useState(navigation.getParam('id'));

   async function loadCategory(){
      const response = await api.post('/cat/find', {
        'id': id
      });
   
      let cat = response.data;
      setCategoryName(cat.name);
      setNameTxt(cat.name);
   }

   async function handleDone(){
      const response = await api.post('/cat/edit', {
         'id': id, 
         'name': categoryName,
      });

      navigation.navigate('Categories', {cat: categoryName});
   }

   async function handleDelete(){
      const response = await api.post('/cat/delete', {
         'id': id
      });

      navigation.navigate('Categories', {cat: categoryName});
   }

   useEffect(() => {
      loadCategory();
   }, []);

   return(
      <>
         <View> 
            <Text style={styles.inputLabel}>Nome da categoria</Text>
            <TextInput style={styles.input} placeholder={nameTxt} defaulValue={categoryName} onChangeText={(txt)=> setCategoryName(txt)} onSubmitEnding={(txt)=> {setCategoryName(txt)}}/>
         </View>
         <View style={styles.doneView}>
            <TouchableOpacity style={styles.delete} onPress={() => { handleDelete()}} >
               <MaterialIcons name='delete' size={26} style={{color: '#fff'}}/>
            </TouchableOpacity>
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

   delete: {
      width: 60, 
      height: 60,
      borderRadius: 30,
      backgroundColor: '#ad2121',
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 20
   }, 
});

export default EditTask;