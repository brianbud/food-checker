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
                const item = new ProductInfo(data.product)
                item.showInfo()
                item.listIngredients()
            } else if (data.status === 0) {
                alert(`Product ${inputVal} not found.
                Please try another.`)
            }
        })
        .catch(err => console.log(`error ${err}`));
}

class ProductInfo {
    constructor(productData) {
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }

    showInfo() {
        document.getElementById('product-img').src = this.image
        document.getElementById('product-name').innerText = this.name
    }

    listIngredients(){
        let tableRef = document.getElementById('ingredient-table')

        for(let i = 1; i< tableRef.rows.length;){
            tableRef.deleteRow(i);
        }

        for(let key in this.ingredients){
            let newRow = tableRef.insertRow(-1)
            let newICell = newRow.insertCell(0)
            let newVCell = newRow.insertCell(1)
            let newIText = document.createTextNode(
                this.ingredients[key].text
            )
            let vegStatus = this.ingredients[key].vegetarian      
            let newVText = document.createTextNode(vegStatus)
            newICell.appendChild(newIText)
            newVCell.appendChild(newVText)    
        }
    }
}

