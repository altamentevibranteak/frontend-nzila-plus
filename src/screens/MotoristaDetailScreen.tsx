import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as MotoristaService from '../api/motoristaService';
import Loading from '../components/Loading';
import { useAppRoute } from '../hooks/navigation';
import { Motorista } from '../types';

const MotoristaDetailScreen: React.FC = () => {
  const route = useAppRoute<'MotoristaDetail'>();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [m, setM] = useState<Motorista | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setM(await MotoristaService.getMotorista(id));
      } catch (e) {
      } finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <Loading />;
  if (!m) return <Text style={{ padding: 16 }}>Not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motorista {m.id}</Text>
      <Text>Telefone: {m.telefone}</Text>
      <Text>BI: {m.bi}</Text>
      <Text>Carta: {m.carta_conducao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontWeight: '700', fontSize: 18, marginBottom: 8 } });

export default MotoristaDetailScreen;
