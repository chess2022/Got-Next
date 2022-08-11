import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FindPugScreen from "../screens/FindPugScreen";
import Map from "../screens/Map/GoogleMap2";
import AccountScreen from "../screens/AccountScreen";
import ChatStack from "./ChatStack";
import { View, Text } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          flexDirection: "row",
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 90,
          shadowColor: "grey",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Pick-up Games"
        component={Map}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <View style={{ width: 30, height: 30 }}>
                <Ionicons name="basketball" size={32} color="black" />
              </View>
              <Text style={{ color: focused ? "#fc5603" : "#748c94" }}>
                PUGs
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <View style={{ width: 30, height: 30 }}>
                <FontAwesome name="user" size={28} color="black" />
              </View>
              <Text style={{ color: focused ? "#fc5603" : "#748c94" }}>
                ACCOUNT
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Got Next"
        component={ChatStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <View style={{ width: 30, height: 30 }}>
                <Ionicons name="chatbox" size={26} color="black" />
              </View>
              <Text style={{ color: focused ? "#fc5603" : "#748c94" }}>
                CHAT
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
