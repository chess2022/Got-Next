import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import EditAccount from "../screens/components/EditAccount";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Edit Account" component={EditAccount} />
      </Stack.Navigator>
  );
}
