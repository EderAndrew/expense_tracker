import { createContext, useReducer } from "react";
import { IExpense } from "../Interfaces/IExpense";

type SessionContextType = {
    expenses: IExpense[],
    addExpense: (expense: IExpense) => void,
    deleteExpense: (id: string) => void,
    updateExpense: (id: string, expense: IExpense) => void,
}

export const ExpensesContext = createContext<SessionContextType | null>(null)

export const expensesReducer = (state: string, action: any) => {
    switch (action.type) {
        case "ADD":
        case "UPDATE":
        case "DELETE":
        default:
            return state
    }
}
export const ExpensesContextProvider = ({children}:{children: React.ReactNode}) => {
    const [expensesState, dispatch] = useReducer(expensesReducer)

    return (
        <ExpensesContext.Provider value={{}}>
            {children}
        </ExpensesContext.Provider>
    )
}

