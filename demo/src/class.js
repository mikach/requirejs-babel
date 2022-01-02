import sum from './sum';
import { html, render } from 'lit-html';

console.log( sum(1,2) );

class A {
    constructor(a) {
        this.message = 'Hello ' + a;
        console.log(this.message);
    }
}

const a = new A('world!');

render(html`<br><br>
${a.message}, 1 + 2 = ${sum(1,2)}!`, document.body);
