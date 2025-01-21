import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface SchoolRecord {
  _id: string;
  name: string;
  status: string;
  kelas: string;
  dateAdded: string;
}

const SchoolRecordScreen = () => {
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

  const renderRecord = ({ item }: { item: SchoolRecord }) => (
    <View style={styles.recordCard}>
      <Text style={styles.recordTitle}>{item.name}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Status:</Text> {item.status}</Text>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Kelas:</Text> {item.kelas}</Text>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Date Added:</Text> {new Date(item.dateAdded).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>School Records</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0056b3" />
      ) : records.length > 0 ? (
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderRecord}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No records available</Text>
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
  recordCard: {
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#B3D9FF',
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 10,
  },
  cardContent: {
    borderTopWidth: 1,
    borderColor: '#B3D9FF',
    paddingTop: 10,
  },
  recordText: {
    fontSize: 16,
    color: '#0056b3',
    marginBottom: 5,
  },
  recordLabel: {
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    color: '#0056b3',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SchoolRecordScreen;
