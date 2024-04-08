import { View, StyleSheet } from 'react-native'
import { ExpensesSummary } from './ExpensesSummary'
import { ExpensesList } from './ExpensesList'
import { IExpense } from '../../Interfaces/IExpense'
import { DummyExpenses } from '../../data/dummy_expenses'
import { GlobalStyles } from '../../constants/styles'

type Props = {
    expenses?: IExpense[]
    expensesPeriod: string
}

export const ExpensesOutput = ({ expenses, expensesPeriod }:Props) => {
    return (
        <View style={style.container}>
            <ExpensesSummary expenses={DummyExpenses} expensesPeriod={expensesPeriod}/>
            <ExpensesList expenses={DummyExpenses}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})