import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text,  } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';


function Tasks({navigation}){

   const [category, setCategory ] = useState('');
   const [tasks, setTasks] = useState([]);

   async function loadTask(){
      const response = await api.get('/task/index');
      var ts = [];

      response.data.map((t) => {
         ts = [...ts, t];
      });

      //console.log(ts);
      setTasks(ts);
   }

   useEffect(() => {
      setCategory(navigation.getParam('Task_category'));
      loadTask();
   }, []);


   return (
      <>
         <View style={styles.taskPage}>
            { 
               tasks.map((task) => {
                  if(task.category == category){
                     //console.log('Foi');
                     if(task.status == true){
                        return(
                           <TouchableOpacity key={task._id} style={styles.taskDoneButton} onPress={ ()=> {
                             navigation.navigate('EditTask', {_id: task._id});
                           }}>
                              <Text style={styles.taskText}>{task.name}</Text>
                           </TouchableOpacity>
                        );
                     }
                     else{
                        return(
                           <TouchableOpacity key={task._id} style={styles.taskUndoneButton} onPress={ ()=> {
                              navigation.navigate('EditTask', {_id: task._id});
                           }}>                                                               
                              <Text style={styles.taskText}>{task.name}</Text>
                           </TouchableOpacity>
                        );
                     }
                  }
               })
            }

         </View>
            <View style={styles.addButton}>
               <TouchableOpacity style={styles.addTask} > 
                  <MaterialIcons name='more-horiz'size={20} style={{color: '#fff'}}/>
               </TouchableOpacity>
            </View>
      </>
   );
};

const styles = StyleSheet.create({
   taskText: {
      color: '#fff', 
      fontSize: 20,
      fontWeight: 'bold',
   },

   taskDoneButton: {
      position: 'relative',
      backgroundColor: '#269464', 
      width: '40%',
      height: '20%',
      marginTop: 40,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      elevation: 5,
      
   }, 

   taskUndoneButton: {
      position: 'relative',
      backgroundColor: '#ad2121', 
      width: '40%',
      height: '20%',
      marginTop: 40,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      elevation: 5,

   },

   taskPage: {
      backgroundColor: '#fafafa', 
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
   }, 

   addButton: {
         position: 'absolute',
         bottom: 15, 
         right: 20,
   },

   addTask: {
         width: 60, 
         height: 60,
         borderRadius: 30,
         backgroundColor: '#868cfc',
         flexDirection: 'row', 
         justifyContent: 'center', 
         alignItems: 'center',
      },

})

export default Tasks;
