import  { useEffect, useState } from 'react'
import "./user.scss"
import axios from 'axios'


function User() {
    const [userDetails, setUserDetails] = useState([])
    const getUseData =  async ()=>{
        const response = await axios.get('http://localhost:5000/users')
        const user = response.data
        console.log(user )
        const newData = user.map(({firstName, lastName, accountNumber})=>({firstName, lastName, accountNumber}))
        setUserDetails(newData)
    }

    
    console.log(userDetails )

    useEffect(()=>{
        getUseData()
    },[])

  return (
    <div>
        <h2>All User Details</h2>
        <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th></th>FirstName
                    <th>lastName</th>
                    <th >accountNumber</th>                   
                  </tr>
                </thead>
                <tbody >
                  {userDetails.length > 0 ? (
                    userDetails.map((data, index) => (
                      <tr key={index}>
                        <td >{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.accountNumber}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No Account found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default User