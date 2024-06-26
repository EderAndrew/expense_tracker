import { Text, View, StyleSheet } from 'react-native'
import { IExpense } from '../../Interfaces/IExpense'
import { GlobalStyles } from '../../constants/styles'

type Props = {
    expenses: IExpense[],
    expensesPeriod: string
}

export const ExpensesSummary = ({ expenses, expensesPeriod }:Props) => {
    const expensesSum = expenses?.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{expensesPeriod}</Text>
            <Text style={styles.sum}>${expensesSum?.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period:{
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum:{
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})