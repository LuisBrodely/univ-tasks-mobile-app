import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import { AddTaskScreen } from "../screens/add-task/AddTaskScreen";

const Tab = createBottomTabNavigator();

export const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} />
    </Tab.Navigator>
  );
};
