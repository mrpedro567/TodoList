import React, { useState, useEffect } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function EditTask({ navigation }){
   const [task, setTask] = useState({});
   const [nameT, setNameT] = useState('');
   const id = navigation.getParam('_id');

   async function load(){
      const response = await api.post('/task/find',{
         'taskid' : id
      });

      let t = response.data;

      setTask(t);
   }

   useEffect(() => {
      load();
   }, []);

   function handleStatusChange(){
      if(task.status){
         setTask({
            name: task.name,
            status: false,
         });
      }
      else{
         setTask({
            name: task.name,
            status: true,
         });
      }
   }

   function handleDone(){
      if(nameT == ''){
         setNameT(task.name);
      }

      setTask({ 
         name: nameT, 
         status: task.status,
      });
      console.log(nameT);
      console.log(task);
      
      api.post('/task/edit', {
         'id': id, 
         'todo': task,
      });

      navigation.navigate('Tasks');
   }

   function loadButton(tt){
      if(tt.status){
         return(
            <View>
               <TouchableOpacity style={styles.buttonEnd} onPress={() => {handleStatusChange() }}>
                  <MaterialIcons name='check' style={styles.end} size={25} />
               </TouchableOpacity>
            </View>
         );
      }
      else{
         return(
            <View>
               <TouchableOpacity style={styles.buttonTodo} onPress={() => {handleStatusChange() }}>
                  <MaterialIcons name='close' styles={styles.todo} size={25} />
               </TouchableOpacity>
            </View>
         );
      }
   }

   return(
      <> 
         <View style={styles.addTaskPg}>
            <TextInput placeholder={task.name} style={styles.input} onSubmitEnding={(txt) => { setNameT(txt) }} />
            <View style={{flexDirection: 'row', marginTop: 10}}>
               <Text style={styles.dnTxt}>Encerrada: </Text>
               {loadButton(task)}   
            </View>
         </View>
         <View style={styles.doneButton}>
            <TouchableOpacity style={styles.done} onPress={() => { handleDone()}}>
               <MaterialIcons name='done' size={20} style={{color: '#fff'}}/>
            </TouchableOpacity>
         </View>
      </>

   );

}

const styles = StyleSheet.create({
   buttonEnd: {
      width: 30, 
      height: 30,
      borderRadius: 15,
      backgroundColor: '#269464',
      flexDirection: 'row', 
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
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginLeft: '15%',
      marginTop: 12
   },

   end: {
      color: '#fff'
   }, 

   todo: {
      color: '#fff'
   }, 

   dnTxt: {
      fontSize: 19,
      color: '#272727', 
      fontWeight: 'bold', 
      marginLeft: 25,
      marginTop: 15,

   },
   
   input: {
      color: '#fff',
      height: 60,
      width: '97%',
      marginLeft: 5,
      marginTop: 20,
      fontSize: 18,
      borderRadius: 30,
      padding:20,
      backgroundColor: '#272727', 
      borderWidth: 1,
   },

   addTaskPg: {
      backgroundColor: '#f8f8f8', 
      flex: 1,
   }, 

   doneButton: {
      position: 'absolute',
      bottom: 15, 
      right: 20,
      flex: 1,
      
   }, 

   done: {
      width: 60, 
      height: 60,
      borderRadius: 30,
      backgroundColor: '#868cfc',
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center',
   }
});

export default EditTask;