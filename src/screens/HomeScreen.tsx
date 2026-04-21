import React from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import { COLORS } from "../constants/colors";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";
import SectionHeader from "../components/SectionHeader";

const HomeScreen = () => {
    const userData = {
        name: "Enjelin Morgeana",
        totalBalance: 2548.00,
        income: 1840.00,
        expenses: 284.00,
    };

    const transactions: Array<{
        id: string;
        title: string;
        amount: number;
        type: 'income' | 'expense';
        date: string;
        icon: string;
    }> = [
        {
            id: '1',
            title: 'Upwork',
            amount: 850.00,
            type: 'income' as const,
            date: 'Today',
            icon: '💼',
        },
        {
            id: '2',
            title: 'Transfer',
            amount: 85.00,
            type: 'expense' as const,
            date: 'Yesterday',
            icon: '🔄',
        },
        {
            id: '3',
            title: 'Paypal',
            amount: 1406.00,
            type: 'income' as const,
            date: 'Jan 30, 2022',
            icon: '💰',
        },
        {
            id: '4',
            title: 'Youtube',
            amount: 11.99,
            type: 'expense' as const,
            date: 'Jan 16, 2022',
            icon: '▶️',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.curvedHeader}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Good afternoon,</Text>
                        <Text style={styles.userName}>{userData.name}</Text>
                    </View>
                </View>

                <View style={styles.balanceCardWrapper}>
                    <BalanceCard
                        balance={userData.totalBalance}
                        income={userData.income}
                        expenses={userData.expenses}
                    />
                </View>

                {/* Transactions Section */}
                <View style={styles.transactionsContainer}>
                    <SectionHeader
                        title="Transactions History"
                        onSeeAll={() => console.log('See all transactions')}
                    />

                    {transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            title={transaction.title}
                            amount={transaction.amount}
                            type={transaction.type}
                            date={transaction.date}
                            icon={transaction.icon}
                            onPress={() => console.log(`Pressed ${transaction.title}`)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    curvedHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
        height: 250,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    greetingContainer: {
        paddingHorizontal: 20,
    },
    greeting: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '400',
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
        marginTop: 4,
    },
    balanceCardWrapper: {
        paddingHorizontal: 20,
        marginTop: -100,
        marginBottom: 30,
    },
    transactionsContainer: {
        paddingHorizontal: 20,
    },
});

export default HomeScreen;