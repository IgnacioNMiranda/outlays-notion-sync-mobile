import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components'
import { HomeScreen } from '../../screens/home/home'
import { NewOutlayScreen } from '../../screens/new-outlay/new-outlay'
import { ImageProps } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

const HomeIcon = (props: ImageProps): IconElement => <Icon {...props} name="home-outline" />
const NewOutlayIcon = (props: ImageProps): IconElement => <Icon {...props} name="plus-outline" />

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="HOME" icon={HomeIcon} />
    <BottomNavigationTab title="NEW OUTLAY" icon={NewOutlayIcon} />
  </BottomNavigation>
)

export const TabNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }} />
    <Screen name="New Outlay" component={NewOutlayScreen} />
  </Navigator>
)
