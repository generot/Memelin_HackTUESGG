var globalMap = CreateDynamicMap();

async function ServerInteraction() {
    let resp = await RecvData();

    if(!resp.length) {
        globalCount = 0;
        return;
    }

    for(let i = 1; i < resp.length; i++) {
        let data = JSON.parse(resp[i].data);
        DrawExistingMarker(globalMap, new Coord(data.latitude, data.longtitude), data.type);
    }

    console.log(resp);
    globalCount = resp[0].data;
}

async function uselessFunction() {
    await ServerInteraction();
    console.log(globalCount);

    getLocation((lng, ltd, mp) => RenderMapDynamic(mp, lng, ltd), 0, globalMap);
}

uselessFunction();
