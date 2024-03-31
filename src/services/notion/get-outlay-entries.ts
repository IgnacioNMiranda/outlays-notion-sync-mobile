import { notionClient } from './client'
import { NOTION_DATABASE_ID } from '@env'

export type OutlayEntry = {
  title: string
  date: string
  price: number
}

export const getOutlayEntries = async () => {
  const data = await notionClient.databases.query({
    database_id: NOTION_DATABASE_ID,
    sorts: [
      {
        property: 'Purchase Date',
        direction: 'descending',
      },
    ],
    page_size: 50,
  })

  return data.results
    .map((page) => {
      if (page && 'properties' in page) {
        const nameProperty = page.properties.Name
        let name: undefined | string
        if ('title' in nameProperty && nameProperty.title[0]?.plain_text) {
          name = nameProperty.title[0].plain_text
        }

        const purchaseDateProperty = page.properties['Purchase Date']
        let purchaseDate: undefined | string
        if (purchaseDateProperty.type === 'date') purchaseDate = purchaseDateProperty.date?.start

        const avgPriceProperty = page.properties['Price (average)']
        let avgPrice: undefined | number
        if (avgPriceProperty.type === 'number') avgPrice = avgPriceProperty.number ?? undefined

        if (name && purchaseDate && avgPrice)
          return {
            title: name,
            date: purchaseDate,
            price: avgPrice,
          }
      }
    })
    .filter(Boolean) as OutlayEntry[]
}
