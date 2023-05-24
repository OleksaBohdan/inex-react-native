import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Report() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>May 2023</Text>
      </View>

      <ScrollView>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Month Incomes</Text>
          <Text style={styles.categoryHeaderText}>+3052$</Text>
        </View>
        <ReportCard />
        <ReportCard />
        <ReportCard />

        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Month Expenses</Text>
          <Text style={styles.categoryHeaderText}>-2321$</Text>
        </View>
        <ReportCard />
        <ReportCard />
      </ScrollView>
    </View>
  );
}

const ReportCard = () => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardNameText}> Category Name</Text>
      <Text style={styles.cardNameText}>+8000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '500',
  },
  categoryHeader: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryHeaderText: {
    fontSize: 16,
    fontWeight: '500',
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
