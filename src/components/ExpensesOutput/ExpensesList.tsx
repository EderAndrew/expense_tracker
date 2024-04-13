import { FlatList, ListRenderItemInfo, Text } from 'react-native'
import { IExpense } from '../../Interfaces/IExpense'
import { ExpenseItem } from './ExpenseItem'

type Props = {
    expenses: IExpense[]
}

const renderExpenseItem = (itemData: ListRenderItemInfo<IExpense>) => {
    return (
        <ExpenseItem expense={itemData.item}/>
    )
}

export const ExpensesList = ({expenses}:Props) => {
    return (
        <FlatList
            data={expenses}
            renderItem={(item) => renderExpenseItem(item)}
            keyExtractor={(item) => item.id as string}   
        />
    )
}