import sum from './sub/sum';
import {html, render} from 'lit-html/lit-html';

class A {
    constructor(a) {
        console.log('Hello ' + a);
    }
}

new A('world!');

var h = "Hello", w = "world";
render(html`${h} ${w}, 1 + 2 = ${sum(1,2)}!`, document.body);
