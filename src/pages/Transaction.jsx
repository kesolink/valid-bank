import "./transaction.scss";
import { HiOutlinePlusSm, HiOutlineTrash } from "react-icons/hi";
import Edit from "../../src/assets/image/edit-pen.png";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddTransaction from "./AddTansaction";
import TransferModal from "../component/modal/TransferModal";
import { FaRegCopy } from "react-icons/fa";
// import { removeTransactionFromHistory, updateUser } from "../redux/userReducer";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../component/modal/DeleteModal";

function Transaction() {
  const [add, setAdd] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [selectFilter, setSelectFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const activeUser = useSelector((state) => state.user.activeUser);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (activeUser) {
      setTransactionHistory(activeUser.transactionHisotry);
      setFilteredTransactions(activeUser.transactionHisotry);
    }
  }, [activeUser]);

  useEffect(() => {
    let filtered = transactionHistory.filter(transaction => 
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
    );

    if (selectFilter !== "all") {
      filtered = filtered.filter(transaction => transaction.type.toLowerCase() === selectFilter);
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, selectFilter, transactionHistory]);

  const openPage = () => setAdd(true);
  const closePage = () => setAdd(false);
  const openTransferModal = () => setTransferModal(true);
  const closeTransferModal = () => setTransferModal(false);
  const openDeleteModal = (transactionReference) => {
    setTransactionToDelete(transactionReference);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setTransactionToDelete(null);
  };

  const handleCopy = () => {
    if (activeUser && activeUser.accountNumber) {
      navigator.clipboard.writeText(activeUser.accountNumber)
        .then(() => {
          toast.success('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch((err) => {
          toast.error('Failed to copy!');
          console.error('Failed to copy: ', err);
        });
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSelectFilter = (e) => setSelectFilter(e.target.value);

  return (
    <>
      <div className="transaction-container">
        <div className="tran-header-wrap">
          <div className="tran-header-text-wrap">
            <h4>Transactions</h4>
            <p>View all your transactions in the list of products</p>
          </div>
          <div className="add-tran-btn-wrap" onClick={openPage}>
            <HiOutlinePlusSm color="white" />
          </div>
        </div>

        <div className="tran-figure-wrap">
          <div className="tran-box">
            <h3>Total Balance</h3>
            <span>NGN {activeUser ? activeUser.balance.toLocaleString() : "Loading..."}</span>
            <p>View details</p>
          </div>
          <div className="tran-box">
            <h3>Total Credit</h3>
            <span>NGN {transactionHistory.reduce((total, tran) => tran.type === 'Credit' ? total + tran.amount : total, 0).toLocaleString()}</span>
            <p>View details</p>
          </div>
          <div className="tran-box">
            <h3>Total Debit</h3>
            <span>NGN {transactionHistory.reduce((total, tran) => tran.type === 'Debit' ? total + Math.abs(tran.amount) : total, 0).toLocaleString()}</span>
            <p>View details</p>
          </div>
        </div>

        <div className="tranfer-wrap">
          <button onClick={openTransferModal}>Transfer</button>
          <div className="copy-acct-num-wrap">
            <span>Account Number: {activeUser ? activeUser.accountNumber : "Loading..."}</span>
            <FaRegCopy className="copy" size={15} onClick={handleCopy} style={{ cursor: 'pointer' }} />
          </div>
          <div className="copy-acct-num-wrap-phone">
            <span>Account Number </span>
            <div className="acct-num-down"> <span>{activeUser ? activeUser.accountNumber : "Loading..."}</span><FaRegCopy className="copy" size={15} onClick={handleCopy} style={{ cursor: 'pointer' }} /></div> 
          </div>
          {copySuccess && <span className="copy-success">{copySuccess}</span>}
        </div>

        <div className="sort-wrap">
          <input 
            type="text" 
            placeholder="Search Transaction" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <div className="sort-right">
            <select className="tran-fillter" value={selectFilter} onChange={handleSelectFilter}>
              <option value="all">All Transaction</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <div className="date-fillter">
              <MdOutlineKeyboardArrowLeft />
              <h4>1-10 of {filteredTransactions.length}</h4>
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
        </div>

        <div className="transaction-history-wrap">
          <div className="histroy-wrap">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th className="reference">Reference</th>
                    <th>Amount</th>
                    <th className="date">Transaction Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction, index) => (
                      <tr className="table-tr" key={index}>
                        <td className="reference">{transaction.reference}</td>
                        <td>{transaction.amount > 0 ? `+NGN ${transaction.amount}` : `-NGN ${Math.abs(transaction.amount)}`}</td>
                        <td className="date">{transaction.date}</td>
                        <td>{transaction.type}</td>
                        <td><span className={transaction.status === "Success" ? "success-text" : transaction.status === "Failed" ? "fail-text" : "pending-text"}>{transaction.status}</span></td>
                        <td className="action-icon">
                          <img src={Edit} alt="Edit" className="edit" />
                          <HiOutlineTrash 
                            className="trash" 
                            size={20} 
                            color="red" 
                            onClick={() => openDeleteModal(transaction.reference)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <AddTransaction isOpen={add} closePage={closePage} />
      <TransferModal isOpen={transferModal} closeTransferModal={closeTransferModal} />
      <DeleteModal 
        isOpen={deleteModal}  
        closeDeleteModal={closeDeleteModal} 
        transactionReference={transactionToDelete} 
      />
    </>
  );
}

export default Transaction;
