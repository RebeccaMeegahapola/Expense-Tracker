import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface BalanceCardProps {
    balance: number;
    income: number;
    expenses: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, income, expenses }) => {
    return (
        <View style={styles.container}>
            {/* Header with Total Balance */}
            <View style={styles.header}>
                <Text style={styles.title}>Total Balance</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal-outline" size={20} color={COLORS.primaryDark} />
                </TouchableOpacity>
            </View>

            <Text style={styles.balanceAmount}>
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>

            {/* Income & Expenses Row */}
            <View style={styles.incomeExpenseRow}>
                {/* Income */}
                <View style={styles.itemContainer}>
                    <View style={[styles.iconCircle, styles.incomeIcon]}>
                        <Ionicons name="arrow-down" size={20} color={COLORS.income} />
                    </View>
                    <View>
                        <Text style={styles.label}>Income</Text>
                        <Text style={[styles.amount, styles.incomeText]}>
                            ${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Expenses */}
                <View style={styles.itemContainer}>
                    <View style={[styles.iconCircle, styles.expenseIcon]}>
                        <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
                    </View>
                    <View>
                        <Text style={styles.label}>Expenses</Text>
                        <Text style={[styles.amount, styles.expenseText]}>
                            ${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        color: '#6B7C85',
        fontWeight: '500',
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: COLORS.primaryDark,
        marginBottom: 20,
    },
    incomeExpenseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    incomeIcon: {
        backgroundColor: '#c7e9fa',
    },
    expenseIcon: {
        backgroundColor: '#FFE8E8',
    },
    label: {
        fontSize: 14,
        color: '#6B7C85',
        marginBottom: 4,
    },
    amount: {
        fontSize: 20,
        fontWeight: '700',
    },
    incomeText: {
        color: COLORS.income,
    },
    expenseText: {
        color: COLORS.expense,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: '#E5E5E5',
        marginHorizontal: 15,
    },
});

export default BalanceCard;