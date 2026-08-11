const users = [
    { id: 101, name: " Ada ", scores: [10, 20, 30] },

    { id: 102, name: "", scores: [5, 0, 15] },

    { id: 103, name: null, scores: [7, 14] },

    { id: 104, /* name missing on purpose */ scores: [3, 3, 3, 3] },

    { id: 105, name: "Grace", scores: [] },
];

const normalizeName = value => {
    if (value === null || value === undefined || value === "") {
        return "unknown";
    }
    return value.trim();
};

const averageScore = scores => {
    if (!Array.isArray(scores)) {
        throw new Error("Scores Must be an Array");
    } else if (scores.length === 0) {
        return 0;
    } else {
        let total = scores.reduce((sum, score) => sum + score, 0);
        let avg = total / scores.length;

        let result = Math.round(avg * 100) / 100;
        return result;
    }
};

const buildUserSummary = user => {
    if (typeof user !== "object" || user === null) {
        throw new Error("user must be an object");
    }
    let userName = normalizeName(user.name);
    let userScores = user.scores;

    let scoreCount = 0;
    let avg = null;

    if (Array.isArray(userScores)) {
        scoreCount = userScores.length;
        avg = averageScore(userScores);
    }
    return {
        id: user.id,
        name: userName,
        scoreCount: scoreCount,
        avg: avg,
    };
};

const summarizeUsers = userArray => {
    if (!Array.isArray(userArray)) {
        throw new Error("userArray must be an array");
    }
    return userArray.map(buildUserSummary);
};

const safeSummarizeusers = userArray => {
    try {
        let data = summarizeUsers(userArray);
        return {
            ok: true,
            data: data,
        };
    } catch (err) {
        return {
            ok: false,
            error: err.message,
        };
    }
};

const getUserDisplayNameById = (userArray, id) => {
    if (!Array.isArray(userArray)) {
        throw new Error("userArray must be an array");
    }
    if (typeof id != "number") {
        throw new Error("id must be a number");
    }

    let userFound = userArray.find(user => user.id === id);

    if (!userFound) {
        throw new Error("user not found");
    }
    return normalizeName(userFound.name);
};
