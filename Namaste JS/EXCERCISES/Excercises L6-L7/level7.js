"use strict";

function test() {
    console.log(this);
}

test();

const obj = {
    name: "Arun",

    test: function () {
        console.log(this.name);
    }
};

obj.test();

const fn = obj.test;

fn()


