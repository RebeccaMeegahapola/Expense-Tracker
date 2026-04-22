// src/screens/ProfileScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const ProfileScreen = () => {
    const userData = {
        name: 'Enjelin Morgeana',
        username: '@enjelin_morgeana',
        avatar: 'EM',
    };

    const menuItems = [
        {
            id: '1',
            title: 'Invite Friends',
            icon: 'person-add-outline',
            color: '#4A90E2',
        },
        {
            id: '2',
            title: 'Account info',
            icon: 'person-outline',
            color: '#4CAF50',
        },
        {
            id: '3',
            title: 'Personal profile',
            icon: 'create-outline',
            color: '#FF9800',
        },
        {
            id: '4',
            title: 'Message center',
            icon: 'chatbubble-outline',
            color: '#9C27B0',
        },
        {
            id: '5',
            title: 'Login and security',
            icon: 'shield-checkmark-outline',
            color: '#F44336',
        },
        {
            id: '6',
            title: 'Data and privacy',
            icon: 'lock-closed-outline',
            color: '#607D8B',
        },
    ];

    const renderMenuItem = (item: typeof menuItems[0]) => (
        <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
    );

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
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                {/* Profile Card - Overlaps the header */}
                <View style={styles.profileCardWrapper}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{userData.avatar}</Text>
                    </View>
                    <Text style={styles.userName}>{userData.name}</Text>
                    <Text style={styles.userUsername}>{userData.username}</Text>
                </View>

                {/* Menu Section */}
                <View style={styles.menuContainer}>
                    <Text style={styles.menuSectionTitle}>Account Settings</Text>
                    {menuItems.map(renderMenuItem)}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
                    <Ionicons name="log-out-outline" size={20} color="#F44336" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.0.0</Text>
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
        height: 180,
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
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
        paddingHorizontal: 20,
    },
    profileCardWrapper: {
        paddingHorizontal: 20,
        marginTop: -50,
        marginBottom: 15,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.white,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primaryDark,
        marginBottom: 4,
    },
    userUsername: {
        fontSize: 14,
        color: COLORS.textMuted,
        fontWeight: '400',
    },
    menuContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    menuSectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8A9AA3',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: 42,
        height: 42,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.primaryDark,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 25,
        paddingVertical: 14,
        backgroundColor: COLORS.white,
        borderRadius: 12,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#F44336',
        marginLeft: 8,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#B0BEC5',
        marginTop: 10,
    },
});

export default ProfileScreen;