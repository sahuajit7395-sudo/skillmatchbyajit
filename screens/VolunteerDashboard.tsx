import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const appliedEvents = [
  { id: '1', title: 'Flood Relief Mumbai', status: 'Pending' },
  { id: '2', title: 'Earthquake Support Gujarat', status: 'Approved' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'VolunteerDashboard'>;

const VolunteerDashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Volunteer Dashboard</Text>
      <Text style={styles.subtitle}>Your recent applications.</Text>

      <FlatList
        data={appliedEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.event}>{item.title}</Text>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Applications Yet</Text>
        }
      />

      <View style={styles.footer}>
        <Button
          title="Browse More Events"
          onPress={() => navigation.navigate('Events')}
        />
      </View>
    </View>
  );
};

export default VolunteerDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  event: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  footer: {
    marginTop: 'auto',
  },
});


