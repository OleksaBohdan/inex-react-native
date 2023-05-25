import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setSelectedDate } from '../state/mainState';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '@expo/vector-icons//MaterialIcons';

export default function DatePicker() {
  const selectedDate = useSelector((state: IMainState) => state.selectedDate);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();

  const showDatePicker = useCallback(() => {
    setDatePickerVisible(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisible(false);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      dispatch(setSelectedDate({ selectedDate: date.toISOString() }));
      hideDatePicker();
    },
    [hideDatePicker]
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.pickerText, styles.textExpenses]}>-1560</Text>
      <Text style={styles.pickerText} onPress={showDatePicker}>
        {selectedDate.slice(0, 10)}
        <Icon name="arrow-drop-down" size={16} color={'#2A3356'} />
      </Text>
      <Text style={[styles.pickerText, styles.textIncomes]}>+5320</Text>

      <DateTimePickerModal
        date={new Date(selectedDate)}
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2A3356',
  },
  textExpenses: {
    color: '#E80000',
  },
  textIncomes: {
    color: '#22980F',
  },
});
