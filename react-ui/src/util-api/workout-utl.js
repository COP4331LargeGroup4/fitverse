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
}