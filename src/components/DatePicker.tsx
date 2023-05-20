import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '@expo/vector-icons//MaterialIcons';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pickerText} onPress={showDatePicker}>
        {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        <Icon name="arrow-drop-down" size={16} color={'#2A3356'} />
      </Text>

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        locale="en_GB"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  pickerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2A3356',
  },
  picker: {},
});
