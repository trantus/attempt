import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    PanResponder,
    PanResponderInstance,
} from 'react-native';

export interface BottomSheetRef {
    open: () => void;
    close: () => void;
}

const { height } = Dimensions.get('window');
const sheetHeight = Math.round(height * 0.4);

const BottomSheet = forwardRef<BottomSheetRef>((_props, ref) => {
    const translateY = useRef(new Animated.Value(sheetHeight)).current;
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        },
        close: () => {
            Animated.spring(translateY, {
                toValue: sheetHeight,
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
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dy) > 5,
            onPanResponderMove: (_, gestureState) => {
                // Current position: start from 0 (open state) and move downwards
                const newVal = gestureState.dy;
                // Clamp between 0 (open) and sheetHeight (closed)
                const clampedVal = Math.min(Math.max(0, newVal), sheetHeight);
                translateY.setValue(clampedVal);
            },
            onPanResponderRelease: (_, gestureState) => {
                // If dragged more than half the sheetHeight downward, close it
                if (gestureState.dy > sheetHeight / 2) {
                    ref && (ref as React.RefObject<BottomSheetRef>)?.current?.close();
                } else {
                    // Snap back to open if not far enough down
                    Animated.spring(translateY, {
                        toValue: 0,
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
            <Pressable
                style={styles.backdrop}
                onPress={() =>
                    ref && (ref as React.RefObject<BottomSheetRef>)?.current?.close()
                }
            />

            <Animated.View
                style={[
                    styles.sheetContainer,
                    { transform: [{ translateY }] },
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.handle} />
                {/* Chip row or any content at the top */}
                <View style={styles.chipRow}>
                    <View style={styles.chip} />
                    <View style={styles.chip} />
                    <View style={styles.chip} />
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
        bottom: 0,
        height: sheetHeight,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10,
    },
    chipRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chip: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#88f',
        marginRight: 8,
    },
});

export default BottomSheet;
