import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, { useState } from 'react';

interface AppTextInputProps extends TextInputProps {
  label: string;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  ...otherProps
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          focused && {
            borderColor: '#1a1a1a',
          },
        ]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#1a1a1a',
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D4DC',
    padding: 14,
    borderRadius: 8,
    marginTop: 6,
  },
});