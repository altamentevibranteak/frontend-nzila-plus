import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useAppNavigation, useAppRoute } from '../hooks/navigation';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import * as MotoristaService from '../api/motoristaService';
import { MotoristaRequest } from '../types';
import { validateRequired } from '../utils/validation';

const MotoristaFormScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useAppRoute<'MotoristaForm'>();
  const id = route.params?.id;
  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MotoristaRequest>({ telefone: '', bi: '', carta_conducao: '', user: 0 });

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const m = await MotoristaService.getMotorista(id);
          setForm({
            telefone: m.telefone,
            bi: m.bi,
            carta_conducao: m.carta_conducao,
            user: m.user,
            veiculo: m.veiculo || undefined,
          } as MotoristaRequest);
        } catch (e) {
          // ignore
        } finally { setLoading(false); }
      })();
    }
  }, [id]);

  const handleSave = async () => {
    if (!validateRequired(form.telefone) || !validateRequired(form.bi) || !validateRequired(form.carta_conducao) || !validateRequired(form.user)) {
      Alert.alert('Validation', 'Please fill required fields');
      return;
    }
    setSaving(true);
    try {
      if (id) {
        await MotoristaService.updateMotorista(id, form);
      } else {
        await MotoristaService.createMotorista(form);
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
      <Input label="Telefone" value={form.telefone} onChangeText={(v) => setForm((s) => ({ ...s, telefone: v }))} />
      <Input label="BI / ID Number" value={form.bi} onChangeText={(v) => setForm((s) => ({ ...s, bi: v }))} />
      <Input label="Carta de Condução" value={form.carta_conducao} onChangeText={(v) => setForm((s) => ({ ...s, carta_conducao: v }))} />
      <Input label="User ID" value={String(form.user)} onChangeText={(v) => setForm((s) => ({ ...s, user: parseInt(v, 10) || 0 }))} />
      <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} loading={saving} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 } });

export default MotoristaFormScreen;
