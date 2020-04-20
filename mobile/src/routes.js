import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Categories from './pages/Categories';
import Tasks from './pages/Tasks';
import EditTask from './pages/EditTask';
import AddTask from './pages/AddTask';

const Routes = createAppContainer(
   createStackNavigator({
      Categories: {
         screen: Categories,

         navigationOptions: {
            title: 'Categorias',
         }
      }, 
      Tasks: {
         screen: Tasks, 

         navigationOptions: {
            title: 'Tarefas',
         }
      },

      AddTask: {
         screen: AddTask,

         navigationOptions: {
            title: 'Adicionar Nova Tarefa',
         }
      },

      EditTask: {
         screen: EditTask,

         navigationOptions: {
            title: 'Editar Tarefa',
         }
      }
   }, {
      defaultNavigationOptions: {
         headerStyle: {
            backgroundColor: '#868cfc',
         }, 

         headerTitleStyle: {
            fontWeight: 'bold',
         },

         headerTintColor: '#fff',
      }
   })
);

export default Routes;