import { Pressable, Text, View, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from "../../constants/styles"
import { IExpense } from "../../Interfaces/IExpense"
import { getFormattedDate } from "../../util/date"
import { ProfileScreenNavigationProp } from "../../types/ProfileScreenNavigtionProp"

type Props = {
    expense: IExpense
}

export const ExpenseItem = ({expense}:Props) => {
    const navigation = useNavigation<ProfileScreenNavigationProp>()

    const expensePressedHandler = () => {
        navigation.navigate('ManageExpense',{expenseId: expense.id})
    }

    return(
        <Pressable
            style={({pressed}) => pressed && styles.pessed}
            onPress={expensePressedHandler}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{expense.description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(expense.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>$ {expense.amount.toFixed(2)}</Text>
                </View>                
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pessed:{
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    textBase:{
        color: GlobalStyles.colors.primary50
    },
    description:{
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    amount:{
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
})