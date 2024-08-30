import axios from 'axios';
import "./deletemodal.scss"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { removeTransactionFromHistory, updateUser } from '../../redux/userReducer';


function DeleteModal({ isOpen, closeDeleteModal, transactionReference }) {
    const activeUser = useSelector((state) => state.user.activeUser);
    const dispatch = useDispatch();

    const handleDeleteTransaction = async () => {
        if (transactionReference && activeUser) {
            // Update the local state and Redux store
            const updatedTransactions = activeUser.transactionHisotry.filter(transaction => transaction.reference !== transactionReference);
            toast.success("Transaction deleted successfully.");
        
            const updatedUser = {
                ...activeUser,
                transactionHisotry: updatedTransactions
            };
    
            // Dispatch the action to update the Redux store
            dispatch(removeTransactionFromHistory({ reference: transactionReference }));

            try {
                // Update the user on the local JSON server
                await axios.put(`https://validbank-data.onrender.com/users/${activeUser.id}`, updatedUser);
                // Optionally, dispatch an action to update the user data in the store
                dispatch(updateUser(updatedUser));
                closeDeleteModal();
            } catch (error) {
                console.error('Failed to update the user on the server:', error);
            }
        }
    };

    return (
        <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={closeDeleteModal}></div>
            <div className="modal slide-up">
                <span className="close-btn" onClick={closeDeleteModal}>X</span>
                <div className="delete-wrap">
                <h2>Delete Transaction</h2>
                <p className='action-text'>Are you sure you want to delete this transaction?</p>
                <p>This action cannot be undone.</p>
                <div className="delete-btn-wrap">
                 <button className='btn-delete' onClick={handleDeleteTransaction}>Yes, Delete</button>
                 <button className='btn-mistake' onClick={closeDeleteModal}>No, this was a mistake</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
