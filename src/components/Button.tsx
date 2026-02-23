import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
};

const Button: React.FC<Props> = ({ title, onPress, loading, disabled, color }) => {
  return (
    <TouchableOpacity style={[styles.btn, disabled ? styles.disabled : {}, color ? { backgroundColor: color } : {}]} onPress={onPress} disabled={disabled || !!loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: { backgroundColor: '#007aff', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  text: { color: '#fff', fontWeight: '600' },
  disabled: { opacity: 0.6 }
});

export default Button;
