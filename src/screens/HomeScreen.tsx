import React from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Platform, Alert,
} from 'react-native';
import { COLORS } from "../constants/colors";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";
import SectionHeader from "../components/SectionHeader";
import {useTransactionStore} from "../store/useTransactionStore";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const transactions = useTransactionStore((state) => state.transactions);
    const getTotalBalance = useTransactionStore((state) => state.getTotalBalance);
    const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
    const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);
    const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

    // Get latest 4 transactions
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);

    const userData = {
        name: "Enjelin Morgeana",
        totalBalance: getTotalBalance(),
        income: getTotalIncome(),
        expenses: getTotalExpense(),
    };

    // Add delete handler
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

    // Add edit handler
    const handleEditTransaction = (transaction: any) => {
        navigation.navigate('EditTransaction', { transaction });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning,';
        if (hour < 17) return 'Good afternoon,';
        return 'Good evening,';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.curvedHeader}>
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />
                    <View style={styles.circle3} />
                    <View style={styles.circle4} />

                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>{getGreeting()}</Text>
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
                        onSeeAll={() => navigation.navigate('Transactions')}
                    />

                    {transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            title={transaction.title}
                            amount={transaction.amount}
                            type={transaction.type}
                            date={transaction.date}
                            icon={transaction.icon}
                            onPress={() => handleEditTransaction(transaction)}
                            onDelete={() => handleDeleteTransaction(transaction)}
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
        backgroundColor: COLORS.lightBg,
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
        overflow: 'hidden',
        position: 'relative',
    },
    circle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        top: -120,
        right: -80,
    },
    circle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        bottom: -50,
        left: -60,
    },
    circle3: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: 50,
        left: 20,
    },
    circle4: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        bottom: 20,
        right: 40,
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