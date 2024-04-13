import { useContext, useEffect, useState } from 'react'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expense-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import { IExpense } from '../Interfaces/IExpense'
import { LoadingOverlay } from '../components/ui/LoadingOverlay'
import { ErrorOverlay } from '../components/ui/ErrorOverlay'

export const RecentExpence = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] =  useState('')

    const expensesCtx = useContext(ExpensesContext)
    
    useEffect(() => {
        (async() => {
            setIsLoading(true)
            try{
                const resp = await fetchExpenses() as IExpense[]
                setIsLoading(false)
                expensesCtx.setExpenses(resp)
            }catch(err){
                setError('Could not fetch expenses!')
            }
            
        })()
    },[])

    const errorHandler = () => {
        setError('')
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isLoading){
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)

        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })

    return(
       <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 days"
            fallbackText='No expenses registered for the last 7 days'
       />
    )
}