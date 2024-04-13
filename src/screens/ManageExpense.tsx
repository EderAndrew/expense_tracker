import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/RootStackNavigation'
import { useContext, useLayoutEffect, useState } from 'react'
import { IconButton } from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expense-context'
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm'
import { IExpense } from '../Interfaces/IExpense'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import { LoadingOverlay } from '../components/ui/LoadingOverlay'
import { ErrorOverlay } from '../components/ui/ErrorOverlay'

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>

export const ManageExpense = ({ route, navigation }:Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const expensesCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    },[navigation, isEditing])

    const deleteHandler = async() => {
        setIsSubmitting(true)
       try{
        await deleteExpense(editedExpenseId as string)
        if(expensesCtx && editedExpenseId) expensesCtx.deleteExpense(editedExpenseId)
       
        navigation.goBack()
       }catch(err){
        setError('Could not delete expense - please try again later.')
       }
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = async (data: IExpense) => {
        setIsSubmitting(true)
        try{
            if(isEditing){
                expensesCtx?.updateExpense(editedExpenseId, data)
                await updateExpense(editedExpenseId, data)
            }else{
                const id = await storeExpense(data)
                expensesCtx?.addExpense({...data, id})
            }
            navigation.goBack()
        }catch(err){
            setError('Could not save data - please try again later.')
            setIsSubmitting(false)
        }
    }

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={() => setError('')}/>
    }

    if(isSubmitting){
        return <LoadingOverlay />
    }

    return(
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onConfirm={confirmHandler}
                isEditing={isEditing}
                defaultValues={selectedExpense}
            />
            {isEditing && (
               <View style={styles.deleteContainer}>
                 <IconButton
                    onPress={deleteHandler}
                    icon="trash"
                    size={24}
                    color={GlobalStyles.colors.error500}
                 />
               </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})