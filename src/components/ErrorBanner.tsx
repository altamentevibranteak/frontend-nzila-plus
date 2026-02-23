import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorBanner: React.FC<{ message: string }> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({ container: { backgroundColor: '#fee', padding: 10, borderRadius: 6, marginBottom: 10 }, text: { color: '#900' } });

export default ErrorBanner;
