import { View, StyleSheet, Text, Alert } from "react-native"
import { Input } from "./Input"
import { useState } from "react"
import { IExpense } from "../../Interfaces/IExpense"
import { Button } from "../ui/Button"
import { getFormattedDate } from "../../util/date"

type Props = {
    onCancel: () => void
    onConfirm: (data:IExpense) => void
    isEditing: boolean
    defaultValues?: IExpense
}
export const ExpenseForm = ({ onCancel, onConfirm, isEditing, defaultValues }:Props) => {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : ''
    })

    const inputChangeHandler = (inputIdentifier: string, enteredValue: string) => {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }
    
    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert('Invalid input', 'Please check your input values')
            return
        }

        onConfirm(expenseData)
    }

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValues.amount
                }}/>
                <Input
                    style={styles.rowInput}
                    label="Date"
                    textInputConfig={{
                        placeholder:'YYYY-MM-DD',
                        maxLength:10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date
                    }}
                />
            </View>
            
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValues.description
                }}
            />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        marginTop: 8
    },
    inputsRow: {
        marginTop: 8,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    buttons:{
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8 
    },
})