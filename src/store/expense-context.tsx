import { createContext, useReducer } from "react";
import { IExpense } from "../Interfaces/IExpense";


type SessionContextType = {
    expenses: IExpense[],
    addExpense: (expense: IExpense) => void,
    setExpenses: (expenses: IExpense[]) => void,
    deleteExpense: (id: string) => void,
    updateExpense: (id: string, expense: IExpense) => void,
}

export const initialState: SessionContextType = {
    expenses: [],
    addExpense: ({description, amount, date}: IExpense) => {},
    setExpenses: (expenses: IExpense[]) => {},
    deleteExpense: (id: string) => {},
    updateExpense: (id: string, {description, amount, date}: IExpense) => {},
}

export const ExpensesContext = createContext<SessionContextType>(initialState)

export const expensesReducer = (state: IExpense[], action: any) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updateExpenses = [...state]
            updateExpenses[updatableExpenseIndex] = updatedItem
            return updateExpenses
        case "DELETE":
            return state.filter(expense => expense.id !== action.payload)
        default:
            return state
    }
}
export const ExpensesContextProvider = ({children}:{children: React.ReactNode}) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const addExpense = (expenseData: IExpense) => {
        dispatch({type: "ADD", payload: expenseData})
    }

    const setExpenses = (expenses: IExpense[]) => {
        dispatch({type: "SET", payload: expenses})
    }

    const deleteExpense = (id: string) => {
        dispatch({type: "DELETE", payload: id})
    }

    const updateExpense = (id: string, expenseData: IExpense) => {
        dispatch({type: "UPDATE", payload: {id, data: expenseData}})
    }

    const provider = {
        expenses: expensesState,
        setExpenses,
        addExpense,
        deleteExpense,
        updateExpense
    }

    return (
        <ExpensesContext.Provider value={provider}>
            {children}
        </ExpensesContext.Provider>
    )
}

