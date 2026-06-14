import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity, Platform, Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TransactionItem from '../components/TransactionItem';
import { Ionicons } from '@expo/vector-icons';
import {useTransactionStore} from "../store/useTransactionStore";
import { useNavigation } from '@react-navigation/native';

const TransactionsScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'income' | 'expense'>('all');

    // Get data from store
    const getTransactionsByType = useTransactionStore((state) => state.getTransactionsByType);
    const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

    const filteredTransactions = getTransactionsByType(selectedFilter);

    // Group transactions by date
    const groupedTransactions = filteredTransactions.reduce((groups: any, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});

    const handleDeleteTransaction = (transaction: any) => {
        Alert.alert(
            'Delete Transaction',
            `Are you sure you want to delete "${transaction.title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteTransaction(transaction.id),
                },
            ]
        );
    };

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
                        onPress={() => navigation.navigate('EditTransaction', { transaction })}
                        onLongPress={() => handleDeleteTransaction(transaction)}
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