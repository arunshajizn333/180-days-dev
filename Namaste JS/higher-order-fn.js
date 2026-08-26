let radius = [1, 2, 3, 4, 5];

const area = function (radius) {
    return Math.PI * radius * radius;
}

const circumferance = function (radius) {
    return 2 * Math.PI * radius;
}

const diameter = function (radius) {
    return 2 * radius;
}

const calculate = function (radius, logic) {
    let output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]));
    }
    return output;
}

console.log("area : ",calculate(radius, area))
console.log("circumferance : ",calculate(radius, circumferance))
console.log("diameter : ",calculate(radius, diameter))