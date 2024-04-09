import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/RootStackNavigation'
import { useLayoutEffect } from 'react'
import { IconButton } from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'
import { Button } from '../components/ui/Button'

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>

export const ManageExpense = ({ route, navigation }:Props) => {
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    },[navigation, isEditing])

    const deleteHandler = () => {
        navigation.goBack()
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = () => {
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} mode="flat" onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button:{
       width: 120,
       marginHorizontal: 8 
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})