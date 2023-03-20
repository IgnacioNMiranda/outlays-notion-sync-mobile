import { notionClient } from './client'

export const fetchData = async () => {
  const data = await notionClient.databases.list({})
  console.log(data)
}
