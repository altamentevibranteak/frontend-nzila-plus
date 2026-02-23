import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useAppNavigation, useAppRoute } from '../hooks/navigation';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import * as CargaService from '../api/cargaService';
import { CargaRequest } from '../types';
import { validateRequired } from '../utils/validation';

const CargaFormScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useAppRoute<'CargaForm'>();
  const id = route.params?.id;
  const [loading, setLoading] = useState<boolean>(!!id);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CargaRequest>({ titulo: '', descricao: '', peso_kg: '', origem: '', destino: '' });

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const c = await CargaService.getCarga(id);
          setForm({
            titulo: c.titulo,
            descricao: c.descricao,
            peso_kg: c.peso_kg,
            origem: c.origem,
            destino: c.destino,
            origem_coords: c.origem_coords || undefined,
            destino_coords: c.destino_coords || undefined,
            preco_frete: c.preco_frete || undefined,
            tipo_servico: c.tipo_servico,
            data_agendamento: c.data_agendamento || undefined,
            acompanhada: c.acompanhada,
            categoria: c.categoria,
            motorista: c.motorista || undefined,
          } as CargaRequest);
        } catch (e) {
          // ignore
        } finally { setLoading(false); }
      })();
    }
  }, [id]);

  const handleSave = async () => {
    if (!validateRequired(form.titulo) || !validateRequired(form.descricao) || !validateRequired(form.peso_kg) || !validateRequired(form.origem) || !validateRequired(form.destino)) {
      Alert.alert('Validation', 'Please fill required fields');
      return;
    }
    setSaving(true);
    try {
      if (id) {
        await CargaService.updateCarga(id, form);
      } else {
        await CargaService.createCarga(form);
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
      <Input label="Título" value={form.titulo} onChangeText={(v) => setForm((s) => ({ ...s, titulo: v }))} />
      <Input label="Descrição" value={form.descricao} onChangeText={(v) => setForm((s) => ({ ...s, descricao: v }))} />
      <Input label="Peso (kg)" value={form.peso_kg} onChangeText={(v) => setForm((s) => ({ ...s, peso_kg: v }))} />
      <Input label="Origem" value={form.origem} onChangeText={(v) => setForm((s) => ({ ...s, origem: v }))} />
      <Input label="Destino" value={form.destino} onChangeText={(v) => setForm((s) => ({ ...s, destino: v }))} />
      <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} loading={saving} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 } });

export default CargaFormScreen;
