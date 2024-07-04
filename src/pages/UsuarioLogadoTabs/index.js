import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Agenda from "../Agenda";
import Home from "../Home";
import Local from "../Local";
import Usuarios from "../Usuarios";

const Tab = createBottomTabNavigator();
export function UsuarioLogadoTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} 
          // options={{
          //   tabBarIcon: ({color, size}) => {
          //     return <AntDesign name="enviromento" size={size} color={color} />
          //   }
          // }}
        />
        <Tab.Screen name="Usuarios" component={Usuarios} options={{headerShown: false}}/>
        <Tab.Screen name="Local" component={Local} options={{headerShown: false}}/>
        <Tab.Screen name="Agenda" component={Agenda} />
      </Tab.Navigator>
    );
  }
  