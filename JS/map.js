var globalMap = CreateDynamicMap();

getLocation((lng, ltd, mp) => RenderMapDynamic(mp, lng, ltd), 0, globalMap);
DrawMarker(globalMap);
