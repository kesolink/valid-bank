import { useSelector, useDispatch } from "react-redux";
import "./Transfermodal.scss";
import { useState } from "react";
import { updateUserBalance, addTransactionToHistory } from '../../redux/userReducer';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransferModal({ isOpen, closeTransferModal }) {
  const activeUser = useSelector((state) => state.user.activeUser);
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    amount: '',
    accountNumber: '',
  });

  const [recipientName, setRecipientName] = useState({
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "accountNumber" && value.length > 8) return;
    if (value === 0){
      setError("")
    }

    setFormData({ ...formData, [name]: value });

    if (name === "accountNumber" && value.length === 8) {
      fetchUserDetails(value);
    }
  };

  const fetchUserDetails = (accountNumber) => {
    fetch('https://validbank-data.onrender.com/users')
      .then((response) => response.json())
      .then((data) => {
        const user = Array.isArray(data) && data.find(user => user.accountNumber === accountNumber);

        if (user) {
          setRecipientName({ firstName: user.firstName, lastName: user.lastName });
        } else {
          setRecipientName({ firstName: '', lastName: '' });
          setError('Invalid Account number');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to fetch user details. Please try again later.');
      });
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const transferAmount = parseFloat(formData.amount);

    if (transferAmount > activeUser.balance) {
      alert("Insufficient funds");
      return;
    }

    fetch('https://validbank-data.onrender.com/users')
      .then((response) => response.json())
      .then((data) => {
        const recipient = data.find(user => user.accountNumber === formData.accountNumber);

        if (recipient) {
          const updatedSenderBalance = activeUser.balance - transferAmount;
          const updatedRecipientBalance = recipient.balance + transferAmount;

          // Dispatch balance update for sender
          dispatch(updateUserBalance({ id: activeUser.id, balance: updatedSenderBalance }));

          // Create transaction objects for sender and recipient
          const senderTransaction = {
            reference: Math.random().toString(36).substr(2, 9),
            amount: -transferAmount,
            date: new Date().toLocaleString(),
            status: "Success",
            type: "Debit",
            recipient: `${recipient.firstName} ${recipient.lastName}`
          };

          const recipientTransaction = {
            reference: Math.random().toString(36).substr(2, 9),
            amount: transferAmount,
            date: new Date().toLocaleString(),
            status: "Success",
            type: "Credit",
            sender: `${activeUser.firstName} ${activeUser.lastName}`
          };

          // Update sender's transaction history on the server and Redux
          fetch(`https://validbank-data.onrender.com/users/${activeUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              balance: updatedSenderBalance,
              transactionHisotry: [...activeUser.transactionHisotry, senderTransaction]
            })
          }).then(() => {
            dispatch(addTransactionToHistory({ id: activeUser.id, transaction: senderTransaction }));
          }).catch(error => {
            console.error('Error updating sender transaction:', error);
          });

          // Update recipient's balance and transaction history on the server and Redux
          fetch(`https://validbank-data.onrender.com/users/${recipient.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              balance: updatedRecipientBalance,
              transactionHisotry: [...recipient.transactionHisotry, recipientTransaction]
            })
          }).then(() => {
            dispatch(addTransactionToHistory({ id: recipient.id, transaction: recipientTransaction }));
            toast.success('Transfer successful!');
            setFormData({
              amount: '',
              accountNumber: ''
            });
            closeTransferModal();
          }).catch(error => {
            console.error('Error updating recipient transaction:', error);
          });
        } else {
          alert('Recipient not found.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Transfer failed. Please try again later.');
      });
  };

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={closeTransferModal}></div>
      <div className="modal slide-up">
        <span className="close-btn" onClick={closeTransferModal}>X</span>
        <h2>Transfer</h2>
        <p>Send to bank account</p>
        <form className='transfer-form-wrap' onSubmit={handleTransfer}>
          <div className="transfer-input-wrap">
            <label>Account Number*</label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              type="number"
              placeholder="Enter account number"
              maxLength={8}
              required
            />
            {error && (<span>{error}</span>)}
            {recipientName.firstName && recipientName.lastName && (
              <h4 className="accountNumber">
                {recipientName.firstName} {recipientName.lastName}
              </h4>
            )}
          </div>
          <div className="transfer-input-wrap">
            <label>Amount*</label>
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
              placeholder="Enter amount"
              required
            />
            <div className="balance-wrap">
              <h3>Available Balance:</h3>
              <span>{activeUser.balance}</span>
            </div>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default TransferModal;
