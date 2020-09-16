import { StackNavigator } from 'react-navigation';

import Counter from './containers/Counter';
import Auth from './containers/AuthScreen/Auth';
import SignupForm from './containers/AuthScreen/SignupForm';
import AddressForm from './containers/AuthScreen/AddressForm';
import HomeInfoForm from './containers/AuthScreen/HomeInfoForm';
import Home from './containers/Home';
import Schedule from './containers/Schedule';
import Payment from './containers/Payment';
import ConfirmOrder from './containers/ConfirmOrder';
import Settings from './containers/Settings';
import Webviewer from './containers/Webviewer';
import ContactUs from './containers/ContactUs';
import EditAccount from './containers/EditAccount';


const AppNavigator = new StackNavigator(
  {
    Auth: { screen: Auth },
    SignupForm: { screen: SignupForm },
    AddressForm: { screen: AddressForm },
    HomeInfoForm: { screen: HomeInfoForm },
    Home: { screen: Home,
            navigationOptions: {
              gesturesEnabled: false,
    }},
    Settings: { screen: Settings },
    EditAccount: { screen: EditAccount },
    Webviewer: { screen: Webviewer },
    ContactUs: { screen: ContactUs },
    Schedule: { screen: Schedule },
    Payment: { screen: Payment },
    ConfirmOrder: { screen: ConfirmOrder },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
);

export default AppNavigator;
