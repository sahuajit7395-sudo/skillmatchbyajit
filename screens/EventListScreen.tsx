import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const events = [
  { id: '1', title: 'Flood Relief Mumbai', location: 'Mumbai', skills: 'Medical, Rescue' },
  { id: '2', title: 'Earthquake Support Gujarat', location: 'Gujarat', skills: 'Construction, First Aid' },
  { id: '3', title: 'Cyclone Help Chennai', location: 'Chennai', skills: 'Logistics, Food Distribution' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Events'>;

const EventListScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.location}</Text>
            <Text style={styles.skillsLabel}>Skills:</Text>
            <Text style={styles.skillsText}>{item.skills}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EventDetail', { event: item })}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events available yet.</Text>
        }
      />
    </View>
  );
};

export default EventListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  skillsLabel: {
    fontSize: 12,
    color: '#888',
  },
  skillsText: {
    fontSize: 14,
    color: '#2563eb',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
});


