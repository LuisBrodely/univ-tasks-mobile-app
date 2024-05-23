import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./src/presentation/navigator/RootTabs";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { useEffect } from "react";
import { monitorNetwork } from "./src/services/network";

export default function App() {
  useEffect(() => {
    monitorNetwork();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootTabs />
      </NavigationContainer>
    </Provider>
  );
}
