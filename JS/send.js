async function SendData(data) {
    const rsp = await fetch("/post-navigate", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return rsp;
}

async function RecvData() {
    const rsp = await fetch("/get-markers", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await rsp.json();
}

function Submit(markers) {
    for(let marker of markers)
        SendData(marker);
}