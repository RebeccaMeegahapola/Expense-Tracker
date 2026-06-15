import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAuthStore } from '../store/useAuthStore';

const ProfileSetupScreen = () => {
    const navigation = useNavigation<any>();
    const userName = useAuthStore((state) => state.userName);
    const setUserName = useAuthStore((state) => state.setUserName);
    const savedAvatarColor = useAuthStore((state) => state.avatarColor);
    const saveAvatarColor = useAuthStore((state) => state.setAvatarColor);

    const [name, setName] = useState(userName || '');
    const [email, setEmail] = useState('');
    const [selectedColor, setSelectedColor] = useState(savedAvatarColor || COLORS.primary);

    const avatarColors = [
        COLORS.primary,
        '#FF6B6B',
        '#4ECDC4',
        '#FF9800',
        '#9C27B0',
        '#607D8B',
    ];

    const getInitials = (fullName: string) => {
        const names = fullName.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return fullName.substring(0, 2).toUpperCase();
    };

    const handleColorSelect = (color: string) => {
        console.log('Color selected:', color);
        setSelectedColor(color);
    };

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        setUserName(name.trim());
        saveAvatarColor(selectedColor);
        navigation.replace('MainApp');
    };

    const handleSkip = () => {
        navigation.replace('MainApp');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <View style={styles.curvedHeader}>
                        <View style={styles.circle1} />
                        <View style={styles.circle2} />
                        <View style={styles.circle3} />

                        <Text style={styles.headerTitle}>Create Profile</Text>
                        <Text style={styles.headerSubtitle}>Personalize your experience</Text>
                    </View>

                    {/* Avatar Preview */}
                    <View style={styles.avatarSection}>
                        <View style={[styles.avatarContainer, { backgroundColor: selectedColor }]}>
                            <Text style={styles.avatarText}>
                                {name ? getInitials(name) : '?'}
                            </Text>
                        </View>

                        {/* Color Picker */}
                        <Text style={styles.colorLabel}>Choose Avatar Color</Text>
                        <View style={styles.colorRow}>
                            {avatarColors.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorDot,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.colorDotSelected,
                                    ]}
                                    onPress={() => handleColorSelect(color)}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.formSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>FULL NAME</Text>
                            <View style={styles.borderedInput}>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#B0BEC5"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>EMAIL (OPTIONAL)</Text>
                            <View style={styles.borderedInput}>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#B0BEC5"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Buttons */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save & Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    curvedHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 30 : 50,
        paddingBottom: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center',
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
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.white,
        zIndex: 1,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 2,
        zIndex: 1,
    },
    avatarSection: {
        alignItems: 'center',
        marginTop: -40,
        marginBottom: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '700',
        color: COLORS.white,
    },
    colorLabel: {
        fontSize: 14,
        color: '#8A9AA3',
        marginTop: 15,
        marginBottom: 10,
    },
    colorRow: {
        flexDirection: 'row',
        gap: 12,
    },
    colorDot: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    colorDotSelected: {
        borderWidth: 3,
        borderColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    formSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    inputGroup: {
        marginBottom: 24,
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
    skipButton: {
        alignItems: 'center',
        marginTop: 15,
    },
    skipText: {
        fontSize: 14,
        color: '#8A9AA3',
        fontWeight: '500',
    },
});

export default ProfileSetupScreen;