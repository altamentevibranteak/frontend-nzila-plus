import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

type Props = TextInputProps & { label?: string };

const Input: React.FC<Props> = ({ label, style, ...rest }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, style]} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6 }
});

export default Input;
