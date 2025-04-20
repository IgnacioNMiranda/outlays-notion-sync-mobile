import { Divider, List as KittenList, ListItem } from '@ui-kitten/components'
import { Outlay } from '../../services/notion/get-outlays'
import { formatCurrency } from '../../utils/formatters'

const ListItemRenderer = ({
  item,
}: {
  item: {
    title: string
    description: string
  }
}) => <ListItem title={item.title} description={item.description} />

export const OutlaysList = ({ outlays }: { outlays: Outlay[] }) => {
  const data = outlays.map((outlay) => ({
    title: `${outlay.title} (${outlay.date})`,
    description: formatCurrency(outlay.price),
  }))

  return (
    <KittenList style={{ width: '100%' }} data={data} ItemSeparatorComponent={Divider} renderItem={ListItemRenderer} />
  )
}
