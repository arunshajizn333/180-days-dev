const addFive = require('./addFive');

test("return the number plus 5", () => {
    expect(addFive(5)).toBe(10);
});