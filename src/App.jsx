import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Transcation from "./pages/Transaction";
import SideNav from "./component/nav/SideNav";
import Navbar from "./component/nav/Navbar";
import './App.scss';
import ProtectedRoute from "./Protected-routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import Transaction from "./pages/Transaction";
import User from "./pages/User";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Report from "./pages/Report";
import Saving from "./pages/Saving";
import TransferModal from "./component/modal/TransferModal";
import Card from "./pages/Card";
import Bankservice from "./pages/Bankservice";


function App() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  return (
    <div className="app">
      {isAuthenticated && <div className="nav"><Navbar /></div>}
      <div className="continer">
        {isAuthenticated && <div className="side-left-nav">
          <SideNav />
        </div>}
        {/* <div style={{ width: isAuthenticated ? '75%' : '100%' }}> */}
        <div className={`${isAuthenticated ? "auth" : "main"}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
             <Route path="/dash" element={<Transaction />} />
             <Route path="/user" element={<User />} />
             <Route path="/billing" element={<Billing />} />
             <Route path="/saving" element={<Saving />} />
             <Route path="/settings" element={<Settings />} />
             <Route path="/report" element={<Report />} />
             <Route path="/card" element={<Card />} />
             <Route path="/bank" element={<Bankservice />} />
             <Route path="/transfer" element={<TransferModal />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
// const updatedTransactionHistory = [...user.transactionHistry, newTransaction];