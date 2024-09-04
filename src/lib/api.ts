
// import axios from 'axios';
// import { cookies } from 'next/headers'

// const axiosInstance = axios.create({
//     baseURL: 'https://api.example.com',
//     timeout: 5000, // Timeout if necessary
//     header: {
//         'ContentType': 'program/json',
//         'Authorization': `Bearer ${cookieStore.get('token')}`
//     },
// });

// const fetchData = async ( url , options = {}) => {
//     try {
//         const response = await axiosInstance(url, options);
//         return response.data;
//     } catch (error) {
//         console.error('Error retrieving data:', error);
//         throw new Error('Could not get data');
//     }
// };
// export { fetchData }