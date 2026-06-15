# 💰 SpendWise - Personal Expense Tracker

A beautifully designed personal expense tracker mobile app built with **React Native**, **Expo**, and **TypeScript**. Track your income and expenses, view statistics with interactive charts, and manage your finances with an intuitive interface.

## ✨ Features

- 🔐 **PIN Authentication** - Secure your data with a 4-digit PIN
- 👤 **User Profile** - Customize name, avatar color
- 💰 **Income & Expense Tracking** - Add, edit, and delete transactions
- 📊 **Statistics Dashboard** - Bar charts and category breakdowns
- 📂 **Category System** - 12 categories with icons and colors
- 📅 **Date Picker** - Select custom dates for transactions
- 🎨 **Beautiful UI** - Curved headers, circle effects, teal/sky-blue theme
- 💾 **Persistent Storage** - Data survives app restarts (AsyncStorage)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Mobile framework |
| **Expo** | Development platform |
| **TypeScript** | Type safety |
| **Zustand** | State management |
| **React Navigation** | Navigation (Stack + Tabs) |
| **Ionicons** | Icon library |
| **AsyncStorage** | Local data persistence |
| **DateTimePicker** | Date selection |

## 📸 Screens

- **Splash Screen** - Animated intro with branding
- **Onboarding** - 3-slide introduction
- **Setup PIN** - Create 4-digit security PIN
- **Profile Setup** - Set name and avatar color
- **Login** - PIN entry with number pad
- **Home** - Balance overview, recent transactions
- **Statistics** - Bar charts, category breakdown
- **Add Expense** - Form with category, amount, date
- **Edit Transaction** - Modify existing transactions
- **Transactions** - Filtered list by All/Income/Expense
- **Profile** - User info, settings, logout


## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app (iOS/Android) or emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/RebeccaMeegahapola/Expense-Tracker.git

# Navigate to project
cd expense-tracker-app

# Install dependencies
npm install

# Start the app
npx expo start
