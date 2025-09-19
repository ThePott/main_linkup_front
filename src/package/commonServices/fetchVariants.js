export const getThenLog = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error("Error:", error));
};

export const postThenLog = (url, body) => {
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
        })
        .catch((error) => console.error("Error:", error));
};
