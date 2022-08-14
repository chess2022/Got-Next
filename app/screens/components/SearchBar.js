import * as React from "react";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

export default () => {
  const [value, setValue] = React.useState("");
  return (
    <SearchBar
      platform="default"
      loadingProps={{}}
      onChangeText={(newVal) => setValue(newVal)}
      onClearText={() => console.log(onClearText())}
      placeholder="Enter city, state"
      placeholderTextColor="#888"
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log(onCancel())}
      value={value}
    />
  );
};
