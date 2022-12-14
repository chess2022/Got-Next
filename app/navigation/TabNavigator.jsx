import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GetPugs from "../screens/Map/PugMapScreen";
import ProfileStack from "./ProfileStack";
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
          bottom: 0,
          elevation: 0,
          backgroundColor: "#fff",
          height: 90,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Pick-up Games"
        component={GetPugs}
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
        component={ProfileStack}
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
