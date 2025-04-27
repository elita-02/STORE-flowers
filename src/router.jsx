 import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Catalog from "./pages/Catalog/Catalog";
import Forum from "./pages/Forum/Forum"
import Reviews from "./pages/reviews/Reviews";
import Aksia from "./pages/Aksia/Aksia";
import News from "./pages/News/News";
import Registration from "./pages/Registration/Registration";
import Wishlist from "./pages/Wishlist/Wishlist";
import Banner from "./pages/Banner/Banner";
import Tovar from "./pages/tovar/Tovar";
import Korzina from "./pages/korzina/Korzina";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PetalMaker from "./pages/PetalMaker/PetalMaker";
import Izbrannyi from "./pages/izbrann/Izbrannyi";
import Contacty from "./pages/Contacty/Contacty";
import PostsPage from "./pages/PostsPage/PostsPage";
import DecorativeFlowersPage from "./pages/DecorativeFlowersPage/DecorativeFlowersPage";
import Historyzakaza from "./pages/Historyzakaza/Historyzakaza";
import Login from "./pages/Login/Login";

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
                path: "contacty",
                element: <Contacty/>
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
                path: "korzina",
                element: <Korzina/>
            },
            {
                path: "checkoutpage",
                element: <CheckoutPage/>
            },
            {
                path: "postspage",
                element: <PostsPage/>
            },
            {
                path: "decorative",
                element: < DecorativeFlowersPage/>
            },
            {
                path: "history",
                element: < Historyzakaza/>
            },
            {
                path: "izbran",
                element: <Izbrannyi/>
              
            },
        ]

    }
 ])