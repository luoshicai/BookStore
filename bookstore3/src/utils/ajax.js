let postRequest = (url, json, callback) => {
    let opts = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    };

    fetch(url, opts)
        .then(response => {
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.log(json);
            console.log(error);
        });
};

let GatewayPost = (url, json, callback) => {
    let opts = {
        method: 'POST',
        credentials: 'omit',
    };

    fetch(url, opts)
        .then(response => {
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.log(json);
            console.log(error);
        });
};
export {postRequest,GatewayPost};
