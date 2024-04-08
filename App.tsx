import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ManageExpense } from './src/screens/ManageExpense';
import { AllExpenses } from './src/screens/AllExpenses';
import { RecentExpence } from './src/screens/RecentExpense';
import { GlobalStyles } from './src/constants/styles';
import {  Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpence}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="hourglass" size={size} color={color} />
            )
          }
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="calendar" size={size} color={color} />
            )
          }
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
   <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="light" />
   </>
  );
}


