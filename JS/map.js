var globalMap = CreateDynamicMap();

RecvData().then(resp => {
    for(let i = 1; i < resp.length; i++) {
        let data = JSON.parse(resp[i].data);
        DrawExistingMarker(globalMap, new Coord(data.latitude, data.longtitude));
    }
});

getLocation((lng, ltd, mp) => RenderMapDynamic(mp, lng, ltd), 0, globalMap);
