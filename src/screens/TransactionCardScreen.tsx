import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

export default function TransactionCardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Income</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.valueContainer}>
          <View style={styles.valueField}>
            <Text style={styles.valueText}>1758</Text>
          </View>
          <View>
            <Icon
              name="delete"
              style={styles.deleteIcon}
              onPress={() => {
                console.log('Deleting...');
              }}
            />
          </View>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Date</Text>
          <Text style={styles.valueTableText}>23.02.2023</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Type</Text>
          <Text style={styles.valueTableText}>Income</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Category</Text>
          <Text style={styles.valueTableText}>Зарплата</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Comments</Text>
          <Text style={styles.valueTableText}>Зарплата в моджике</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 120,
    backgroundColor: '#88B548',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { color: '#FFFFFF', fontSize: 24, fontWeight: '500' },
  mainContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  valueContainer: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  valueField: {
    width: '80%',
    height: 56,
    borderWidth: 1,
    borderColor: '#86888A',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 36,
    fontWeight: '500',
  },
  deleteIcon: {
    fontSize: 24,
    color: '#CF5B4A',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#86888A',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#86888A',
  },
  valueTableText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
});
