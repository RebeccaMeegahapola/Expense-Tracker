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
                    { backgroundColor: isIncome ? '#E8F8E8' : '#FFF0F0' }
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
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    iconText: {
        fontSize: 22,
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