import React, {useRef} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetRef} from '../components/BottomSheet';

const BottomSheetScreen = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const openSheet = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <Button title="Show Bottom Sheet" onPress={openSheet} />
      <BottomSheet ref={bottomSheetRef} />
    </View>
  );
};

export default BottomSheetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
