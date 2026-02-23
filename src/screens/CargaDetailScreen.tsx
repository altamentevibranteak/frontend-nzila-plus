import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as CargaService from '../api/cargaService';
import Loading from '../components/Loading';

import { useAppRoute } from '../hooks/navigation';
import { Carga } from '../types';

const CargaDetailScreen: React.FC = () => {
  const route = useAppRoute<'CargaDetail'>();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [carga, setCarga] = useState<Carga | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setCarga(await CargaService.getCarga(id));
      } catch (e) {
        // ignore
      } finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <Loading />;
  if (!carga) return <Text style={{ padding: 16 }}>Not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carga.titulo}</Text>
      <Text>Weight: {carga.peso_kg}</Text>
      <Text>From: {carga.origem}</Text>
      <Text>To: {carga.destino}</Text>
      <Text>Created: {new Date(carga.data_criacao).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontWeight: '700', fontSize: 18, marginBottom: 8 } });

export default CargaDetailScreen;
