const axios = require('axios');

const path = (str) => `http://localhost:5000${str}`;

export const registerUser = async(user) => {
    const { data } = await axios.post(path('/api/users/signup'), user, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    return data;
};

export const loginUser = async(user) => {
    const { data } = await axios.post(path('/api/users/login'), user, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    return data;
};

export const isLoggedIn = (cookies) => {
    if (cookies.user === undefined || typeof cookies.user === 'string') {
        return false;
    }
    return true;
};

//matches

export const getMatches = async() => {
    const { data } = await axios.get(path('/api/matches'), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    return data;
};

export const getMyTickets = async(userid) => {
    const { data } = await axios.get(path(`/api/tickets/${userid}`), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    return data;
};

export const buyTicket = async(userid, matchid) => {
    const { data } = await axios.post(
        path(`/api/tickets/buy/${userid}/${matchid}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    );

    return data;
};