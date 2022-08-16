// Check the types and content of data.
// If player key and secret are included, verify it's a real player
async function Check(dirtyData, requiredFields) {
    const cleanData = {clean: false};

    const allowedInputs = [
        {name: "playerName",    type: "string"},
        {name: "playerKey",     type: "number"},
        {name: "playerSecret",  type: "string"},
        {name: "gameCode",      type: "string"},
        {name: "questionIndex", type: "number"}
    ]

    for (const index in allowedInputs) {
        const inputName = allowedInputs[index].name;
        const inputType = allowedInputs[index].type;
        const data = dirtyData[inputName]

        // Null and undefined are fine, e.g.:
        // Register a guess => playerName is undefined
        // Undoing a guess => questionIndex is null
        if(data === undefined) { continue; }

        if(data === null) {
            cleanData[inputName] = null;
            continue;
        }

        // Return an error if there is data, but it's the wrong type
        if(typeof data !== inputType) {
            cleanData.error = `Malformed input ${inputName}, was type ${typeof data}`;
            return cleanData;
        }

        // Strip non alpha-numeric characters from strings, and max length of 20
        if(inputType === "string") {
            cleanData[inputName] = data.replace(/[^0-9a-z_ ]/gi, '').substr(0, 20);
        }

        // All keys are ints, for parse to int
        else if(inputType === "number") {
            cleanData[inputName] = parseInt(data);
        }
    }

    // If a field is required, but not found, return an error
    for (const field in requiredFields) {
        const fieldName = requiredFields[field];
        if(cleanData[fieldName] === undefined || cleanData[fieldName] === null) {
            cleanData.error = `Missing ${fieldName} data."`
            return cleanData;
        }
    }

    // If data contains a player key and player secret, validate it
    if(cleanData.playerKey && cleanData.playerSecret) {
        const verification = await VerifyPlayer({playerKey: cleanData.playerKey, playerSecret: cleanData.playerSecret, roomCode: cleanData.roomCode});
        if(verification.verified === false) {
            cleanData.error = "SanitizeData found player data that didn't validate. " + verification.error;
            return cleanData;
        }    
    }

    cleanData.clean = true;
    return cleanData;
}

async function VerifyPlayer(playerData) {
    const results = {verified: false};

    // Need a key and secret to verify
    if(playerData.playerKey === undefined || playerData.playerKey === null || playerData.playerSecret === undefined || playerData.playerSecret === null) {
        results.error = "Both player key and player secret required."
        return results;
    }

    // If the key or secret are not the right type of data, fail the test
    if(typeof playerData.playerKey !== "number" || typeof playerData.playerSecret !== "string") {
        results.error = "Player key or player secret malformed in player verification.";
        return results;
    }

    // This data exists and is the right type
    const playerKey = parseInt(playerData.playerKey);
    const playerSecret = playerData.playerSecret.replace(/[^0-9a-z]/gi, '').substr(0, 20);


    let query;
    // If a room code wasn't sent, just verifying the player key/secret pair is enough
    if(playerData.roomCode === undefined || playerData.roomCode === null) {
        query = `SELECT count(*) FROM player WHERE player_key = ${playerKey} AND secret = '${playerSecret}';`;
    }

    // If a room code was sent, make sure it's the right type, clean it, then add it into the query
    else {
        if(typeof playerData.roomCode !== "string") {
            results.error = "Room code malformed in player verification.";
            return results;
        }
        const roomCode = playerData.roomCode.replace(/[^0-9a-z]/gi, '').substr(0, 20);
        query = `SELECT count(*) FROM player WHERE player_key = ${playerKey} AND secret = '${playerSecret}' AND room_code = '${roomCode}';`;
    }
    
    // Run the query to find the player (or not)
    const playerEntry = await pool.query(query);
    if (!playerEntry || playerEntry[0].length === 0) {
        results.error = "Player not verified to exist."
        return results;
    }

    results.verified = true;
    return results;
}

module.exports = { Check }