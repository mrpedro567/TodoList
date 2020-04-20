import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Categories from './pages/Category/Categories';
import AddCategory from './pages/Category/AddCategory';
import EditCategory from './pages/Category/EditCategory';
import Tasks from './pages/Tasks/Tasks';
import EditTask from './pages/Tasks/EditTask';
import AddTask from './pages/Tasks/AddTask';

const Routes = createAppContainer(
   createStackNavigator({
      Categories: {
         screen: Categories,

         navigationOptions: {
            title: 'Categorias',
         }
      },

      AddCategory: {
         screen: AddCategory,

         navigationOptions: {
            title: 'Adicionar Nova Categoria'
         }
      },

      EditCategory: {
         screen: EditCategory,

         navigationOptions: {
            title: 'Editar Categoria',
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