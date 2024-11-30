export async function getLikeSearch(start, finish) {

    const response = await fetch(`${process.env.REACT_APP_ISSABEL_HOST}range/${start}/${finish}`);
    if (!response.ok) {
        const errorMessage = { message: response.statusText, status: response.status };
        throw errorMessage;
    }
    const data = await response.json();
    return data;
}