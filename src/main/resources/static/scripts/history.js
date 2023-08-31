window.addEventListener("load", function (event) {
    // let URL = 'http://localhost:8080/'
    let URL;
    if (window.location.host.indexOf('http://') < 1) {
        URL = 'http://' + window.location.host + '/';
    } else {
        URL = window.location.host + '/';
    }
    if (window.location.href.match(URL + 'history') == null) {
        return false;
    }
    getCategories()

    function getCategories() {
        getRequest('history/json')
            .then((response) => response.json())
            .then((json) => {
                addTransactionToTable(json);
            });
    }

    async function getRequest(requestUrl) {
        return fetch(URL + requestUrl);
    }

    function addTransactionToTable(array) {
        let table = document.querySelector("#history-table-content");
        for (let i = 0; i < array.length; i++) {
            let row = document.createElement('div');
            row.classList.add('table-row-history')
            row.appendChild(addIdColumn(array, i))
            row.appendChild(addCategoryColumn(array, i))
            row.appendChild(addAmountTitleTagColumn(array, i))
            row.appendChild(addDateColumn(array, i))
            row.appendChild(addBtnColumn(array, i))
            table.appendChild(row)
            let separator = document.createElement('div')
            separator.classList.add('separator')
            table.appendChild(separator)
        }
        addEvents()
    }

    function addIdColumn(arr, row) {
        let column = document.createElement('div');
        column.classList.add('col-1');
        column.classList.add('col-id')
        let colElement = document.createElement('span');
        colElement.classList.add('id-history');
        colElement.innerText = arr[row].id;
        column.appendChild(colElement);
        return column;
    }

    function addCategoryColumn(arr, row) {
        let column = document.createElement('div');
        column.classList.add('col-2');
        column.classList.add('history-col-content')
        let colElement = document.createElement('div');
        colElement.classList.add('category-history');
        colElement.innerText = arr[row].category;
        column.appendChild(colElement);
        colElement = document.createElement('div');
        colElement.classList.add('subcategory-history');
        colElement.innerText = arr[row].subcategory;
        column.appendChild(colElement);
        return column;
    }

    function addAmountTitleTagColumn(arr, row) {
        let formatting_options = {
            style: 'currency',
            currency: 'PLN',
            minimumFractionDigits: 2,
        }
        let column = document.createElement('div');
        column.classList.add('col-3');
        column.classList.add('history-col-content')
        let box = document.createElement('div');
        let colElement = document.createElement('span');
        if (arr[row].amount < 0){
            colElement.classList.add('negative-value');
        } else {
            colElement.classList.add('positive-value');
        }
        let currencyString = new Intl.NumberFormat('pl-PL', formatting_options);
        colElement.innerText = currencyString.format(arr[row].amount)
        box.appendChild(colElement)
        column.appendChild(box);
        box = document.createElement('div');
        colElement = document.createElement('span');
        colElement.classList.add('title-history');
        colElement.innerText = arr[row].title;
        box.appendChild(colElement)
        column.appendChild(box);
        box = document.createElement('div');
        colElement = document.createElement('span');
        colElement.classList.add('tag-history');
        colElement.innerText = arr[row].tag;
        box.appendChild(colElement)
        column.appendChild(box);
        return column;
    }

    function addDateColumn(arr, row) {
        let column = document.createElement('div');
        column.classList.add('col-4');
        let date = new Date(arr[row].date);
        column.innerText = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return column;
    }

    function addBtnColumn(arr, row) {
        let column = document.createElement('div');
        column.classList.add('col-5');
        column.classList.add('edit-btn')
        column.id = 'history#' + arr[row].id
        let colElement = document.createElement('img');
        colElement.classList.add('nav-png');
        colElement.classList.add('history-btn-delete');
        colElement.src = '/icons/delete.svg'
        column.appendChild(colElement);
        colElement = document.createElement('img');
        colElement.classList.add('nav-png');
        colElement.classList.add('history-btn-edit');
        colElement.src = '/icons/edit.svg'
        column.appendChild(colElement);
        return column;
    }

    function addEvents() {
        Array.from(document.getElementsByClassName("history-btn-edit")).forEach(function (element) {
            element.addEventListener('click', function () {
                let id = element.parentElement.id;
                id = id.split("#")[1];
                window.location = URL + 'new-transaction/' + Number(id);
            });
        });
        Array.from(document.getElementsByClassName("history-btn-delete")).forEach(function (element) {
            element.addEventListener('click', function () {
                let id = element.parentElement.id;
                id = id.split("#")[1];
                const response = confirm("Are you sure you want to delete transaction with id " + id + " ?");
                if (response) {
                    deleteById(Number(id));
                }
            });
        });
    }

    function deleteById(transactionId) {
        fetch(URL + 'transactions/delete/' + transactionId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        window.location = URL + 'history'
    }



});