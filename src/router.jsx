 import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Catalog from "./pages/Catalog/Catalog";
import Forum from "./pages/Forum/Forum"
import Reviews from "./pages/reviews/Reviews";
import Aksia from "./pages/Aksia/Aksia";
import News from "./pages/News/News";
import Information from "./pages/Information/Information";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Wishlist from "./pages/Wishlist/Wishlist";
import Banner from "./pages/Banner/Banner";
import Tovar from "./pages/tovar/Tovar";
import Korzina from "./pages/korzina/Korzina";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PetalMaker from "./pages/PetalMaker/PetalMaker";

 export const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Banner/>
            },
            {
                path: "catalog",
                element: <Catalog/>
            },
            {
                path: "PetalMaker",
                element: <PetalMaker/>
            },
            {
                path: "tovar",
                element: <Tovar/>
            },
            {
                path: "forum",
                element: <Forum/>
            },
            {
                path: "reviews",
                element: <Reviews/>
            },
            {
                path: "aksia",
                element: <Aksia/>
            },
            {
                path: "news",
                element: <News/>
            },
            {
                path: "info",
                element: <Information/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "registration",
                element: <Registration/>
            },
            {
                path: "wishlist",
                element: <Wishlist/>
            },
            {
                path: "Korzina",
                element: <Korzina/>
            },
            {
                path: "checkoutpage",
                element: <CheckoutPage/>
            },

        ]

    }
 ])