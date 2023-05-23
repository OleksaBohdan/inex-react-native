import { StyleSheet, View, Text, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

import CategoryCard from './CategoryCard';

export default function ChooseCategory({ closeModal }) {
  return (
    <SafeAreaView style={styles.modalBackgroundStyle}>
      <View style={[styles.content, { height: '65%' }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Categories</Text>
          <Icon name="close" onPress={closeModal} size={24} />
        </View>
        <Text style={styles.subHeaderText}>Costs</Text>
        <ScrollView>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CACCCE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 24,
  },
});
