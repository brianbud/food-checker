function getFetch(userInput) {
    const choice = userInput
    const url = `https://world.openfoodfacts.org/api/v0/product/${choice}.json`

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('error ${err}'));
}