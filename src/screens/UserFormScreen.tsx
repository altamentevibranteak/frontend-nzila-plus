import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Input from '../components/Input';
import * as UserService from '../api/userService';
import Loading from '../components/Loading';
import { useAppRoute, useAppNavigation } from '../hooks/navigation';
import { User } from '../types';

const UserFormScreen: React.FC = () => {
  const route = useAppRoute<'UserForm'>();
  const navigation = useAppNavigation();
  const id = route.params?.id;
  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<User>>({ username: '', email: '', firstName: '', lastName: '' });

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const u = await UserService.getUser(id);
          setForm({ username: u.username, email: u.email, firstName: u.firstName || '', lastName: u.lastName || '' });
        } catch (e) {
          // ignore
        } finally { setLoading(false); }
      })();
    }
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await UserService.updateUser(id, form);
      } else {
        await UserService.createUser(form);
      }
      navigation.goBack();
    } catch (err: unknown) {
      const msg = require('../utils/error').getErrorMessage(err);
      Alert.alert('Error', msg || 'Save failed');
    } finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Input label="Username" value={String(form.username || '')} onChangeText={(v) => setForm((s) => ({ ...s, username: v }))} />
      <Input label="Email" value={String(form.email || '')} onChangeText={(v) => setForm((s) => ({ ...s, email: v }))} />
      <Input label="First name" value={String(form.firstName || '')} onChangeText={(v) => setForm((s) => ({ ...s, firstName: v }))} />
      <Input label="Last name" value={String(form.lastName || '')} onChangeText={(v) => setForm((s) => ({ ...s, lastName: v }))} />
      <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} disabled={saving} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 } });

export default UserFormScreen;
