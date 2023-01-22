const placeNamePlaceIdMap = {
    ["Buchanan"]: "ChIJy0m_M7FyhlQRSzi-VB2LgzQ",
}


const getPlaceIdByName = (name) => {

    
    return placeNamePlaceIdMap[name]
}

console.log(getPlaceIdByName("Buchanan"))