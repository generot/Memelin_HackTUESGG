function SendData(data) {
    const rsp = fetch("/post-navigate", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return rsp;
}

function Submit(markers) {
    for(let marker of markers)
        SendData(marker);
}