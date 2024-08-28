import  { useEffect, useState } from 'react'
import "./user.scss"
import axios from 'axios'
import { FaRegCopy } from 'react-icons/fa6'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function User() {
    const [userDetails, setUserDetails] = useState([])

    const getUseData =  async ()=>{
        const response = await axios.get('http://localhost:5000/users')
        const user = response.data
        console.log(user )
        const newData = user.map(({firstName, lastName, accountNumber})=>({firstName, lastName, accountNumber}))
        setUserDetails(newData)
    }
    const handleCopy = (data) => {
      if (data ) {
        navigator.clipboard.writeText(data)
          .then(() => {
            toast.success('Copied!');
            setTimeout(() =>  500);
          })
          .catch((err) => {
            toast.error('Failed to copy!');
            console.error('Failed to copy: ', err);
          });
      }
    };

    
    console.log(userDetails )

    useEffect(()=>{
        getUseData()
    },[])

  return (
    // <div>
    //     <h2>All User Details</h2>
    //     <div className="table-wrap">
    //           <table>
    //             <thead>
    //               <tr>
    //                 <th></th>FirstName
    //                 <th>lastName</th>
    //                 <th >accountNumber</th>                   
    //               </tr>
    //             </thead>
    //             <tbody >
    //               {userDetails.length > 0 ? (
    //                 userDetails.map((data, index) => (
    //                   <tr key={index}>
    //                     <td >{data.firstName}</td>
    //                     <td>{data.lastName}</td>
    //                     <td>{data.accountNumber}</td>
    //                   </tr>
    //                 ))
    //               ) : (
    //                 <tr>
    //                   <td colSpan="3">No Account found</td>
    //                 </tr>
    //               )}
    //             </tbody>
    //           </table>
    //         </div>
    // </div>
    <div className='user-container'>
  <h2>All User Details</h2>
  <div className="user-details-wrap">
    <div className="user-details-header">
      <div>FirstName</div>
      <div>LastName</div>
      <div>Account Number</div>
    </div>
    <div className="user-details-body">
      {userDetails.length > 0 ? (
        userDetails.map((data, index) => (
          <div className="user-details-row" key={index}>
            <div>{data.firstName}</div>
            <div>{data.lastName}</div>
            <div className="acc-num-copy-wrap">
            <div>{data.accountNumber}</div> <FaRegCopy size={15} onClick={() => handleCopy(data.accountNumber)} ></FaRegCopy>
            </div>
          </div>
        ))
      ) : (
        <div className="no-account">No Account found</div>
      )}
    </div>
  </div>
</div>


  )
}

export default User