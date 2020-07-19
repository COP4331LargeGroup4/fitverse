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

    updateWorkout = async (id, object) => {
        var body = {
            token: localStorage.getItem('jwt'),
            id: id,
            name: object.name,
            weekly: object.weekly,
            startDate: object.startDate,
            endDate: object.endDate,
            notes: object.notes,
            overwriteExercises: object.overwriteExercises
        };
        body = JSON.parse(JSON.stringify(body));
        var response = await axios.post("/api/workout/update", body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    addWorkout = async (object) => {
        var body = {
            token: localStorage.getItem('jwt'),
            name: object.name,
            weekly: object.weekly,
            startDate: object.startDate,
            endDate: object.endDate,
            notes: object.notes,
            exercises: object.exercises
        };
        body = JSON.parse(JSON.stringify(body));
        var response = await axios.post("/api/workout/create", body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    deleteWorkout = async (id) => {
        var response = await axios.post("/api/workout/delete", {
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

    getAllWorkoutsInRange = async (object) => {
        var response = await axios.post("/api/workout/readAllDateRange", {
            token: localStorage.getItem('jwt'),
            startDate: object.startDate,
            endDate: object.endDate
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    getDoneExercises = async (object) => {
        var response = await axios.post("/api/workout/getDoneExercises", {
            token: localStorage.getItem('jwt'),
            workout: object.workout,
            date: object.date
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

    markAsDone = async (object) => {
        var response = await axios.post("/api/workout/markExercisesDone", {
            token: localStorage.getItem('jwt'),
            workout: object.workout,
            date: object.date,
            addDoneExercises: object.addDoneExercises, // ??
            removeDoneExercises: object.removeDoneExercises,
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'cors'
        })

        return response.data;
    }

}