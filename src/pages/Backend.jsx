// import axios from 'axios'
// import  { useEffect } from 'react'

// function Backend() {
//     const url_key = "RVSEC-8bb756a159b787007fa50b556b45d11d0b49c0c0c0a7b47b3364fa7d094009d2b404a106a71103b9aecb33f73b82f5be - 1662632092469"
 
//     const getBackEnd = async () => {
//         try {
//             const response = await axios.get('https://your-api-endpoint.com/api/data', {
//                 headers: {
//                     'Authorization': `Bearer ${url_key}`
//                 }
//             });
//             const data = response.data;
//             console.log(data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect(()=>{
//         getBackEnd()
//     },[])


//     return (
//         <div>Backend</div>
//     )
// }

// export default Backend