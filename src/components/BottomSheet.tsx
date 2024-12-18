import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

const { height } = Dimensions.get('window');
// Height of the sheet (40% of screen height)
const sheetHeight = Math.round(height * 0.4);

const BottomSheet = forwardRef<BottomSheetRef>((_props, ref) => {
    const translateY = useRef(new Animated.Value(0)).current;
    // 0 means it's off-screen (positioned at bottom).
    // We'll move it to -sheetHeight to bring it up into view.

    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
            Animated.spring(translateY, {
                toValue: -sheetHeight, // Move the sheet up by its height
                useNativeDriver: true,
            }).start();
        },
        close: () => {
            Animated.spring(translateY, {
                toValue: 0, // Move back down off-screen
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    setVisible(false);
                }
            });
        },
    }));

    const panResponder = useRef<PanResponderInstance>(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Start responding if the user moves their finger
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderMove: (_, gestureState) => {
                const newVal = -sheetHeight + gestureState.dy;
                // Clamp the value so it never goes above 0 (off-screen) or below -sheetHeight (fully shown)
                const clampedVal = Math.max(-sheetHeight, Math.min(0, newVal));
                translateY.setValue(clampedVal);
            },
            onPanResponderRelease: (_, gestureState) => {
                // If dragged down more than half the sheet height, close it
                if (gestureState.dy > sheetHeight / 2) {
                    ref && (ref as React.RefObject<BottomSheetRef>).current?.close();
                } else {
                    // Otherwise, snap back open
                    Animated.spring(translateY, {
                        toValue: -sheetHeight,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if (!visible) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* Backdrop: closes the sheet on press */}
            <Pressable style={styles.backdrop} onPress={() => ref && (ref as React.RefObject<BottomSheetRef>).current?.close()} />

            <Animated.View
                style={[
                    styles.sheetContainer,
                    { transform: [{ translateY }] }
                ]}
                {...panResponder.panHandlers}
            >
                {/* Here is where you can place your chip row or any content at the top */}
                <View style={styles.contentContainer}>
                    <View style={styles.handle} />
                    {/* Example row of chips or any other content at the top of the sheet */}
                    <View style={styles.chipRow}>
                        <View style={styles.chip} />
                        <View style={styles.chip} />
                        <View style={styles.chip} />
                    </View>
                </View>
            </Animated.View>
        </View>
    );
});

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheetContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        // Start the sheet off-screen at the bottom
        top: height,
        height: sheetHeight,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        marginBottom: 10,
        alignSelf: 'center'
    },
    chipRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 10,
    },
    chip: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#88f',
        marginRight: 8,
    }
});

export default BottomSheet;
