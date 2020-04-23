import React, { useState, useEffect } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

function AddTask({ navigation }){
   const category = navigation.getParam('category');
   const [taskName, setTaskName] = useState('');
   const [taskStatus, setTaskStatus] = useState(false);
   const [newDay, setNewDay] = useState();
   const [newMonth, setNewMonth] = useState();
   const [newYear, setNewYear] = useState();

   async function handleDone(){
      const todo = await api.post('/task/newTodo', {
         'name': taskName,
         'category': category,
         'status': taskStatus,
         'date' : [newDay, newMonth, newYear],
      });

      navigation.navigate('Tasks', {Task_category: category});
   }

   //renderizar botão de status
   function loadButton(tt){
      if(taskStatus){
         return(
            <View>
               <TouchableOpacity style={styles.buttonEnd} onPress={() => {handleStatusChange() }}>
                  <MaterialIcons name='check' style={{color: '#fff'}} size={25} />
               </TouchableOpacity>
            </View>
         );
      }
      else{
         return(
            <View>
               <TouchableOpacity style={styles.buttonTodo} onPress={() => {handleStatusChange() }}>
                  <MaterialIcons name='close' style={{color: '#fff'}} size={25} />
               </TouchableOpacity>
            </View>
         );
      }
   }

    //Função para renderizar os inputs para datas
   function renderDate(){
      return (
         <View style={{marginLeft: 15, flexDirection: 'row', marginTop: 20}}>
            <TextInput keyboardType='number-pad' placeholder='dd' style={styles.dateInput} defaultValue={newDay} onChangeText={ (dt) => setNewDay(dt)} onSubmitEnding={(dt) => { setNewDay(dt) }}/>
            <Text style={{fontSize: 35, marginLeft: 10}}>/</Text>
            <TextInput keyboardType='number-pad' placeholder='mm' style={styles.dateInput} defaultValue={newMonth} onChangeText={ (dt) => setNewMonth(dt)} onSubmitEnding={(dt) => { setNewMonth(dt) }} />
            <Text style={{fontSize: 35, marginLeft: 10}}>/</Text>
            <TextInput keyboardType='number-pad' placeholder='aaaa' style={styles.dateInput}  defaultValue={newYear} onChangeText={ (dt) => setNewYear(dt)} onSubmitEnding={(dt) => { setNewYear(dt) }}/>
         </View>
      );
   
   }

   //Mundança do Status
   function handleStatusChange(){
      if(taskStatus){
         setTaskStatus(false);
      }
      else{
         setTaskStatus(true);
      }
   }

   return(
      <>
         <View>
            <Text style={styles.inputLabel}>Nome da Tarefa: </Text>
            <TextInput placeholder={'Nome'} style={styles.input} defaulValue={taskName} onChangeText={(txt)=> setTaskName(txt)} onSubmitEnding={(txt)=> {setTaskName(txt)}}/>
            <View style={{flexDirection: 'row', marginTop: 10}}>
               <Text style={styles.inputLabel}>Status: </Text>
               {loadButton()}
            </View>
            {renderDate()}
         </View>
         <View style={styles.doneView}>
            <TouchableOpacity style={styles.doneButton} onPress={() => { handleDone()}}>
               <MaterialIcons name='done' size={26} style={{color: '#fff'}}/>
            </TouchableOpacity>
         </View>
      </>
   );
};

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
      borderWidth: 1,
   },

   dateInput: {
      color: '#000',
      fontSize: 16,
      borderBottomColor: '#909090',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      width: 45,
      height: 35,
      marginLeft: 10
   },

    buttonEnd: {
      width: 30, 
      height: 30,
      borderRadius: 15,
      backgroundColor: '#269464',
      justifyContent: 'center', 
      alignItems: 'center', 
      marginLeft: '15%',
      marginTop: 12
   },

   buttonTodo: {
      width: 30, 
      height: 30,
      borderRadius: 15,
      backgroundColor: '#ad2121',
      justifyContent: 'center', 
      alignItems: 'center', 
      marginLeft: '15%',
      marginTop: 12
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

export default AddTask;