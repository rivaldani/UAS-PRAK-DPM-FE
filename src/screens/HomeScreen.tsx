import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface SchoolRecord {
  _id: string;
  name: string;
  status: string;
  kelas: string;
  dateAdded: string;
}

const HomeScreen = () => {
  const [records, setRecords] = useState<SchoolRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/schools');
        setRecords(response.data);
      } catch (error: any) {
        console.error('Error fetching school records:', error.response?.data?.error || 'Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const renderNode = ({ item }: { item: SchoolRecord }) => (
    <View style={styles.nodeCard}>
      <Text style={styles.nodeTitle}>{item.name}</Text>
      <Text style={styles.nodeText}><Text style={styles.nodeLabel}>Status:</Text> {item.status}</Text>
      <Text style={styles.nodeText}><Text style={styles.nodeLabel}>Kelas:</Text> {item.kelas}</Text>
      <Text style={styles.nodeText}><Text style={styles.nodeLabel}>Date Added:</Text> {new Date(item.dateAdded).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>School Data Overview</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0056b3" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderNode}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
    textAlign: 'center',
    paddingTop: 50,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  nodeCard: {
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B3D9FF',
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  nodeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 10,
  },
  nodeText: {
    fontSize: 16,
    color: '#0056b3',
    marginBottom: 5,
  },
  nodeLabel: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
