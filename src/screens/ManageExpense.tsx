import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/RootStackNavigation'
import { useContext, useLayoutEffect } from 'react'
import { IconButton } from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'
import { Button } from '../components/ui/Button'
import { ExpensesContext } from '../store/expense-context'
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm'
import { IExpense } from '../Interfaces/IExpense'

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>

export const ManageExpense = ({ route, navigation }:Props) => {
    const expensesCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    },[navigation, isEditing])

    const deleteHandler = () => {
        if(expensesCtx && editedExpenseId) expensesCtx.deleteExpense(editedExpenseId)
       
        navigation.goBack()
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = (data: IExpense) => {
        if(isEditing){
            expensesCtx?.updateExpense(editedExpenseId, data)
        }else{
            expensesCtx?.addExpense(data)
        }
        navigation.goBack()
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