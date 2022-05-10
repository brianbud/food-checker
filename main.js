document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    let inputVal = document.getElementById('barcode').value

    if (inputVal.length !== 12) {
        alert(`Barcode needs to be 12 characters`)
        return;
    }
    const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 1) {

            } else if (data.status === 0) {
                alert(`Product ${inputVal} not found.
                Please try another.`)
            }
        })
        .catch(err => console.log(`error ${err}`));
}