import axios from 'axios';

// const BASE_URL = "http://localhost:3001/persons"
const BASE_URL = "/api/persons"

const create=(newObject)=>{
    const request=axios.post(BASE_URL,newObject)
    return request.then(response=>response.data)
}

const getAll=()=>{
    const request=axios.get(BASE_URL)
    return request.then(response=>response.data)
}

const deletePerson=(id)=>{
    const request=axios.delete(`${BASE_URL}/${id}`)
    return request.then(response=>response.data)
}

const updatePerson=(id,newPerson)=>{
    const request=axios.put(`${BASE_URL}/${id}`,newPerson)
    return request.then(response=>response.data)
}

export {create,getAll,deletePerson,updatePerson}