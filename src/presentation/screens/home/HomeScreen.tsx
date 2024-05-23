import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../../services/tasks";
import { UpdateTaskRequest } from "../../../models/Task";
import { useNetworkStatus } from "../../../hooks/useNetworkStatus";
import {
  updateLocalTask,
  deleteLocalTask,
  selectLocalTasks,
  syncTasks,
  clearLocalTasks,
  setTasks,
} from "../../../features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { setNetworkStatus } from "../../../features/network/networkSlice";

export const HomeScreen = () => {
  const { data, error, isLoading } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  // const isConnected = useAppSelector((state) => state.network.isConnected);
  const isConnected = useNetworkStatus();
  const dispatch = useAppDispatch();
  const localTasks = useAppSelector(selectLocalTasks);

  useEffect(() => {
    // Sync tasks when connection is re-established
    if (isConnected) {
      dispatch(syncTasks());
    }
  }, [isConnected, dispatch]);

  useEffect(() => {
    // Set remote tasks to the state when data is fetched
    if (data) {
      dispatch(setTasks(data.data));
    }
  }, [data, dispatch]);

  const handleDeleteTask = (id: string) => {
    if (isConnected) {
      deleteTask(id);
    } else {
      dispatch(deleteLocalTask(id));
    }
  };

  const handleUpdateTask = (id: string) => {
    const updatedTask: UpdateTaskRequest = {
      status: true,
      _id: id,
    };
    if (isConnected) {
      updateTask({ task: updatedTask, id });
    } else {
      dispatch(updateLocalTask(updatedTask));
    }
  };

  const deleteAllTasks = () => {
    dispatch(clearLocalTasks());
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error.</Text>;
  }

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <View>
        <Text>
          Network Status: {isConnected ? "Connected" : "Disconnected"}
        </Text>
        <Button
          title="Sync"
          onPress={() => dispatch(setNetworkStatus(!isConnected))}
        />
        <Button
          title="Borrar todo"
          onPress={() => deleteAllTasks()}
        />
      </View>
      <FlatList
        data={isConnected ? data?.data : localTasks} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.status}>
                {item.status ? "Terminado" : "Pendiente"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => handleUpdateTask(item._id)}
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderRadius: 6,
                }}
                disabled={item.status}
              >
                <Text>{item.status ? "Completado" : "Completar"}</Text>
              </Pressable>
              <Pressable
                onPress={() => handleDeleteTask(item._id)}
                style={{
                  backgroundColor: "#EF3166",
                  padding: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white" }}>Borrar</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 6,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: "white",
    fontSize: 14,
    fontWeight: "light",
  },
  status: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "light",
  },
});
