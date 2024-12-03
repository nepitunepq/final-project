import { BACKEND_URL } from './config.js';

export async function getScore() {
    const scores = await fetch(`${BACKEND_URL}/tas`).then((r) => r.json());
    return scores;
};

export async function updateScore(taName, score) {
    //console.log(taName, score);

    const payload = {
        name: taName,
        score: score,
    };
    //console.log(payload);
    
    await fetch(`${BACKEND_URL}/tas`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then(response => response.json());
}

export async function getStat(){
    const stats = await fetch(`${BACKEND_URL}/stats`).then((r) => r.json());
    return stats;
}

export async function updateStat(taName, value) {
    //console.log(taName, score);

    const payload = {
        name: taName,
        value: value,
    };
    console.log(payload);
    
    await fetch(`${BACKEND_URL}/stats`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then(response => response.json());
}
