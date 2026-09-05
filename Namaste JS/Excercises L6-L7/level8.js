const obj = {
    name: "Arun",

    test: function () {
        const arrow = () => {
            console.log(this.name);
        };

        arrow();
    }
};
obj.test();

const obj2 = {
    name: "Arun",

    test: () => {
        console.log(this.name);
    }
};

obj2.test();

 const test= () => {
        console.log(this);
    }
test()