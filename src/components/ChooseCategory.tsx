import { StyleSheet, View, Text, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

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
          <ChooseCategoryCard />
          <ChooseCategoryCard />
          <ChooseCategoryCard />
          <ChooseCategoryCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const ChooseCategoryCard = () => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardNameText}> Category Name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#D9D9D9',
    height: 53,
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  cardNameText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
