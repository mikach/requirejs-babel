import sum from 'es6!src/sum';

console.log( sum(1,2) );

class A {
    constructor(a) {
        console.log('Hello ' + a);
    }
}

new A('world!');