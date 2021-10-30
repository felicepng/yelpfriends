import axios from 'axios'

const BACKEND_API_URL = "http://localhost:8080";

class BackendAPI {

    // Load the intial data
    initialLoad = async () => {
        const res = await axios.get(`${BACKEND_API_URL}/load`, {
            onDownloadProgress: progressEvent_1 => {
                const total = parseFloat(progressEvent_1.currentTarget.responseHeaders['Content-Length']);
                const current = progressEvent_1.currentTarget.response.length;

                let percentCompleted = Math.floor(current / total * 100);
                console.log('completed: ', percentCompleted);
            }
        });
        console.log("Success");
        return res.data;
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

    // ADJACENCY LIST

    // Build Adjacency matrix for current users in the database
    buildAdjList = () => {
        return axios.get(`${BACKEND_API_URL}/buildAdjList`);
    }

    // Get the set of first degree connections with specified user with user_id
    getAdjListFirstDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/adjList/getFirstDegree/${user_id}`);
    }

    // Get the map of second degree connections with specified user with user_id
    getAdjListSecondDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/adjList/getSecondDegree/${user_id}`);
    }

    // TREE

    // Build Tree for user
    buildTree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/buildTree/${user_id}`);
    }

    // Get the set of first degree connections with specified user with user_id
    getTreeFirstDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/tree/getFirstDegree/${user_id}`);
    }

    // Get the set of second degree connections with specified user with user_id
    getTreeSecondDegree = (user_id) => {
        return axios.get(`${BACKEND_API_URL}/tree/getSecondDegree/${user_id}`);
    }

}

export default new BackendAPI();