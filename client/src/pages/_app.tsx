import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import PrivateRoute from "../../middleware/PrivateRoute";
import { Provider } from 'react-redux';
import store from "../../Redux/store";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes"


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen">
          <Component {...pageProps} />
          </div>
        </NextThemesProvider> 
      <Toaster />
      </Provider>
  )
};

export default PrivateRoute(MyApp);