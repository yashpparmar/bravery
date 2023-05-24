console.log('process.env.NODE_ENV', process.env.NODE_ENV)
export const REACT_API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://bravery.onrender.com/api'
