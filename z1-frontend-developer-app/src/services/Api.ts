import axios from 'axios'

interface IPost {
    body?: string,
    data?: object,
    summary?: object,
    outcome?: string,
  }


const http = axios.create({
    baseURL: 'https://front-exercise.z1.digital',
    
})

export const checkPhoto = (image : string ) => http.post<IPost[]>('/evaluations', { body : image })