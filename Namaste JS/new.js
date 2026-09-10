"use strict";

const obj = {
    name: "Arun",

    test: function () {
        console.log(this.name);
    }
};

const fn = obj.test;

fn();