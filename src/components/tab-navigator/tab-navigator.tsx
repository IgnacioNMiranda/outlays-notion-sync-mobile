import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, BottomNavigationTabProps, Icon } from '@ui-kitten/components'
import { HomeScreen } from '../../screens/home/home'
import { NewOutlayScreen } from '../../screens/new-outlay/new-outlay'
import { useCustomFonts } from '../../hooks/use-custom-fonts'

const { Navigator, Screen } = createBottomTabNavigator()

const HomeIcon: BottomNavigationTabProps['icon'] = (props) => <Icon {...props} name="home-outline" />
const NewOutlayIcon: BottomNavigationTabProps['icon'] = (props) => <Icon {...props} name="plus-outline" />

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="HOME" icon={HomeIcon} />
    <BottomNavigationTab title="NEW OUTLAY" icon={NewOutlayIcon} />
  </BottomNavigation>
)

export const TabNavigator = () => {
  const { fontsLoaded } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }} />
      <Screen name="New Outlay" component={NewOutlayScreen} />
    </Navigator>
  )
}
