async function delay (value) {
    return await new Promise(resolve => setTimeout(() => resolve(value), 1));
}

delay(1).then(result => console.log(result));
