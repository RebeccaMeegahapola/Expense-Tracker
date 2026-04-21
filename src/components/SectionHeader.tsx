import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface SectionHeaderProps {
    title: string;
    onSeeAll?: () => void;
    showSeeAll?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
        title,
        onSeeAll,
        showSeeAll = true
    }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showSeeAll && (
                <TouchableOpacity onPress={onSeeAll}>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    seeAllText: {
        fontSize: 14,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
});

export default SectionHeader;