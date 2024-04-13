import axios from 'axios'
import { IExpense } from '../Interfaces/IExpense'

const api = axios.create({
    baseURL: `${process.env.FIREBASE_URL}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const storeExpense = async (expenseData: IExpense) => {
    try{
        const response = await api.post('expenses.json', expenseData)
        const id = response.data.name
        return id
    }catch(err){
        console.log(err)
        return
    }
}

export const fetchExpenses = async () => {
    try{
        const expenses: IExpense[] = []
        const resp = await api.get('expenses.json')
        
        for(const key in resp.data){
            expenses.push({
                id: key,
                description: resp.data[key].description,
                amount: resp.data[key].amount,
                date: new Date(resp.data[key].date)
            })
        }

        return expenses
    }catch(err){
        console.log(err)
        return
    }
}

export const updateExpense = async (id: string, expenseData: IExpense) => {
    try{
        const response = await api.put(`expenses/${id}.json`, expenseData)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const deleteExpense = async (id: string) => {
    try{
        await api.delete(`expenses/${id}.json`)
    }catch(err){
        console.log(err)
    }
}