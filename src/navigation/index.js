import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../screens/Home'
import Quiz from '../screens/Quiz'
import Results from '../screens/Results'

import routes from './routes'

const navigationOptions = {
  header: null,
  gesturesEnabled: false,
}

const stack = createStackNavigator(
  {
    [routes.HOME]: {
      screen: Home,
      navigationOptions,
    },
    [routes.QUIZ]: {
      screen: Quiz,
      navigationOptions,
    },
    [routes.RESULTS]: {
      screen: Results,
      navigationOptions,
    },
  },
)

export default createAppContainer(stack)
