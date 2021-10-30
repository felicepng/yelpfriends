import axios from 'axios'

const BACKEND_API_URL = "https://localhost:8080/";

class BackendAPI {

    // Load the intial data
    initialLoad = () => {
        return axios.get(`${BACKEND_API_URL}/load`);
    }

    // ADJACACENCY MATRIX

    // Build Adjacency matrix for current users in the database
    buildAdjMatrix = () => {
        return axios.get(`${BACKEND_API_URL}/buildAdjMatrix`);
    }

    // Get the set of first degree connections with specified user with user_id
    getAdjMatrixFirstDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/adjMatrix/getFirstDegree/${user_id}`);
    }

    // Get the set of second degree connections with specified user with user_id
    getAdjMatrixSecondDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/adjMatrix/getSecondDegree/${user_id}`);
    }

    //ADJACENCY LIST
    // Build Adjacency matrix for current users in the database
    buildAdjList = () => {
        return axios.get(`${BACKEND_API_URL}/buildAdjList`);
    }

    // Get the set of first degree connections with specified user with user_id
    getAdjListFirstDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/adjList/getFirstDegree/${user_id}`);
    }

    // Get the set of second degree connections with specified user with user_id
    getAdjListSecondDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/adjList/getSecondDegree/${user_id}`);
    }

}

export default new BackendAPI();