import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from "../constants/colors";

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);
    const slideAnim = new Animated.Value(50);

    useEffect(() => {
        // Entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('OnBoarding');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.bgCircle1} />
            <View style={styles.bgCircle2} />
            <View style={styles.bgCircle3} />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateY: slideAnim }
                        ]
                    }
                ]}
            >
                <Text style={styles.appName}>SpendWise</Text>

                <Text style={styles.tagline}>Track every expense,{'\n'}grow your savings</Text>
            </Animated.View>

            <Animated.Text
                style={[
                    styles.bottomText,
                    { opacity: fadeAnim }
                ]}
            >
                Smart Money Management
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    bgCircle1: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(74, 144, 226, 0.08)',
        top: -100,
        right: -100,
    },
    bgCircle2: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(135, 206, 250, 0.15)',
        bottom: 50,
        left: -80,
    },
    bgCircle3: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        bottom: 200,
        right: 50,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    appName: {
        fontSize: 42,
        fontWeight: '900',
        color: COLORS.primaryDark,
        marginBottom: 12,
        letterSpacing: 0.5,
        textTransform: 'uppercase'
    },
    tagline: {
        fontSize: 16,
        color: COLORS.blueShadeTwo,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
    bottomText: {
        position: 'absolute',
        bottom: 50,
        fontSize: 14,
        color: COLORS.blueShadeOne,
        fontWeight: '500',
        letterSpacing: 1,
    },
});

export default SplashScreen;