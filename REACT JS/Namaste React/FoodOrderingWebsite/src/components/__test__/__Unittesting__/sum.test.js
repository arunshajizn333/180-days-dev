import { sum } from "../../Learn/sum"

test("Sum of two nums",()=>{
    const result= sum(5,1)

    expect(result).toBe(6);
})