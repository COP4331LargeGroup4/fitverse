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

    createExercise = async (object) => {
        var response = await axios.post("/api/exercise/create", {
            token: localStorage.getItem('jwt'),
            name: object.name,
            notes: object.notes
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    updateExercise = async (id, object) => {
        var response = await axios.post("/api/exercise/update", {
            token: localStorage.getItem('jwt'),
            id: id,
            name: object.name,
            notes: object.notes
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    deleteExercise = async (id) => {
        var response = await axios.post("/api/exercise/delete", {
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