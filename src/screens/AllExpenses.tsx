import { Text } from 'react-native'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react'
import { ExpensesContext } from '../store/expense-context'
export const AllExpenses = () => {
    const expenseCtx = useContext(ExpensesContext)
    return(
        <ExpensesOutput
            expenses={expenseCtx.expenses}
            expensesPeriod="Total"
            fallbackText="No registered expenses found."
        />
    )
}