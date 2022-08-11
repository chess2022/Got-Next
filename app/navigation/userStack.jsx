import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./TabNavigator";

export default function UserStack() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
