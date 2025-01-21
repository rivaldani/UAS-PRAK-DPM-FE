// React Native Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axiosInstance from '../utils/axiosInstance';

interface SchoolRecord {
  _id: string;
  name: string;
  status: string;
  kelas: string;
  dateAdded: string;
}

const SchoolDataScreen = () => {
  const [records, setRecords] = useState<SchoolRecord[]>([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [kelas, setKelas] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/schools');
      setRecords(response.data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateRecord = async () => {
    if (!name || !status || !kelas || !dateAdded) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    try {
      if (editMode && editingId) {
        await axiosInstance.put(`/schools/${editingId}`, { name, status, kelas, dateAdded });
        Alert.alert('Success', 'Record updated successfully!');
      } else {
        const response = await axiosInstance.post('/schools', { name, status, kelas, dateAdded });
        Alert.alert('Success', 'Record added successfully!');
        setRecords((prev) => [...prev, response.data]);
      }
      resetForm();
      fetchRecords();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to save record.');
    }
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      await axiosInstance.delete(`/schools/${id}`);
      Alert.alert('Success', 'Record deleted successfully!');
      fetchRecords();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete record.');
    }
  };

  const handleEditRecord = (record: SchoolRecord) => {
    setName(record.name);
    setStatus(record.status);
    setKelas(record.kelas);
    setDateAdded(record.dateAdded);
    setEditMode(true);
    setEditingId(record._id);
  };

  const resetForm = () => {
    setName('');
    setStatus('');
    setKelas('');
    setDateAdded('');
    setEditMode(false);
    setEditingId(null);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const renderRecordCard = ({ item }: { item: SchoolRecord }) => (
    <View style={styles.recordCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleEditRecord(item)}>
          <AntDesign name="edit" size={20} color="#0056b3" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}><Text style={styles.cardLabel}>Status:</Text> {item.status}</Text>
        <Text style={styles.cardText}><Text style={styles.cardLabel}>Kelas:</Text> {item.kelas}</Text>
        <Text style={styles.cardText}><Text style={styles.cardLabel}>Date Added:</Text> {new Date(item.dateAdded).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecord(item._id)}>
        <AntDesign name="delete" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>School Data Management</Text>
      <View style={styles.formCard}>
        <Text style={styles.formHeader}>{editMode ? 'Edit Record' : 'Add New Record'}</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="infocirlceo" size={20} color="#5A9BD4" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="profile" size={20} color="#5A9BD4" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Status (guru/siswa)"
            value={status}
            onChangeText={setStatus}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="calculator" size={20} color="#5A9BD4" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Kelas"
            value={kelas}
            onChangeText={setKelas}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="calendar" size={20} color="#5A9BD4" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Date Added (YYYY-MM-DD)"
            value={dateAdded}
            onChangeText={setDateAdded}
          />
        </View>
        <Pressable style={styles.addButton} onPress={handleAddOrUpdateRecord}>
          <Text style={styles.addButtonText}>{editMode ? 'Update Record' : 'Add Record'}</Text>
        </Pressable>
      </View>
      <FlatList
        data={records}
        keyExtractor={(item) => item._id}
        renderItem={renderRecordCard}
        refreshing={loading}
        onRefresh={fetchRecords}
      />
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0056b3',
    textAlign: 'center',
    paddingTop: 50,
    marginBottom: 20,
  },
  formCard: {
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#B3D9FF',
    backgroundColor: '#FFFFFF',
  },
  formHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B3D9FF',
    color: '#0056b3',
  },
  addButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  recordCard: {
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#B3D9FF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  cardContent: {
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#B3D9FF',
  },
  cardText: {
    fontSize: 15,
    color: '#0056b3',
    marginBottom: 5,
  },
  cardLabel: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#0056b3',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

export default SchoolDataScreen;
