import { TIMEOUT_SEC } from "../config";
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const getJSON = async function (url) {
    try {

        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        // 1 Loading recipe
        // const res = await fetch('https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e85be');
        const data = await res.json();

        if (!res.ok)
            throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}