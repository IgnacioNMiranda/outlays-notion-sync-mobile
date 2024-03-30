import { notionClient } from './client'
import { NOTION_SUMMARY_DATABASE_ID } from '@env'

const monthsMapping: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export const getSpentMoney = async () => {
  const year = new Date().getFullYear().toString()

  const data = await notionClient.databases.query({ database_id: NOTION_SUMMARY_DATABASE_ID })

  const currentYearPage = data.results.find((page) => {
    if (page && 'properties' in page) {
      const nameProperty = page.properties.Name
      if ('title' in nameProperty) {
        return nameProperty.title[0].plain_text === year
      }
    }
  })

  let currentMonthSpentMoney = -1
  if (currentYearPage && 'properties' in currentYearPage) {
    const monthPropertyKey = monthsMapping[new Date().getMonth()]
    const monthProperty = currentYearPage.properties[monthPropertyKey]

    if (
      monthProperty.type === 'rollup' &&
      monthProperty.rollup.type === 'number' &&
      typeof monthProperty.rollup.number !== 'undefined'
    ) {
      currentMonthSpentMoney = monthProperty.rollup.number ?? -1
    }
  }

  return currentMonthSpentMoney
}
