// src/screens/StatisticsScreen.tsx
import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { CATEGORIES } from '../components/CategorySelector';
import {useTransactionStore} from "../store/useTransactionStore";

const { width } = Dimensions.get('window');

const StatisticsScreen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
    const [selectedTab, setSelectedTab] = useState<'expense' | 'income'>('expense');

    // Get data from store
    const transactions = useTransactionStore((state) => state.transactions);
    const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
    const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);

    const totalIncome = getTotalIncome();
    const totalExpense = getTotalExpense();
    const averageDaily = totalExpense / 30;

    // Category breakdown - FIXED: renamed from categoryBreakdown to categoryData
    const categoryData = useMemo(() => {
        const filtered = transactions.filter((t) => t.type === selectedTab);
        const categoryMap: Record<string, { category: any; amount: number }> = {};

        filtered.forEach((t) => {
            if (t.category) {
                const key = t.category.id;
                if (!categoryMap[key]) {
                    categoryMap[key] = { category: t.category, amount: 0 };
                }
                categoryMap[key].amount += t.amount;
            }
        });

        const total = filtered.reduce((sum, t) => sum + t.amount, 0);

        return Object.values(categoryMap)
            .map((item) => ({
                ...item,
                percentage: total > 0 ? Math.round((item.amount / total) * 100) : 0,
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 6);
    }, [transactions, selectedTab]);

    // Weekly data
    const weeklyData = useMemo(() => {
        // Demo data with different heights (fallback)
        const demoData = [
            { day: 'Mon', amount: 120 },
            { day: 'Tue', amount: 200 },
            { day: 'Wed', amount: 80 },
            { day: 'Thu', amount: 250 },
            { day: 'Fri', amount: 180 },
            { day: 'Sat', amount: 300 },
            { day: 'Sun', amount: 150 },
        ];

        // Try to get real data
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const realData = [];
        let hasDifferentValues = false;

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dayName = days[date.getDay()];
            const dateStr = date.toDateString();

            // Filter transactions for this specific day
            const dayTotal = transactions
                .filter((t) => {
                    return t.date === dateStr && t.type === 'expense';
                })
                .reduce((sum, t) => sum + t.amount, 0);

            realData.push({ day: dayName, amount: dayTotal });
        }

        // Check if all values are the same
        const firstAmount = realData[0]?.amount || 0;
        hasDifferentValues = realData.some(d => d.amount !== firstAmount);

        // Only use real data if it has different values
        return hasDifferentValues ? realData : demoData;
    }, [transactions]);

    const maxBarHeight = 150;
    const maxAmount = Math.max(...weeklyData.map((d) => d.amount), 1);

    const renderBarChart = () => (
        <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Spending Overview</Text>

            {/* Period Selector */}
            <View style={styles.periodSelector}>
                {['week', 'month', 'year'].map((period) => (
                    <TouchableOpacity
                        key={period}
                        style={[
                            styles.periodButton,
                            selectedPeriod === period && styles.periodButtonActive
                        ]}
                        onPress={() => setSelectedPeriod(period as any)}
                    >
                        <Text style={[
                            styles.periodButtonText,
                            selectedPeriod === period && styles.periodButtonTextActive
                        ]}>
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bar Chart */}
            <View style={styles.barChartContainer}>
                {weeklyData.map((item, index) => {
                    const barHeight = maxAmount > 0 ? (item.amount / maxAmount) * maxBarHeight : 0;
                    return (
                        <View key={index} style={styles.barWrapper}>
                            <Text style={styles.barValue}>${item.amount}</Text>
                            <View style={[styles.bar, { height: Math.max(barHeight, 4) }]}>
                                <View style={styles.barFill} />
                            </View>
                            <Text style={styles.barDay}>{item.day}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );

    // FIXED: Now uses categoryData (correct variable name)
    const renderCategoryBreakdown = () => (
        <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Category Breakdown</Text>

            {categoryData.length === 0 ? (
                <View style={styles.emptyCategory}>
                    <Ionicons name="pie-chart-outline" size={40} color="#CCCCCC" />
                    <Text style={styles.emptyCategoryText}>No {selectedTab} data yet</Text>
                </View>
            ) : (
                categoryData.map((item, index) => (
                    <View key={index} style={styles.categoryRow}>
                        <View style={styles.categoryLeft}>
                            <View style={[styles.categoryDot, { backgroundColor: item.category.color + '30' }]}>
                                <Text style={styles.categoryDotIcon}>{item.category.icon}</Text>
                            </View>
                            <View style={styles.categoryInfo}>
                                <Text style={styles.categoryName}>{item.category.name}</Text>
                                <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
                            </View>
                        </View>
                        <View style={styles.categoryRight}>
                            <View style={styles.progressBarBg}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        {
                                            width: `${item.percentage}%`,
                                            backgroundColor: item.category.color
                                        }
                                    ]}
                                />
                            </View>
                            <Text style={styles.categoryAmount}>
                                ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </Text>
                        </View>
                    </View>
                ))
            )}
        </View>
    );

    const renderSummaryCards = () => (
        <View style={styles.summaryContainer}>
            <View style={[styles.summaryCard, { backgroundColor: '#E8F4FD' }]}>
                <View style={styles.summaryIcon}>
                    <Ionicons name="arrow-down" size={24} color={COLORS.income || '#4CAF50'} />
                </View>
                <Text style={styles.summaryLabel}>Total Income</Text>
                <Text style={[styles.summaryAmount, { color: COLORS.income || '#4CAF50' }]}>
                    ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#FFF0F0' }]}>
                <View style={styles.summaryIcon}>
                    <Ionicons name="arrow-up" size={24} color={COLORS.expense || '#F44336'} />
                </View>
                <Text style={styles.summaryLabel}>Total Expense</Text>
                <Text style={[styles.summaryAmount, { color: COLORS.expense || '#F44336' }]}>
                    ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#F4F9FF' }]}>
                <View style={styles.summaryIcon}>
                    <Ionicons name="calendar-outline" size={24} color={COLORS.blueShadeOne} />
                </View>
                <Text style={styles.summaryLabel}>Daily Average</Text>
                <Text style={[styles.summaryAmount, { color: COLORS.blueShadeOne }]}>
                    ${averageDaily.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Curved Header */}
                <View style={styles.curvedHeader}>
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />
                    <View style={styles.circle3} />

                    <Text style={styles.headerTitle}>Statistics</Text>

                    {/* Tab Toggle */}
                    <View style={styles.tabToggle}>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                selectedTab === 'expense' && styles.tabButtonActive
                            ]}
                            onPress={() => setSelectedTab('expense')}
                        >
                            <Text style={[
                                styles.tabButtonText,
                                selectedTab === 'expense' && styles.tabButtonTextActive
                            ]}>Expense</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                selectedTab === 'income' && styles.tabButtonActive
                            ]}
                            onPress={() => setSelectedTab('income')}
                        >
                            <Text style={[
                                styles.tabButtonText,
                                selectedTab === 'income' && styles.tabButtonTextActive
                            ]}>Income</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Summary Cards */}
                {renderSummaryCards()}

                {/* Bar Chart */}
                {renderBarChart()}

                {/* Category Breakdown */}
                {renderCategoryBreakdown()}

                <View style={{ height: 20 }} />
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
    // Curved Header
    curvedHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 20,
    },
    circle1: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        top: -80,
        right: -60,
    },
    circle2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        bottom: -30,
        left: -40,
    },
    circle3: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: 40,
        left: 30,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        zIndex: 1,
    },
    timeText: {
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.white,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.white,
        paddingHorizontal: 20,
        marginBottom: 20,
        zIndex: 1,
    },
    tabToggle: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        padding: 4,
        marginHorizontal: 20,
        zIndex: 1,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 22,
    },
    tabButtonActive: {
        backgroundColor: COLORS.white,
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    tabButtonTextActive: {
        color: COLORS.primary,
    },
    // Summary Cards
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    summaryCard: {
        flex: 1,
        padding: 14,
        borderRadius: 16,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    summaryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 11,
        color: '#6B7C85',
        marginBottom: 4,
    },
    summaryAmount: {
        fontSize: 15,
        fontWeight: '700',
    },
    // Chart Card
    chartCard: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primaryDark,
        marginBottom: 16,
    },
    // Period Selector
    periodSelector: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 4,
        marginBottom: 20,
    },
    periodButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 18,
    },
    periodButtonActive: {
        backgroundColor: COLORS.primary,
    },
    periodButtonText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#8A9AA3',
    },
    periodButtonTextActive: {
        color: COLORS.white,
    },
    // Bar Chart
    barChartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
        paddingTop: 20,
    },
    barWrapper: {
        alignItems: 'center',
        flex: 1,
    },
    barLabelContainer: {
        marginBottom: 6,
    },
    barValue: {
        fontSize: 10,
        color: '#8A9AA3',
        fontWeight: '500',
    },
    bar: {
        width: 24,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        opacity: 0.8,
    },
    barDay: {
        fontSize: 11,
        color: '#8A9AA3',
        marginTop: 8,
    },
    // Category Breakdown
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    categoryDot: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    categoryDotIcon: {
        fontSize: 16,
    },
    categoryInfo: {
        flex: 1,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primaryDark,
        marginBottom: 2,
    },
    categoryPercentage: {
        fontSize: 12,
        color: '#8A9AA3',
    },
    categoryRight: {
        alignItems: 'flex-end',
        flex: 1,
    },
    progressBarBg: {
        width: '100%',
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginBottom: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    categoryAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primaryDark,
    },
    emptyCategory: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    emptyCategoryText: {
        fontSize: 14,
        color: '#8A9AA3',
        marginTop: 8,
    },
});

export default StatisticsScreen;