import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({ route }) => {
    const { id } = route.params || {};
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                    const data = await response.json();
                    setItem(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 50 }} />;
    }

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No item found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15
    },
    body: {
        fontSize: 16,
        lineHeight: 22
    },
    text: {
        fontSize: 18
    }
});
