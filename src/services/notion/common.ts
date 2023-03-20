import { notionClient } from './client'
import { NOTION_DATABASE_ID, NOTION_PAYMENT_METHOD_PROPERTY_KEY, NOTION_TAGS_PROPERTY_KEY } from '@env'

export const getData = async () => {
  const tags: string[] = []
  const paymentMethods: string[] = []

  const data = await notionClient.databases.retrieve({ database_id: NOTION_DATABASE_ID })
  if (data && 'properties' in data) {
    const tagsProperty = data.properties[NOTION_TAGS_PROPERTY_KEY]
    const paymentMethodsProperty = data.properties[NOTION_PAYMENT_METHOD_PROPERTY_KEY]
    if (tagsProperty && 'multi_select' in tagsProperty) {
      tags.push(...tagsProperty.multi_select.options.map((option) => option.name))
    }
    if (paymentMethodsProperty && 'select' in paymentMethodsProperty) {
      paymentMethods.push(...paymentMethodsProperty.select.options.map((option) => option.name))
    }
  }
  return { tags, paymentMethods }
}
