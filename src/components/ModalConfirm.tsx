import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ModalConfirm: React.FC<{ visible: boolean; title?: string; message?: string; onConfirm: () => void; onCancel: () => void }> = ({ visible, title, message, onConfirm, onCancel }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.backdrop}>
      <View style={styles.box}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {message ? <Text style={styles.msg}>{message}</Text> : null}
        <View style={styles.actions}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Confirm" onPress={onConfirm} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  box: { backgroundColor: '#fff', padding: 16, borderRadius: 8, width: '80%' },
  title: { fontWeight: '700', marginBottom: 8 },
  msg: { marginBottom: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' }
});

export default ModalConfirm;
