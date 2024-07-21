export async function reportAuth() {

    const requestOptions = {
        method: "GET",
        headers: { "content-Type": "application/json", Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE1MzYzNjMsImV4cCI6MTcyMTUzOTk2MywiZGF0YSI6eyJuYW1lIjoiYWRtaW4ifX0.I5jOjWgUsyFRwDXvmZBkgR7JkUCmQVFNKJ8rlF3FJD8` },
        // method: "POST",
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
