import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';


export const CATEGORIES = [
    { id: '1', name: 'Food & Drinks', icon: '🍔', color: '#FF6B6B' },
    { id: '2', name: 'Shopping', icon: '🛒', color: '#4ECDC4' },
    { id: '3', name: 'Transport', icon: '🚗', color: '#45B7D1' },
    { id: '4', name: 'Entertainment', icon: '🎬', color: '#96CEB4' },
    { id: '5', name: 'Bills', icon: '📄', color: '#FFEAA7' },
    { id: '6', name: 'Healthcare', icon: '💊', color: '#DDA0DD' },
    { id: '7', name: 'Education', icon: '📚', color: '#98D8C8' },
    { id: '8', name: 'Groceries', icon: '🛒', color: '#55E6C1' },
    { id: '9', name: 'Subscription', icon: '📱', color: '#74B9FF' },
    { id: '10', name: 'Travel', icon: '✈️', color: '#A29BFE' },
    { id: '11', name: 'Gift', icon: '🎁', color: '#FD79A8' },
    { id: '12', name: 'Other', icon: '📌', color: '#B2BEC3' },
];

export type Category = typeof CATEGORIES[0];

interface CategorySelectorProps {
    selectedCategory: Category | null;
    onSelectCategory: (category: Category) => void;
    label?: string;
    placeholder?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
         selectedCategory,
         onSelectCategory,
         label = 'CATEGORY',
         placeholder = 'Select a category'
    }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (category: Category) => {
        onSelectCategory(category);
        setShowModal(false);
    };

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory?.id === item.id && styles.categoryItemSelected
            ]}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
        >
            <View style={[styles.categoryIconWrapper, { backgroundColor: item.color + '20' }]}>
                <Text style={styles.categoryIconLarge}>{item.icon}</Text>
            </View>
            <Text style={styles.categoryItemName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity
                style={styles.selector}
                onPress={() => setShowModal(true)}
                activeOpacity={0.7}
            >
                {selectedCategory ? (
                    <View style={styles.selectedContainer}>
                        <Text style={styles.categoryIcon}>{selectedCategory.icon}</Text>
                        <Text style={styles.categoryName}>{selectedCategory.name}</Text>
                    </View>
                ) : (
                    <Text style={styles.placeholder}>{placeholder}</Text>
                )}
                <Ionicons name="chevron-down" size={20} color="#8A9AA3" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Category</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Ionicons name="close" size={24} color={COLORS.primaryDark} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={CATEGORIES}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            renderItem={renderCategoryItem}
                            contentContainerStyle={styles.categoryList}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8A9AA3',
        letterSpacing: 1,
        marginBottom: 8,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 0
    },
    categoryIcon: {
        fontSize: 22,
        marginRight: 10,
    },
    categoryName: {
        fontSize: 16,
        color: COLORS.primaryDark,
        fontWeight: '500',
    },
    placeholder: {
        fontSize: 16,
        color: '#B0BEC5',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    categoryList: {
        paddingHorizontal: 10,
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom: 15,
        paddingVertical: 10,
        borderRadius: 12,
    },
    categoryItemSelected: {
        backgroundColor: COLORS.primary + '10',
    },
    categoryIconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    categoryIconLarge: {
        fontSize: 28,
    },
    categoryItemName: {
        fontSize: 12,
        color: COLORS.primaryDark,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default CategorySelector;