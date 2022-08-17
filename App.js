import React from "react";
import "./app/config/firebase";
import RootNavigation from "./app/navigation";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return <RootNavigation />;
}
