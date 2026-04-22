import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity, Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TransactionItem from '../components/TransactionItem';
import { Ionicons } from '@expo/vector-icons';

const TransactionsScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'income' | 'expense'>('all');

    // Dummy transaction data
    const allTransactions = [
        {
            id: '1',
            title: 'Upwork',
            amount: 850.00,
            type: 'income' as const,
            date: 'Today',
            time: '10:30 AM',
            icon: '💼',
            category: 'Freelance',
        },
        {
            id: '2',
            title: 'Transfer',
            amount: 85.00,
            type: 'expense' as const,
            date: 'Yesterday',
            time: '2:15 PM',
            icon: '🔄',
            category: 'Transfer',
        },
        {
            id: '3',
            title: 'Paypal',
            amount: 1406.00,
            type: 'income' as const,
            date: 'Jan 30, 2022',
            time: '9:00 AM',
            icon: '💰',
            category: 'Payment',
        },
        {
            id: '4',
            title: 'Youtube',
            amount: 11.99,
            type: 'expense' as const,
            date: 'Jan 16, 2022',
            time: '5:45 PM',
            icon: '▶️',
            category: 'Entertainment',
        },
        {
            id: '5',
            title: 'Starbucks',
            amount: 5.40,
            type: 'expense' as const,
            date: 'Jan 15, 2022',
            time: '8:30 AM',
            icon: '☕',
            category: 'Food & Drink',
        },
        {
            id: '6',
            title: 'Apple',
            amount: 999.00,
            type: 'expense' as const,
            date: 'Jan 10, 2022',
            time: '3:20 PM',
            icon: '🍎',
            category: 'Shopping',
        },
        {
            id: '7',
            title: 'Freelance Project',
            amount: 2500.00,
            type: 'income' as const,
            date: 'Jan 5, 2022',
            time: '11:00 AM',
            icon: '💻',
            category: 'Freelance',
        },
        {
            id: '8',
            title: 'Netflix',
            amount: 15.99,
            type: 'expense' as const,
            date: 'Jan 1, 2022',
            time: '12:00 AM',
            icon: '🎬',
            category: 'Entertainment',
        },
    ];

    // Filter transactions based on selected filter
    const filteredTransactions = allTransactions.filter(transaction => {
        if (selectedFilter === 'all') return true;
        return transaction.type === selectedFilter;
    });

    // Group transactions by date
    const groupedTransactions = filteredTransactions.reduce((groups: any, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});

    const dateKeys = Object.keys(groupedTransactions);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Transactions</Text>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[
                        styles.filterTab,
                        selectedFilter === 'all' && styles.filterTabActive
                    ]}
                    onPress={() => setSelectedFilter('all')}
                >
                    <Text style={[
                        styles.filterText,
                        selectedFilter === 'all' && styles.filterTextActive
                    ]}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterTab,
                        selectedFilter === 'income' && styles.filterTabActive
                    ]}
                    onPress={() => setSelectedFilter('income')}
                >
                    <Text style={[
                        styles.filterText,
                        selectedFilter === 'income' && styles.filterTextActive
                    ]}>Income</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterTab,
                        selectedFilter === 'expense' && styles.filterTabActive
                    ]}
                    onPress={() => setSelectedFilter('expense')}
                >
                    <Text style={[
                        styles.filterText,
                        selectedFilter === 'expense' && styles.filterTextActive
                    ]}>Expense</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderDateGroup = (date: string, transactions: any[]) => (
        <View key={date} style={styles.dateGroup}>
            <View style={styles.dateHeader}>
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.transactionCount}>
                    {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                </Text>
            </View>

            <View style={styles.transactionList}>
                {transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        title={transaction.title}
                        amount={transaction.amount}
                        type={transaction.type}
                        date={transaction.time}
                        icon={transaction.icon}
                        onPress={() => console.log(`Pressed ${transaction.title}`)}
                    />
                ))}
            </View>
        </View>
    );

    // Empty State Component
    const EmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
                <Ionicons name="receipt-outline" size={60} color="#CCCCCC" />
            </View>
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptySubtitle}>
                {selectedFilter === 'all'
                    ? "You haven't made any transactions yet"
                    : selectedFilter === 'income'
                        ? "You don't have any income transactions"
                        : "You don't have any expense transactions"
                }
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {filteredTransactions.length === 0 ? (
                <View style={styles.emptyStateWrapper}>
                    {renderHeader()}
                    <View style={styles.emptyStateContent}>
                        <EmptyState />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={dateKeys}
                    keyExtractor={(item) => item}
                    ListHeaderComponent={renderHeader}
                    renderItem={({ item: date }) => renderDateGroup(date, groupedTransactions[date])}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightBg,
    },
    emptyStateWrapper: {
        flex: 1,
    },
    emptyStateContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.primaryDark,
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: 4,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    filterTab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 26,
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7C85',
    },
    filterTextActive: {
        color: COLORS.white,
    },
    listContent: {
        paddingBottom: 30,
    },
    dateGroup: {
        marginBottom: 10,
    },
    dateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.lightBg,
    },
    dateText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.primaryDark,
    },
    transactionCount: {
        fontSize: 13,
        color: '#8A9AA3',
    },
    transactionList: {
        paddingHorizontal: 20
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyIconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primaryDark,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#8A9AA3',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default TransactionsScreen;