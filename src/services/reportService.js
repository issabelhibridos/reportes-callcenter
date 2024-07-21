export async function reportAuth() {

    const requestOptions = {
        method: "GET",
        headers: { "content-Type": "application/json", Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE0MzkyOTIsImV4cCI6MTcyMTQ0Mjg5MiwiZGF0YSI6eyJuYW1lIjoiYWRtaW4ifX0.l-OKpvB_spwQJn_Dr6T4gnWvL2aMthFq-vWRQ8OSfYM` },
        // method: "POST",
        // headers: { "content-Type": "application/json" },
        // body: { user: "admin", password: "N0m3l4s3" },
    }

    const response = await fetch(`${process.env.REACT_APP_ISSABEL_HOST}admints`, requestOptions);

    if (!response.ok) {
        const errorMessage = { message: response.statusText, status: response.status };
        sessionStorage.clear();
        throw errorMessage;
    }
    const data = await response.json();
    console.log(data)

    return data;
}
