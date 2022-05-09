document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    let inputVal = document.getElementById('barcode').value
    const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(`error ${err}`));
}