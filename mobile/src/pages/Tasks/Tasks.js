import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, RefreshControl} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

function Tasks({navigation}){
   //Estado para tarefas e categorias
   const [category, setCategory ] = useState('');
   const [tasks, setTasks] = useState([]);

   //Carregar dados do Banco de Dados 
   async function loadTask(){
      const response = await api.get('/task/index');
      var ts = [];

      response.data.map((t) => {
         ts = [...ts, t];
      });

      setTasks(ts);
   }

   //Carrega e define Style para datas de acordo com a data atual
   function loadDate(t){
      if(t.date[0] != undefined && t.date[1] != undefined && t.date[2] != undefined){
         return(
            <Text style={styles.date}>{t.date[0]+'/'+t.date[1]+'/'+t.date[2]}</Text>
         );         
      }
      else if(t.date[0] != undefined && t.date[1] != undefined){
         return(
               <Text style={styles.date}>{t.date[0]+'/'+t.date[1]}</Text>
         );      
      }
      else if(t.date[1] != undefined && t.date[2] != undefined){
         return(
               <Text style={styles.date}>{t.date[1]+'/'+t.date[2]}</Text>
         );
      }
   }
   
   //Executar loadTask e carregar categoria quando abrir a pagina
   useEffect(() => {
      setCategory(navigation.getParam('Task_category'));
      loadTask();
   }, [navigation]);

   return (
      <>
         <View style={styles.taskPage}>
            { 
               tasks.map((task) => {
                  if(task.category == category){
                     if(task.status == true){
                        return(
                           <TouchableOpacity key={task._id} style={styles.taskDoneButton} onPress={ ()=> {
                             navigation.navigate('EditTask', {_id: task._id, cat: category});
                           }}>
                              <Text style={styles.taskText}>{task.name}</Text>
                              {loadDate(task)}
                           </TouchableOpacity>
                        );
                     }
                     else{
                        return(
                           <TouchableOpacity key={task._id} style={styles.taskUndoneButton} onPress={ ()=> {
                              navigation.navigate('EditTask', {_id: task._id, cat: category});
                           }}>                                                               
                              <Text style={styles.taskText}>{task.name}</Text>
                              {loadDate(task)}
                           </TouchableOpacity>
                        );
                     }
                  }
               })
            }
         </View>
            <View style={styles.addButton}>
               <TouchableOpacity style={styles.addTask} onPress={ () => {
                  navigation.navigate('AddTask', {category: category});
               }} > 
                  <MaterialIcons name='add'size={20} style={{color: '#fff'}} />
               </TouchableOpacity>
            </View>
      </>
   );
};

//Estilização
const styles = StyleSheet.create({
   taskText: {
      color: '#fff', 
      fontSize: 20,
      fontWeight: 'bold',
   },

   date: {
      color: '#fff',
      fontSize: 20, 
      fontWeight: 'bold',
      marginTop: 5,
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
      marginTop: 10,
      borderRadius: 30,
      backgroundColor: '#868cfc',
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center',
      },

})

export default Tasks;
