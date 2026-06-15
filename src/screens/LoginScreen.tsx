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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAuthStore } from '../store/useAuthStore';

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const login = useAuthStore((state) => state.login);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (pin.length < 4) {
            setError('Please enter a 4-digit PIN');
            return;
        }

        const success = login(pin);
        if (success) {
            navigation.replace('MainApp');
        } else {
            setError('Incorrect PIN');
            setPin('');
        }
    };

    const handlePinPress = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setError('');
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
        setError('');
    };

    const handleForgotPin = () => {
        Alert.alert(
            'Reset PIN',
            'This will reset your PIN. You will need to set up a new one.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => navigation.replace('SetupPin'),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                {/* Header */}
                <View style={styles.curvedHeader}>
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />
                    <View style={styles.circle3} />

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Welcome Back</Text>
                    <Text style={styles.headerSubtitle}>Enter your PIN to continue</Text>
                </View>

                {/* PIN Display */}
                <View style={styles.pinDisplay}>
                    {[0, 1, 2, 3].map((index) => (
                        <View
                            key={index}
                            style={[
                                styles.pinDot,
                                index < pin.length && styles.pinDotFilled,
                            ]}
                        />
                    ))}
                </View>

                {/* Error Message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Number Pad */}
                <View style={styles.numberPad}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((digit, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.numberButton}
                            onPress={() => {
                                if (digit === '⌫') handleDelete();
                                else if (digit !== '') handlePinPress(digit);
                            }}
                            disabled={digit === ''}
                        >
                            {digit === '⌫' ? (
                                <Ionicons name="backspace-outline" size={28} color={COLORS.primaryDark} />
                            ) : digit !== '' ? (
                                <Text style={styles.numberText}>{digit}</Text>
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Forgot PIN */}
                <TouchableOpacity onPress={handleForgotPin} style={styles.forgotButton}>
                    <Text style={styles.forgotText}>Forgot PIN?</Text>
                </TouchableOpacity>
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
    curvedHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
        paddingBottom: 40,
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
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
        left: 20,
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.white,
        marginTop: 30,
        zIndex: 1,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 8,
        zIndex: 1,
    },
    pinDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    pinDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        marginHorizontal: 10,
    },
    pinDotFilled: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    errorText: {
        color: '#F44336',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 10,
    },
    numberPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 40,
        marginTop: 20,
    },
    numberButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 40,
        backgroundColor: COLORS.white,
    },
    numberText: {
        fontSize: 28,
        fontWeight: '600',
        color: COLORS.primaryDark,
    },
    forgotButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    forgotText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
});

export default LoginScreen;