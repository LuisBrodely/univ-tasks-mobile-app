import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Task,
} from "react-native";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../../services/tasks";
import { UpdateTaskRequest } from "../../../models/Task";

export const HomeScreen = () => {
  const { data, error, isLoading } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleUpdateTask = (id: string) => {
    const uptadedTask: UpdateTaskRequest = {
      _id: id,
      status: true,
    };

    updateTask(uptadedTask);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error.</Text>;
  }

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <FlatList
        data={data?.data}
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
                <Text>{item.status ? 'Completado' : 'Completar'}</Text>
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
        keyExtractor={(item) => item._id}
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
