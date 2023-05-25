import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setEnteredComment } from '../state/mainState';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Comment() {
  const enteredComment = useSelector((state: IMainState) => state.enteredComment);
  const dispatch = useDispatch();

  const handleEnterComment = (comment: string) => {
    dispatch(setEnteredComment({ enteredComment: comment }));
  };

  return (
    <View style={styles.container}>
      <TextInput onChangeText={handleEnterComment} label="Comment" style={styles.textInput} maxLength={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
});
