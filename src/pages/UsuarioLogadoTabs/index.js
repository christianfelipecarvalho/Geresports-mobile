import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Agenda from "../Agenda";
import Home from "../Home";
import Local from "../Local";
import Usuarios from "../Usuarios";

const Tab = createBottomTabNavigator();
export function UsuarioLogadoTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Usuarios') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          // Adicione mais condições para outras telas

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} 
       options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="Local" component={Local} 
       options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="location" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Agenda" component={Agenda}
       options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
      />
    </Tab.Navigator>
  );
}
