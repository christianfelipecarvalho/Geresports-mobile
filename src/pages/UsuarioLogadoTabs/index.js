import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Usuarios from "../Usuarios";

const Tab = createBottomTabNavigator();
export function UsuarioLogadoTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Usuarios" component={Usuarios} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }
  