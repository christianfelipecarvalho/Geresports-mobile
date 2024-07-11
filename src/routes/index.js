import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Confirmacao from "../pages/Confirmacao/index.js";
import DetalhesUsuario from "../pages/DetalhesUsuarios/index.js";
import Forgot from "../pages/Forgot/index.js";
import Login from "../pages/Login/index.js";
import NovoUsuario from "../pages/NovoUsuario/index.js";
import { UsuarioLogadoTabs } from "../pages/UsuarioLogadoTabs/index.js";
import Welcome from "../pages/Welcome";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function Routes() {  
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome" 
        component={Welcome}
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="Forgot" 
        component={Forgot} 
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name="Confirmacao" 
        component={Confirmacao} 
        />
      <Stack.Screen 
        name="UsuarioLogadoTabs" 
        component={UsuarioLogadoTabs} 
        options={{UsuarioLogadoTabs: false, headerShown: false}}
        />
      <Stack.Screen 
        name="DetalhesUsuario" 
        component={DetalhesUsuario} 
        options={{DetalhesUsuario: false, headerShown: false}}
        />
      <Stack.Screen 
        name="NovoUsuario" 
        component={NovoUsuario} 
        options={{NovoUsuario: false, headerShown: false}}
        />
    </Stack.Navigator>
  );
}