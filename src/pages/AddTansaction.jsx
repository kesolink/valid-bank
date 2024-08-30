import { IoClose } from "react-icons/io5";
import "./addtransaction.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionToHistory, updateUser } from "../redux/userReducer"; // Import the action
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTransaction({ isOpen, closePage }) {
  const [formData, setFormData] = useState({
    amount: '',
    transactionDirection: 'Debit',
    transactionStatus: 'Success'
  });

  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.activeUser);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleAddNewTransaction = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const { amount, transactionDirection, transactionStatus } = formData;
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 100) {
      toast.error("Amount must be a number greater than 100.");
      return;
    }

    // Calculate the new balance
    const updatedBalance = transactionDirection === "Debit"
      ? activeUser.balance - numericAmount
      : activeUser.balance + numericAmount;

    // Create the new transaction object
    const newTransaction = {
      reference: Math.random().toString(36).substr(2, 9),
      amount: transactionDirection === "Debit" ? -numericAmount : numericAmount,
      date: new Date().toLocaleString(),
      status: transactionStatus,
      type: transactionDirection
    };

    try {
      // Find the user in the JSON server by ID
      const userResponse = await axios.get(`https://validbank-data.onrender.com/users/${activeUser.id}`);
      const user = userResponse.data;

      // Add the new transaction to the user's transaction history
      const updatedTransactionHistory = [...user.transactionHisotry, newTransaction];

      // Update the user's data on the server
      const updatedUser = {
        ...user,
        balance: updatedBalance,
        transactionHisotry: updatedTransactionHistory
      };

      await axios.put(`https://validbank-data.onrender.com/users/${activeUser.id}`, updatedUser);

      // Dispatch the action to add the transaction to the Redux store and update the balance
      dispatch(addTransactionToHistory({
        id: activeUser.id,
        transaction: newTransaction
      }));

      dispatch(updateUser(updatedUser));

      // Clear the form and close the modal
      setFormData({
        amount: '',
        transactionDirection: 'Debit',
        transactionStatus: 'Success'
      });
      toast.success("Transaction added successfully.");
      closePage();
    } catch (error) {
      console.error("Error saving transaction to server:", error);
      toast.error("Failed to save the transaction. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`add-tran-layer ${isOpen ? "open" : ""}`}>
      <form className="add-tran-wrap" onSubmit={handleAddNewTransaction}>
        <div className="">
          <div className="close-btn" onClick={closePage}>
            <IoClose />
          </div>
          <h2>Add New Transaction</h2>
          <p>Add a new transaction to the table</p>
          
          <div className="select-wrap">
            <label>Transaction Direction*</label>
            <select value={formData.transactionDirection} onChange={handleChange} name="transactionDirection">
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          
          <div className="select-wrap">
            <label>Status*</label>
            <select value={formData.transactionStatus} onChange={handleChange} name="transactionStatus" >
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="add-amount-wrap">
            <label>Amount*</label>
            <input 
              type="text" 
              name="amount"
              placeholder="Enter an amount" 
              value={formData.amount} 
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="add-tran-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
