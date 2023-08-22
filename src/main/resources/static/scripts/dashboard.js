window.addEventListener("load", function (event) {
    let URL = 'http://localhost:8080/'
    if (window.location.href.match(URL + 'dashboard') == null) {
        return false;
    }
    getCategories()

    function getCategories() {
        getRequest('history/json')
            .then((response) => response.json())
            .then((json) => {
                agregateCategories(json);
            });
    }

    async function getRequest(requestUrl) {
        return fetch(URL + requestUrl);
    }

    function agregateCategories(array) {

        let categories = {};
        for (let i = 0; i < array.length; i++) {
            if (array[i].category in categories) {
                categories[array[i].category] += array[i].amount;
            } else {
                categories[array[i].category] = array[i].amount;
            }
        }
        addTransactionsByCategory(categories)
    }

    function addTransactionsByCategory(categories) {
        let table = document.querySelector("#transaction-by-category");
        let formatting_options = {
            style: 'currency',
            currency: 'PLN',
            minimumFractionDigits: 2,
        }
        for (let key in categories) {
            let box = document.createElement("div")
            box.classList.add("dashboard-box")
            let category = document.createElement("div");
            category.innerText = key;
            category.classList.add("dashboard-category")
            box.appendChild(category)
            let amount = document.createElement("div")
            let currencyString = new Intl.NumberFormat('pl-PL', formatting_options);
            amount.innerText = currencyString.format(categories[key])
            amount.classList.add("dashboard-amount")
            box.appendChild(amount)
            let separator = document.createElement("div")
            separator.classList.add("separator")
            table.appendChild(box)
            table.appendChild(separator)
        }
    }












});