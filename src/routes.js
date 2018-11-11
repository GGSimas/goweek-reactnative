import { createStackNavigator } from 'react-navigation';

import Login from './pages/Login';
import TimeLine from './pages/Timeline';
import New from './pages/New';

const Routes = createStackNavigator({
  Login,
  TimeLine,
  New 
});

export default Routes;