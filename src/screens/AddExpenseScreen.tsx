import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import CategorySelector, { Category } from '../components/CategorySelector';

const AddExpenseScreen = () => {
    const [name, setName] = useState('Netflix');
    const [amount, setAmount] = useState('48.00');
    const [date, setDate] = useState('Tue, 22 Feb 2022');
    const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleClear = () => {
        setAmount('');
    };

    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        if (!name) {
            setName(category.name);
        }
    };

    const handleSave = () => {
        console.log({
            name,
            amount,
            date,
            type: selectedType,
            category: selectedCategory,
        });
    };

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

                    <Text style={styles.headerTitle}>Add Expense</Text>
                </View>

                {/* Form Card */}
                <View style={styles.formCardWrapper}>
                    <View style={styles.formCard}>
                        {/* Type Toggle */}
                        <View style={styles.typeToggle}>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    selectedType === 'expense' && styles.typeButtonActive
                                ]}
                                onPress={() => setSelectedType('expense')}
                            >
                                <Text style={[
                                    styles.typeButtonText,
                                    selectedType === 'expense' && styles.typeButtonTextActive
                                ]}>Expense</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    selectedType === 'income' && styles.typeButtonActive
                                ]}
                                onPress={() => setSelectedType('income')}
                            >
                                <Text style={[
                                    styles.typeButtonText,
                                    selectedType === 'income' && styles.typeButtonTextActive
                                ]}>Income</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Category Selector */}
                        {/*<CategorySelector*/}
                        {/*    selectedCategory={selectedCategory}*/}
                        {/*    onSelectCategory={handleSelectCategory}*/}
                        {/*/>*/}

                        <View style={styles.categoryWrapper}>
                            <CategorySelector
                                selectedCategory={selectedCategory}
                                onSelectCategory={handleSelectCategory}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>NAME</Text>
                            <View style={styles.borderedInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Enter name"
                                        placeholderTextColor="#B0BEC5"
                                    />
                                    <Ionicons name="close" size={20} color="#8A9AA3" />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>AMOUNT</Text>
                            <View style={styles.borderedInput}>
                                <View style={styles.amountInputContainer}>
                                    <Text style={styles.dollarSign}>$</Text>
                                    <TextInput
                                        style={styles.amountInput}
                                        value={amount}
                                        onChangeText={setAmount}
                                        placeholder="0.00"
                                        placeholderTextColor="#B0BEC5"
                                        keyboardType="decimal-pad"
                                    />
                                    <Ionicons name="close" size={20} color="#8A9AA3" />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.inputGroup, styles.lastInputGroup]}>
                            <Text style={styles.inputLabel}>DATE</Text>
                            <TouchableOpacity style={styles.borderedInput}>
                                <View style={styles.dateInputContainer}>
                                    <Text style={styles.dateText}>{date}</Text>
                                    <Ionicons name="calendar-outline" size={20} color="#8A9AA3" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Transaction</Text>
                </TouchableOpacity>
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
        height: 160,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        position: 'relative',
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
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    // Form Card
    formCardWrapper: {
        paddingHorizontal: 20,
        marginTop: -40,
        marginBottom: 20,
    },
    formCard: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    typeToggle: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 30,
        padding: 4,
        marginBottom: 20,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 26,
    },
    typeButtonActive: {
        backgroundColor: COLORS.primary,
    },
    typeButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#8A9AA3',
    },
    typeButtonTextActive: {
        color: COLORS.white,
    },
    categoryWrapper: {
        marginBottom: 0,
    },
    inputGroup: {
        marginBottom: 24,
    },
    lastInputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8A9AA3',
        letterSpacing: 1,
        marginBottom: 8,
    },
    borderedInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: COLORS.white,
    },
    input: {
        fontSize: 16,
        color: COLORS.primaryDark,
        fontWeight: '500',
        padding: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dollarSign: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.primaryDark,
        marginRight: 4,
    },
    amountInput: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.primaryDark,
        flex: 1,
        padding: 0,
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: COLORS.primaryDark,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.white,
    },
});

export default AddExpenseScreen;