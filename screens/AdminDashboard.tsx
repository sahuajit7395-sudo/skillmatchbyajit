import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const AdminDashboard: React.FC = () => {
  const handleCreateEvent = () => {
    Alert.alert('New Event Created (Demo Only)');
  };

  const handleViewVolunteers = () => {
    Alert.alert('Showing Registered Volunteers (Demo Data)');
  };

  const handleUpdateStatus = () => {
    Alert.alert('Event Status Updated');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Quick admin actions (demo only).</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Create New Event</Text>
        <Button title="Create New Event" onPress={handleCreateEvent} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. View Registered Volunteers</Text>
        <Button title="View Registered Volunteers" onPress={handleViewVolunteers} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Update Event Status</Text>
        <Button title="Update Event Status" onPress={handleUpdateStatus} />
      </View>
    </View>
  );
};

export default AdminDashboard;

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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});


