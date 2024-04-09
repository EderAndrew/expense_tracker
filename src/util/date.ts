export const getFormattedDate = (date: Date) => {
    const correctMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    return `${date.getFullYear()}-${correctMonth}-${date.getDate()}`
}