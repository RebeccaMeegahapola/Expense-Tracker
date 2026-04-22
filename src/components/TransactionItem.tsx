import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface TransactionItemProps {
    title: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    icon: string;
    onPress?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
        title,
        amount,
        type,
        date,
        icon,
        onPress
    }) => {
    const isIncome = type === 'income';
    const amountColor = isIncome ? COLORS.income : COLORS.expense;
    const amountPrefix = isIncome ? '+ ' : '- ';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={!onPress}
        >
            <View style={styles.leftSection}>
                <View style={[
                    styles.iconContainer,

                ]}>
                    <Text style={styles.iconText}>{icon}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>

            <Text style={[styles.amount, { color: amountColor }]}>
                {amountPrefix}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        marginBottom: 12,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    iconText: {
        fontSize: 20,
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.dark,
        marginBottom: 4,
    },
    date: {
        fontSize: 13,
        color: '#8A9AA3',
        fontWeight: '400',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TransactionItem;