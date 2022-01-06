import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

//kaikki blogit
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

//uusi blog
const postNew = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

//lisää tykkäys
const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

//poista blogi
const removeBlog = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blog}`, config)

  return response.data
}

export default { getAll, postNew, setToken, addLike, removeBlog }