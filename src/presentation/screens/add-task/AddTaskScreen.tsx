import { SafeAreaView } from 'react-native-safe-area-context'
import { AddTaskRequest } from '../../../models/Task'
import { useState } from 'react'
import { AppButton } from '../../components/button/AppButton'
import { AppTextInput } from '../../components/input/AppTextInput';
import { useAddTaskMutation } from '../../../services/tasks';
import { Alert } from 'react-native';

export const AddTaskScreen = () => {

  const [addTask] = useAddTaskMutation()


  const [task, setTask] = useState<AddTaskRequest>({
    title: '',
    description: '',
    status: false
  })

  const hadleAddTask = () => {
    if (!task.title && !task.description) {
      Alert.alert('Title and Description are required')
      return
    }
    addTask(task)

    setTask({
      title: '',
      description: '',
      status: false
    })
  }

  return (
    <SafeAreaView style={{ paddingHorizontal: 24 }}>
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
      <AppButton 
        title="Add Task"
        onPress={hadleAddTask}
      />
    </SafeAreaView>
  )
}