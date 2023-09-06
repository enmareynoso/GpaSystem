import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import PrivateRoute from "../../middleware/PrivateRoute";
import { Provider } from 'react-redux';
import store from "../../Redux/store";
import dotenv from 'dotenv';
dotenv.config();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
  )
};

export default PrivateRoute(MyApp);