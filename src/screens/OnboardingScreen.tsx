import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import { COLORS } from "../constants/colors";

export default function OnboardingScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Top Illustration - Takes most of the space */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/onboarding.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Bottom Content - Sticks to bottom */}
            <View style={styles.content}>
                <Text style={styles.title}>
                    Spend Smarter{'\n'}Save More
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('MainApp')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                    Already Have Account?{' '}
                    <Text style={styles.loginLink}>Log In</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60
    },
    image: {
        width: '80%',
        height: '80%',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 80,
        paddingTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        color: COLORS.primaryDark,
        marginBottom: 30,
        lineHeight: 38,
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.blueShadeOne,
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: COLORS.blueShadeTwo,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    loginText: {
        fontSize: 15,
        color: COLORS.textMuted,
    },
    loginLink: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});