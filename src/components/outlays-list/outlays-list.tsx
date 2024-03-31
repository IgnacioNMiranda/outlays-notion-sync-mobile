import { Divider, List as KittenList, ListItem } from '@ui-kitten/components'
import { OutlayEntry } from '../../services/notion/get-outlay-entries'
import { formatCurrency } from '../../utils/formatters'

const ListItemRenderer = ({
  item,
}: {
  item: {
    title: string
    description: string
  }
}) => <ListItem title={item.title} description={item.description} />

export const OutlaysList = ({ outlays }: { outlays: OutlayEntry[] }) => {
  const data = outlays.map((outlay) => ({
    title: `${outlay.title} (${outlay.date})`,
    description: formatCurrency(outlay.price),
  }))

  return (
    <KittenList style={{ width: '100%' }} data={data} ItemSeparatorComponent={Divider} renderItem={ListItemRenderer} />
  )
}
