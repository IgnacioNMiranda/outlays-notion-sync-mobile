import { notionClient } from './client'
import { NOTION_DATABASE_ID } from '@env'

export const getSchema = async () => {
  const tags: string[] = []
  const paymentMethods: string[] = []

  const data = await notionClient.databases.retrieve({ database_id: NOTION_DATABASE_ID })
  if (data && 'properties' in data) {
    const tagsProperty = data.properties.Tags
    const paymentMethodsProperty = data.properties['Payment method']
    if (tagsProperty && 'multi_select' in tagsProperty) {
      tags.push(...tagsProperty.multi_select.options.map((option) => option.name))
    }
    if (paymentMethodsProperty && 'select' in paymentMethodsProperty) {
      paymentMethods.push(...paymentMethodsProperty.select.options.map((option) => option.name))
    }
  }

  return { tags, paymentMethods }
}
