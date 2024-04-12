import { View, StyleSheet, Text } from 'react-native'
import { ExpensesSummary } from './ExpensesSummary'
import { ExpensesList } from './ExpensesList'
import { IExpense } from '../../Interfaces/IExpense'
import { DummyExpenses } from '../../data/dummy_expenses'
import { GlobalStyles } from '../../constants/styles'

type Props = {
    expenses: IExpense[]
    expensesPeriod: string
    fallbackText: string
}

export const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }:Props) => {
    let content = <Text style={style.infoText}>{fallbackText}</Text>

    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses}/>
    }

    return (
        <View style={style.container}>
            <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod}/>
            {content}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})