import Home01 from "./Home01";
import Explore04 from "./Explore04";
import LiveAuctions from "./LiveAuctions";
import ItemDetails02 from "./ItemDetails02";
import Activity01 from "./Activity01";
import Blog from "./Blog";
import BlogDetails from "./BlogDetails";
import HelpCenter from "./HelpCenter";
import Authors02 from "./Authors02";
import CreateItem from "./CreateItem";
import EditProfile from "./EditProfile";
import Ranking from "./Ranking";
import Login from "./Login";
import SignUp from "./SignUp";
import NoResult from "./NoResult";
import FAQ from "./FAQ";
import Contact01 from "./Contact01";
import ConnectWallet from "../components/layouts/ConnectWallet";
const CheckingComponent = () => (
  <div>
    {" "}
    <h1>checkinggfgg</h1>
  </div>
);
const routes = [
  { path: "/", component: <Home01 /> },
  { path: "/explore-04", component: <Explore04 /> },
  { path: "/live-auctions", component: <LiveAuctions /> },
  { path: "/item-details-02/:nftId", component: <ItemDetails02 /> },
  { path: "/activity-01", component: <Activity01 /> },
  { path: "/blog", component: <Blog /> },
  { path: "/blog-details", component: <BlogDetails /> },
  { path: "/help-center", component: <HelpCenter /> },
  { path: "/authors-02/auther", component: <Authors02 /> },
  // {
  //   path: "/authors-02",
  //   component: <CheckingComponent />,
  // },
  { path: "/wallet-connect/:redirect", component: <ConnectWallet /> },
  { path: "/wallet-connect", component: <ConnectWallet /> },
  { path: "/create-item", component: <CreateItem /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/ranking", component: <Ranking /> },
  { path: "/login", component: <Login /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/no-result", component: <NoResult /> },
  { path: "/faq", component: <FAQ /> },
  { path: "/contact-01", component: <Contact01 /> },
];

export default routes;
