export const getThenLog = (url, callback, access_token) => {
    const init = {
        method: "GET",
    };
    if (access_token) {
        init.headers = { Authorization: `Bearer ${access_token}` };
    }

    fetch(url, init)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (!callback) {
                return;
            }
            callback(data);
        })
        .catch((error) => console.error("Error:", error));
};

export const postThenLog = (url, body, callback) => {
    const init = {
        method: "POST", // Specify the method as POST
        headers: {
            "Content-Type": "application/json", // Inform the server about the data format
        },
        body: JSON.stringify(body), // Convert the JavaScript object to a JSON string
    };

    fetch(url, init)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (!callback) {
                return;
            }
            callback(data);
        })
        .catch((error) => console.error("Error:", error));
};
