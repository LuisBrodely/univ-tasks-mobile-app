import { SafeAreaView } from "react-native-safe-area-context";
import { AddTaskRequest } from "../../../models/Task";
import { useState } from "react";
import { AppButton } from "../../components/button/AppButton";
import { AppTextInput } from "../../components/input/AppTextInput";
import { useAddTaskMutation } from "../../../services/tasks";
import { Alert, View, Text, Button } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNetworkStatus } from "../../../hooks/useNetworkStatus";
import { addLocalTask } from "../../../features/tasks/tasksSlice";
import { setNetworkStatus } from "../../../features/network/networkSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

export const AddTaskScreen = () => {
  const [addTask] = useAddTaskMutation();
  // const isConnected = useAppSelector((state) => state.network.isConnected);
  const isConnected = useNetworkStatus();
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<AddTaskRequest>({
    _id: '',
    uuid: uuidv4(),
    title: "",
    description: "",
    status: false,
  });

  const handleAddTask = async () => {
    if (!task.title || !task.description) {
      Alert.alert("Title and Description are required");
      return;
    }

    if (isConnected) {
      addTask(task);
    } else {
      dispatch(addLocalTask(task));
    }

    setTask({
      _id: '',
      uuid: uuidv4(),
      title: "",
      description: "",
      status: false,
    });
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 24 }}>
      <View>
        <Text>
          Network Status: {isConnected ? "Connected" : "Disconnected"}
        </Text>
        <Button title="Sync" onPress={() => dispatch(setNetworkStatus(!isConnected))} />
      </View>
      <AppTextInput
        label="Title"
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
      />
      <AppTextInput
        label="Description"
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
      />
      <AppButton title="Add Task" onPress={handleAddTask} />
    </SafeAreaView>
  );
};
