import { Text, Pressable, StyleSheet } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
}

export const AppButton = ({ onPress, title }: AppButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
  },
});