export async function reportAuth() {

    const requestOptions = {
        method: "GET",
        headers: { "content-Type": "application/json", Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjQxNzAzODEsImV4cCI6MTcyNDE3Mzk4MSwiZGF0YSI6eyJuYW1lIjoiYWRtaW4ifX0.s6ZkT6rU333Q70zLYeEvocbT1Qc_YQTindzETgJEBms` },
        // method: "POST",
        // body: { user: "admin", password: "N0m3l4s3" },
    }

    const response = await fetch(`${process.env.REACT_APP_ISSABEL_HOST}trunks`, requestOptions);

    if (!response.ok) {
        const errorMessage = { message: response.statusText, status: response.status };
        sessionStorage.clear();
        throw errorMessage;
    }
    const data = await response.json();
    console.log(data)

    return data;
}
