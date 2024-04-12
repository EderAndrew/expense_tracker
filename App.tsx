import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ManageExpense } from './src/screens/ManageExpense';
import { AllExpenses } from './src/screens/AllExpenses';
import { RecentExpence } from './src/screens/RecentExpense';
import { GlobalStyles } from './src/constants/styles';
import {  Ionicons } from '@expo/vector-icons'
import { IconButton } from './src/components/ui/IconButton';
import { ExpensesContextProvider } from './src/store/expense-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <IconButton
        icon="add" size={24}
        color={tintColor}
        onPress={()=>navigation.navigate("ManageExpense")}
      />
      )
    })}>
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
   <ExpensesContextProvider>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
        }}>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{
              title: 'Manage Expense',
              presentation: 'modal'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
    <StatusBar style="light" />
   </>
  );
}


