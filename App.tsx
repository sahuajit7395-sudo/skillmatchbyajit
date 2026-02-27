import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { EventProvider, useEventContext } from './EventContext';

const COLORS = {
  primary: '#2563EB',
  secondary: '#1E293B',
  background: '#F8FAFC',
  success: '#16A34A',
  warning: '#F59E0B',
  card: '#FFFFFF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: { screen?: keyof TabParamList } | undefined;
  EventDetail:
    | {
        event: {
          id: string;
          title: string;
          location: string;
          skills: string;
          status: 'Open' | 'Ongoing';
        };
      }
    | undefined;
  AdminLogin: undefined;
  AdminDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type EventDetailProps = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;
type AdminLoginProps = NativeStackScreenProps<RootStackParamList, 'AdminLogin'>;
type AdminDashboardProps = NativeStackScreenProps<
  RootStackParamList,
  'AdminDashboard'
>;

type TabParamList = {
  HomeTab: undefined;
  EventsTab: undefined;
  DashboardTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type HomeTabProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

type EventsTabProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'EventsTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

type VolunteerDashboardTabProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'DashboardTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    if (isLogin) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Account Created (Demo)');
      setIsLogin(true);
    }
  };

  const titleText = isLogin ? 'Welcome Back!' : 'Create Account';
  const switchText = isLogin ? 'New user? ' : 'Already have account? ';
  const switchActionText = isLogin ? 'Sign Up' : 'Login';

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6D28D9', '#2563EB']}
        style={styles.loginGradient}
      >
        <ScrollView contentContainerStyle={styles.loginScrollContent}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginHeaderTitle}>SkillMatch</Text>
            <View style={styles.loginWave} />
          </View>

          <View style={styles.loginCardWrapper}>
            <View style={styles.loginCard}>
              <Text style={styles.loginTitle}>{titleText}</Text>

              {isLogin ? null : (
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor={COLORS.textMuted}
                  style={styles.loginInput}
                />
              )}

              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={COLORS.textMuted}
                style={styles.loginInput}
              />

              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={COLORS.textMuted}
                style={styles.loginInput}
              />

              {!isLogin && (
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry
                  placeholderTextColor={COLORS.textMuted}
                  style={styles.loginInput}
                />
              )}

              {isLogin && (
                <View style={styles.rememberRow}>
                  <View style={styles.rememberDot} />
                  <Text style={styles.rememberText}>Remember me</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </View>
              )}

              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#6D28D9', '#2563EB']}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>
                    {isLogin ? 'Login' : 'Create Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.switchRow}>
                <Text style={styles.switchText}>{switchText}</Text>
                <TouchableOpacity
                  onPress={() => setIsLogin((prev) => !prev)}
                >
                  <Text style={styles.switchActionText}>{switchActionText}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.loginFooterText}>
                Secure access to opportunity platform
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const AdminLoginScreen: React.FC<AdminLoginProps> = ({ navigation }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const ADMIN_ID = 'admin123';
  const ADMIN_PASS = 'skillmatch@2026';

  const handleAdminLogin = () => {
    if (adminId === ADMIN_ID && password === ADMIN_PASS) {
      navigation.replace('AdminDashboard');
    } else {
      Alert.alert('Access Denied', 'Invalid Admin Credentials');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6D28D9', '#2563EB']}
        style={styles.loginGradient}
      >
        <ScrollView contentContainerStyle={styles.loginScrollContent}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginHeaderTitle}>Admin Access</Text>
            <View style={styles.loginWave} />
          </View>

          <View style={styles.loginCardWrapper}>
            <View style={styles.loginCard}>
              <Text style={styles.loginTitle}>Admin Login</Text>

              <TextInput
                placeholder="Admin ID"
                placeholderTextColor={COLORS.textMuted}
                style={styles.loginInput}
                value={adminId}
                onChangeText={setAdminId}
              />

              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={COLORS.textMuted}
                style={styles.loginInput}
                value={password}
                onChangeText={setPassword}
              />

              <Text style={styles.adminWarningText}>
                Authorized personnel only
              </Text>

              <TouchableOpacity onPress={handleAdminLogin} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#6D28D9', '#2563EB']}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const HomeScreen: React.FC<HomeTabProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.welcomeLabel}>Welcome Back 👋</Text>
        <Text style={styles.welcomeTitle}>Disaster Relief Connect</Text>
        <Text style={styles.welcomeSubtitle}>
          Quickly access active disaster events, track your applications, and
          manage operations.
        </Text>

        <View style={styles.cardList}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('EventsTab')}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🗺️</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Browse Events</Text>
              <Text style={styles.featureDescription}>
                Explore current disaster relief opportunities across regions.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('DashboardTab')}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🤝</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Volunteer Dashboard</Text>
              <Text style={styles.featureDescription}>
                Track your applications and see where you&apos;re contributing.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📊</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Admin Dashboard</Text>
              <Text style={styles.featureDescription}>
                Manage events, volunteers, and assignments from one place.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const EventListScreen: React.FC<EventsTabProps> = ({ navigation }) => {
  const events = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      category: 'Environment',
      date: '25 Feb 2026',
      location: 'Juhu Beach, Mumbai',
      seats: 40,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      skills: 'Beach cleanup, Team coordination',
      status: 'Open' as const,
    },
    {
      id: '2',
      title: 'Blood Donation Camp',
      category: 'Health',
      date: '02 March 2026',
      location: 'City Hospital',
      seats: 12,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      skills: 'Medical assistance, Donor support',
      status: 'Ongoing' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <Text style={styles.sectionTitle}>Explore Events</Text>
        <Text style={styles.sectionSubtitle}>
          Discover opportunities to contribute to real-world initiatives.
        </Text>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Image source={{ uri: item.image }} style={styles.eventImage} />

              <View style={styles.eventContent}>
                <View style={styles.eventTopRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text
                    style={[
                      styles.seatsText,
                      item.seats > 20 ? styles.seatsAvailable : styles.seatsLow,
                    ]}
                  >
                    {item.seats === 0 ? 'No seats left' : `${item.seats} seats left`}
                  </Text>
                </View>

                <Text style={styles.eventTitle}>{item.title}</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>📅 {item.date}</Text>
                  <Text style={styles.infoText}>📍 {item.location}</Text>
                </View>

                <TouchableOpacity
                  disabled={item.seats === 0}
                  style={[
                    styles.applyButton,
                    item.seats === 0 && styles.applyButtonDisabled,
                  ]}
                  onPress={() =>
                    navigation.navigate('EventDetail', {
                      event: item,
                    })
                  }
                >
                  <Text style={styles.applyButtonText}>
                    {item.seats === 0 ? 'Full' : 'Apply Now'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No active events right now.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const EventDetailScreen: React.FC<EventDetailProps> = ({ route, navigation }) => {
  if (!route.params || !route.params.event) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screenContainer}>
          <Text style={styles.sectionTitle}>No Data</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { title, location, skills, status } = route.params.event;

  const handleApply = () => {
    Alert.alert('Application Submitted');
    navigation.navigate('MainTabs', { screen: 'DashboardTab' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.detailTitle}>{title}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLocation}>📍 {location}</Text>
          <View
            style={[
              styles.statusBadge,
              status === 'Open'
                ? styles.statusBadgeOpen
                : styles.statusBadgeOngoing,
            ]}
          >
            <Text style={styles.statusBadgeText}>{status}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Skills Required</Text>
          <Text style={styles.detailText}>{skills}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Description</Text>
          <Text style={styles.detailText}>
            This is a demo description for the selected disaster relief event.
            In a real app, coordinators would provide on-ground details,
            logistics, safety information, and expectations for volunteers.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButtonLarge} onPress={handleApply}>
          <Text style={styles.primaryButtonText}>Apply as Volunteer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const VolunteerDashboardScreen: React.FC<VolunteerDashboardTabProps> = ({
  navigation,
}) => {
  const { events } = useEventContext();
  const CURRENT_VOLUNTEER = 'Rahul';

  const assignedEvents = events.filter(
    (event) => event.assignedTo === CURRENT_VOLUNTEER,
  );

  const statusBadgeStyle = (status: string) => {
    if (status === 'Upcoming') {
      return styles.statusBadgeOpen;
    }
    if (status === 'Ongoing') {
      return styles.statusBadgeOngoing;
    }
    return styles.statusBadgeApproved;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        {assignedEvents.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Your Tasks</Text>
            <Text style={styles.sectionSubtitle}>
              Events specifically assigned to you.
            </Text>

            {assignedEvents.map((item) => (
              <View key={item.id} style={styles.applicationCard}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventLabel}>{item.description}</Text>
                <View style={styles.eventRow}>
                  <Text style={styles.eventLabel}>Status</Text>
                  <View
                    style={[styles.statusBadge, statusBadgeStyle(item.status)]}
                  >
                    <Text style={styles.statusBadgeText}>{item.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          All Events
        </Text>
        <Text style={styles.sectionSubtitle}>
          Overview of all admin-managed events.
        </Text>

        {events.map((item) => (
          <View key={item.id} style={styles.applicationCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventLabel}>{item.description}</Text>
            <View style={styles.eventRow}>
              <Text style={styles.eventLabel}>
                {item.assignedTo
                  ? `Assigned to ${item.assignedTo}`
                  : 'Unassigned'}
              </Text>
              <View style={[styles.statusBadge, statusBadgeStyle(item.status)]}>
                <Text style={styles.statusBadgeText}>{item.status}</Text>
              </View>
            </View>
          </View>
        ))}

        {events.length === 0 && (
          <Text style={styles.emptyText}>No events configured yet.</Text>
        )}

        <View style={styles.footer}>
          <Button
            title="Browse More Events"
            onPress={() => navigation.navigate('EventsTab')}
            color={COLORS.primary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AdminDashboardScreen: React.FC<AdminDashboardProps> = () => {
  const { events, volunteers, addEvent, assignTask, updateEventStatus } =
    useEventContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Upcoming' | 'Ongoing' | 'Completed'>(
    'Upcoming',
  );

  const [selectedEventForAssign, setSelectedEventForAssign] = useState<string | undefined>();
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | undefined>();

  const [selectedEventForStatus, setSelectedEventForStatus] = useState<string | undefined>();
  const [newStatus, setNewStatus] =
    useState<'Upcoming' | 'Ongoing' | 'Completed'>('Upcoming');

  const handleCreateEvent = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing fields', 'Please enter title and description.');
      return;
    }
    addEvent(title.trim(), description.trim(), status);
    setTitle('');
    setDescription('');
    setStatus('Upcoming');
  };

  const handleAssignTask = () => {
    if (!selectedEventForAssign || !selectedVolunteer) {
      Alert.alert('Select both', 'Please choose an event and a volunteer.');
      return;
    }
    assignTask(selectedEventForAssign, selectedVolunteer);
  };

  const handleUpdateStatus = () => {
    if (!selectedEventForStatus) {
      Alert.alert('Select event', 'Please choose an event to update.');
      return;
    }
    updateEventStatus(selectedEventForStatus, newStatus);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.sectionTitle}>Admin Control Panel</Text>
        <Text style={styles.sectionSubtitle}>
          Manage events, assignments, and live statuses.
        </Text>

        {/* Create Event */}
        <View style={styles.adminSection}>
          <Text style={styles.adminSectionTitle}>Create Event</Text>
          <TextInput
            placeholder="Event title"
            placeholderTextColor={COLORS.textMuted}
            style={styles.loginInput}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Event description"
            placeholderTextColor={COLORS.textMuted}
            style={[styles.loginInput, { height: 80 }]}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.statusRow}>
            {(['Upcoming', 'Ongoing', 'Completed'] as const).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.statusChip,
                  status === option && styles.statusChipActive,
                ]}
                onPress={() => setStatus(option)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    status === option && styles.statusChipTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={handleCreateEvent} activeOpacity={0.9}>
            <LinearGradient
              colors={['#6D28D9', '#2563EB']}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Save Event</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* View Events */}
        <View style={styles.adminSection}>
          <Text style={styles.adminSectionTitle}>Events Overview</Text>
          {events.map((event) => (
            <View key={event.id} style={styles.applicationCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLabel}>{event.description}</Text>
              <View style={styles.eventRow}>
                <Text style={styles.eventLabel}>
                  {event.assignedTo
                    ? `Assigned to ${event.assignedTo}`
                    : 'Unassigned'}
                </Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{event.status}</Text>
                </View>
              </View>
            </View>
          ))}
          {events.length === 0 && (
            <Text style={styles.emptyText}>No events configured yet.</Text>
          )}
        </View>

        {/* Assign Task */}
        <View style={styles.adminSection}>
          <Text style={styles.adminSectionTitle}>Assign Task</Text>
          <Text style={styles.eventLabel}>Select Event</Text>
          <View style={styles.chipRow}>
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={[
                  styles.statusChip,
                  selectedEventForAssign === event.id && styles.statusChipActive,
                ]}
                onPress={() => setSelectedEventForAssign(event.id)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    selectedEventForAssign === event.id &&
                      styles.statusChipTextActive,
                  ]}
                >
                  {event.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.eventLabel, { marginTop: 8 }]}>
            Select Volunteer
          </Text>
          <View style={styles.chipRow}>
            {volunteers.map((volunteer) => (
              <TouchableOpacity
                key={volunteer.id}
                style={[
                  styles.statusChip,
                  selectedVolunteer === volunteer.name &&
                    styles.statusChipActive,
                ]}
                onPress={() => setSelectedVolunteer(volunteer.name)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    selectedVolunteer === volunteer.name &&
                      styles.statusChipTextActive,
                  ]}
                >
                  {volunteer.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={handleAssignTask} activeOpacity={0.9}>
            <LinearGradient
              colors={['#6D28D9', '#2563EB']}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Assign Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Update Event Status */}
        <View style={styles.adminSection}>
          <Text style={styles.adminSectionTitle}>Update Event Status</Text>
          <Text style={styles.eventLabel}>Select Event</Text>
          <View style={styles.chipRow}>
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={[
                  styles.statusChip,
                  selectedEventForStatus === event.id &&
                    styles.statusChipActive,
                ]}
                onPress={() => setSelectedEventForStatus(event.id)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    selectedEventForStatus === event.id &&
                      styles.statusChipTextActive,
                  ]}
                >
                  {event.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.eventLabel, { marginTop: 8 }]}>
            New Status
          </Text>
          <View style={styles.statusRow}>
            {(['Upcoming', 'Ongoing', 'Completed'] as const).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.statusChip,
                  newStatus === option && styles.statusChipActive,
                ]}
                onPress={() => setNewStatus(option)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    newStatus === option && styles.statusChipTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={handleUpdateStatus} activeOpacity={0.9}>
            <LinearGradient
              colors={['#6D28D9', '#2563EB']}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Update Status</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'HomeTab') {
            iconName = 'home-outline';
          } else if (route.name === 'EventsTab') {
            iconName = 'list-outline';
          } else {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="EventsTab"
        component={EventListScreen}
        options={{ title: 'Events' }}
      />
      <Tab.Screen
        name="DashboardTab"
        component={VolunteerDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: COLORS.background },
            headerTitleStyle: { color: COLORS.secondary },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLoginScreen}
            options={{ title: 'Admin Login' }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{ title: 'Event Details' }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ title: 'Admin Dashboard' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loginGradient: {
    flex: 1,
  },
  loginScrollContent: {
    flexGrow: 1,
  },
  loginHeader: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  loginHeaderTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  loginWave: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  loginCardWrapper: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    marginTop: -40,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  loginCard: {
    flexGrow: 1,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.secondary,
  },
  loginInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 15,
    color: COLORS.textMain,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#94A3B8',
    marginRight: 8,
  },
  rememberText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  forgotText: {
    fontSize: 13,
    color: '#2563EB',
  },
  loginButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  switchActionText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
    marginLeft: 4,
  },
  loginFooterText: {
    marginTop: 20,
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  adminWarningText: {
    fontSize: 12,
    color: '#DC2626',
    marginBottom: 12,
  },
  screenContainer: {
    flexGrow: 1,
    padding: 20,
  },
  authContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  appTagline: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  authCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  authToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB40',
    borderRadius: 999,
    padding: 4,
    marginBottom: 16,
  },
  authToggleButton: {
    flex: 1,
    borderRadius: 999,
    alignItems: 'center',
    paddingVertical: 8,
  },
  authToggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  authToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.secondary,
  },
  authToggleTextActive: {
    color: '#FFFFFF',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMain,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textMain,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonLarge: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  authFooterText: {
    marginTop: 12,
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  welcomeLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  welcomeSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  cardList: {
    marginTop: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  eventCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#E0E7FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#4338CA',
    fontWeight: '600',
  },
  seatsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  seatsAvailable: {
    color: '#16A34A',
  },
  seatsLow: {
    color: '#DC2626',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    marginTop: 8,
    marginBottom: 6,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  eventLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  eventSkills: {
    fontSize: 13,
    color: COLORS.textMain,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeOpen: {
    backgroundColor: '#DBEAFE',
  },
  statusBadgeOngoing: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeApproved: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgePending: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  applyButton: {
    marginTop: 12,
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  applyButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: COLORS.textMuted,
    fontSize: 13,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLocation: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  detailSection: {
    marginTop: 10,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.textMain,
  },
  applicationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  progressLabel: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  footer: {
    marginTop: 16,
  },
  adminSection: {
    marginTop: 24,
  },
  adminSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  statusChip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
  },
  statusChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  statusChipText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  statusChipTextActive: {
    color: '#FFFFFF',
  },
});
