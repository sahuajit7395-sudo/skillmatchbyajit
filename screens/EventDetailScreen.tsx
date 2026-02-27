import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

const EventDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  if (!route.params || !route.params.event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Data</Text>
      </View>
    );
  }

  const { title, location, skills } = route.params.event;

  const handleApply = () => {
    Alert.alert('Application Submitted');
    navigation.navigate('VolunteerDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{location}</Text>
      <Text style={styles.sectionTitle}>Skills</Text>
      <Text style={styles.skillsText}>{skills}</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={handleApply}>
        <Text style={styles.primaryButtonText}>Apply as Volunteer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetailScreen;

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
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  skillsText: {
    fontSize: 14,
    color: '#2563eb',
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


