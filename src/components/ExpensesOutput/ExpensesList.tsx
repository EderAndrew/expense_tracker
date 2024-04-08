import { FlatList, ListRenderItemInfo, Text } from 'react-native'
import { IExpense } from '../../Interfaces/IExpense'

type Props = {
    expenses: IExpense[]
}

const renderExpenseItem = (itemData: ListRenderItemInfo<IExpense>) => {
    return (
        <Text>{itemData.item.description}</Text>
    )
}

export const ExpensesList = ({expenses}:Props) => {
    return (
        <FlatList
            data={expenses}
            renderItem={(item) => renderExpenseItem(item)}
            keyExtractor={(item) => item.id}      
        />
    )
}