import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, BottomNavigationTabProps, Icon, useTheme } from '@ui-kitten/components'
import { MyOutlaysScreen } from '../../screens/my-outlays/my-outlays'
import { NewOutlayScreen } from '../../screens/new-outlay/new-outlay'
import { useCustomFonts } from '../../hooks/use-custom-fonts'

const { Navigator, Screen } = createBottomTabNavigator()

const BookIcon: BottomNavigationTabProps['icon'] = (props) => <Icon {...props} name="book-open-outline" />
const PlusIcon: BottomNavigationTabProps['icon'] = (props) => <Icon {...props} name="plus-outline" />

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="NEW OUTLAY" icon={PlusIcon} />
    <BottomNavigationTab title="MY OUTLAYS" icon={BookIcon} />
  </BottomNavigation>
)

export const TabNavigator = () => {
  const { fontsLoaded } = useCustomFonts()
  const theme = useTheme()

  if (!fontsLoaded) return null

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{
        backgroundColor: theme['background-basic-color-1'],
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Screen
        name="New Outlay"
        component={NewOutlayScreen}
        options={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }}
      />
      <Screen
        name="My Outlays"
        component={MyOutlaysScreen}
        options={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }}
      />
    </Navigator>
  )
}
