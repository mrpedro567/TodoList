import React, { useState, useEffect } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

function EditTask({ navigation }){
   //Estados da task
   const [task, setTask] = useState({});
   const [nameT, setNameT] = useState('');
   const [newDay, setNewDay] = useState();
   const [newMonth, setNewMonth] = useState();
   const [newYear, setNewYear] = useState();
   const category = navigation.getParam('cat');
   const id = navigation.getParam('_id');

   //carregar dados do BD
   async function load(){
      try{
         const response = await api.post('/task/find',{
         'taskid' : id
         });

         let t = response.data;

         setTask(t);
      }
      catch(e){
         console.log(e);
      }
   }

   //Envio de informações da edição ao Bd e retorno para task Page
   async function handleDone(){
      //check se houve mudança de nome
      if(nameT == '' || nameT == null){
         setNameT(task.name);
      }

      //check se houve mudança da data e manda os dados p/ o DB
      if(newDay == undefined && newMonth == undefined && newYear == undefined){
         await api.post('/task/edit', {
            'id': id, 
            'todo': {
               'name' : nameT,
               'status': task.status,
               'date' : [task.date[0], task.date[1], task.date[2]],
            },
         });
      }
      else{
         await api.post('/task/edit', {
            'id': id, 
            'todo': {
               'name' : nameT,
               'status': task.status,
               'date' : [newDay, newMonth, newYear],
            },
         });
      }

      navigation.navigate('Tasks', {Task_category: category});
   }

   //Envio do delete e retorna pra task page
   async function handleDelete(){
      await api.post('/task/delete', {
         'id' : id,
      });

      navigation.navigate('Tasks', {Task_category: category});
   }

   //Troca de Status
   function handleStatusChange(){
      if(task.status){
         setTask({
            name: task.name,
            status: false,
            date: task.date
         });
      }
      else{
         setTask({
            name: task.name,
            status: true,
            date: task.date
         });
      }
   }

   //Função para renderizar botão de status
   function loadButton(tt){
      if(tt.status){
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
      if(task.date != undefined){
         return (
            <View style={{marginLeft: 15, flexDirection: 'row'}}>
               <TextInput keyboardType='number-pad' placeholder={task.date[0]} style={styles.dateInput} defaultValue={newDay} onChangeText={ (dt) => setNewDay(dt)} onSubmitEnding={(dt) => { setNewDay(dt) }}/>
               <Text style={{fontSize: 35, marginLeft: 10}}>/</Text>
               <TextInput keyboardType='number-pad' placeholder={task.date[1]} style={styles.dateInput} defaultValue={newMonth} onChangeText={ (dt) => setNewMonth(dt)} onSubmitEnding={(dt) => { setNewMonth(dt) }} />
               <Text style={{fontSize: 35, marginLeft: 10}}>/</Text>
               <TextInput keyboardType='number-pad' placeholder={task.date[2]} style={styles.dateInput}  defaultValue={newYear} onChangeText={ (dt) => setNewYear(dt)} onSubmitEnding={(dt) => { setNewYear(dt) }}/>
            </View>
      );
      }
   }

   //Executar Load inicial 
   useEffect( () => {
      load();

      setNameT(task.name);
   }, []);


   return(
      <> 
         <View style={styles.addTaskPg}>
            <TextInput placeholder={task.name} style={styles.input} defaulValue={nameT} onChangeText={ (txt) => setNameT(txt)} onSubmitEnding={(txt) => { setNameT(txt) }} />
            <View style={{flexDirection: 'row', marginTop: 10}}>
               <Text style={styles.dnTxt}>Encerrada: </Text>
               {loadButton(task)}   
            </View>
            <View style={{flexDirection: 'row'}}>
               <Text style={styles.dnTxt}>Data </Text>
               <Text style={styles.obsTxt}>(Formato dd/mm/aaaa)</Text>
               <Text style={styles.obsTxt}>:</Text>
            </View>
            {renderDate()}
         </View>
         <View style={styles.doneButton}>
            <TouchableOpacity style={styles.delete} onPress={() => { handleDelete()}} >
               <MaterialIcons name='delete' size={26} style={{color: '#fff'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.done} onPress={() => { handleDone()}}>
               <MaterialIcons name='done' size={26} style={{color: '#fff'}}/>
            </TouchableOpacity>
         </View>
      </>

   );

}

//Styles
const styles = StyleSheet.create({
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

   dnTxt: {
      fontSize: 20,
      color: '#272727', 
      fontWeight: 'bold', 
      marginLeft: 25,
      marginTop: 15,
   },

   obsTxt: {
      fontSize: 15,
      color: '#272727', 
      fontWeight: 'bold', 
      marginLeft: 5,
      marginTop: 19,
      marginBottom: 15
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