import axios from 'axios';

export default class WorkoutUtil {
    getAllWorkouts = async () => {
        var response = await axios.post("/api/workout/readAll", {
            token: localStorage.getItem('jwt'),
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    getWorkoutById = async (id) => {
        var response = await axios.post("/api/workout/read", {
            token: localStorage.getItem('jwt'),
            id: id
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    getAllExercises = async () => {
        var response = await axios.post("/api/exercise/readAll", {
            token: localStorage.getItem('jwt'),
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    getExerciseById = async (id) => {
        var response = await axios.post("/api/exercise/read", {
            token: localStorage.getItem('jwt'),
            id: id
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }
}