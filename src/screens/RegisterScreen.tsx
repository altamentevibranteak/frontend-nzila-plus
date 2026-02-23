import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import * as UserService from '../api/userService';
import { RegisterRequest } from '../types';

const RegisterScreen: React.FC = () => {
  const [form, setForm] = useState<RegisterRequest>({ username: '', password: '', email: '', tipo_usuario: 'cliente', bi: '', telefone: '', morada: '', carta_conducao: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await UserService.register(form);
      Alert.alert('Success', 'Account created. Please sign in.');
    } catch (err: unknown) {
      const msg = require('../utils/error').getErrorMessage(err);
      setError(msg || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Input label="Username" value={form.username} onChangeText={(v) => setForm((s) => ({ ...s, username: v }))} />
      <Input label="Email" value={form.email} onChangeText={(v) => setForm((s) => ({ ...s, email: v }))} />
      <Input label="Password" value={form.password} onChangeText={(v) => setForm((s) => ({ ...s, password: v }))} secureTextEntry />
      <Input label="BI" value={form.bi} onChangeText={(v) => setForm((s) => ({ ...s, bi: v }))} />
      <Input label="Telefone" value={String(form.telefone || '')} onChangeText={(v) => setForm((s) => ({ ...s, telefone: v }))} />
      <Input label="Morada" value={String(form.morada || '')} onChangeText={(v) => setForm((s) => ({ ...s, morada: v }))} />
      <Button title={loading ? 'Creating...' : 'Create account'} onPress={handleRegister} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 8 }, error: { color: 'red', marginBottom: 8 } });

export default RegisterScreen;
