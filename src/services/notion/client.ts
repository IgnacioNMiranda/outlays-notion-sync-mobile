import { Client } from '@notionhq/client'
import { NOTION_ACCESS_TOKEN } from '@env'

export const notionClient = new Client({ auth: NOTION_ACCESS_TOKEN })
