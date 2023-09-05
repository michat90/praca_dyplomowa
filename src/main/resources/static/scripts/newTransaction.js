window.addEventListener("load", function (event) {
    let URL = 'https://home-budget.up.railway.app/'
    // let URL ='http://localhost:8080/'
    if (window.location.href.indexOf('new-transaction') < 1) {
        return false;
    }

    let submit = document.getElementById("btn-submit");
    let amount = document.getElementById("amount");
    let datepicker = document.getElementById("datepicker");
    let title = document.getElementById("title");
    let tag = document.getElementById("tag");
    let category = document.getElementById("categories")
    let clear = document.querySelector('#btn-clear')
    let addCategory = document.querySelector('#new-transaction-edit-btn')
    let categoryEditor = document.querySelector('#categories-editor')
    let incomeCheckBox = document.getElementById("transaction-income")
    let expenseCheckBox = document.getElementById("transaction-expense")
    let subCategory = document.getElementById("subcategories");

    expenseCheckBox.checked = true
    fillFormToEditData()
    getCategories()
    clear.addEventListener("click", function () {
        window.location = URL + 'new-transaction'
    });
    category.addEventListener("change", function () {
        getSubcategories()
    });
    subCategory.addEventListener("change", function () {
        getTransactionTypeFromSubcategory()
    });
    submit.addEventListener("click", function () {

        if (validForm()) {
            postRequest()
        }
    });
    addCategory.addEventListener('click', function () {
        if (categoryEditor.classList.contains('hidden-box')) {
            categoryEditor.classList.remove('hidden-box');
            let expenseCheckBox = document.getElementById("editor-expense");
            expenseCheckBox.checked = true;
            addMainCategoriesToEditor();
            let colorPicker = document.querySelector('#color-picker')
            colorPicker.style.background = '#1E87F0'
        } else {
            categoryEditor.classList.add('hidden-box');
        }
    });


    function validForm() {
        let valid = true;
        let amountError = document.getElementById("amount-error");
        if (!checkAmount()) {
            valid = false
            setErrorText(amountError, "Amount can contain only numbers")
        } else {
            setHiddenAtribute(amountError)
        }

        let DateError = document.getElementById("datepicker-error");
        if (!dateIsValid(datepicker.value)) {
            valid = false
            setErrorText(DateError, "Invalid date or date range.")
        } else {
            setHiddenAtribute(DateError)
        }

        let CategoryError = document.getElementById("category-error");
        let category = document.getElementById("categories");
        category = category.value
        if (CategoryIsEmpty(category)) {
            valid = false
            setErrorText(CategoryError, "Category cannot be empty")
        } else {
            setHiddenAtribute(CategoryError)
        }
        let subcategoryError = document.getElementById("subcategory-error");
        let subcategory = document.getElementById("subcategories");
        subcategory = subcategory.value
        if (CategoryIsEmpty(subcategory)) {
            valid = false
            setErrorText(subcategoryError, "Subcategory cannot be empty")
        } else {
            setHiddenAtribute(subcategoryError)
        }

        return valid
    }

    function checkAmount() {
        let check = true;
        let num = parseFloat(amount.value);
        if (num.toString() === "NaN") {
            check = false
        }
        return check
    }

    function dateIsValid(date) {
        const dateToCheck = new Date(date);
        const start = new Date('01/01/2000');
        const end = new Date('01/01/2999');
        return dateToCheck > start && dateToCheck < end;
    }

    function CategoryIsEmpty(input) {
        return input.value === "";
    }

    function setErrorText(element, msg) {
        element.textContent = msg;
        element.removeAttribute('hidden');
    }

    function setHiddenAtribute(element) {
        if (element.getAttribute('hidden') !== null) {
            element.hidden = true
        }
    }

    function postRequest() {
        let cat = document.getElementById("categories");
        let subCat = document.getElementById("subcategories");
        let dateToConvert = datepicker.value
        let [month, day, year] = dateToConvert.split('/')
        let [amountValue,operationType] = getOperationTypeAndAmount();
        let requestURL;

        transactionDate = `${year}-${month}-${day}`;
        console.log(transactionDate)
        const data = {
            amount: amountValue,
            date: transactionDate,
            category: cat.value,
            subcategory: subCat.value,
            tag: tag.value,
            title: title.value,
            transactionType: operationType
        }
        let urlToCheck = window.location.href;
        urlToCheck = urlToCheck.split('/');
        if (urlToCheck[urlToCheck.length-1] === 'new-transaction') {
            requestURL ='new-transaction';
        } else {
            let id = urlToCheck[urlToCheck.length-1];
            requestURL ='transactions/edit/' + Number(id);
        }
        fetch(URL + requestURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .catch(err => {
                console.log(err);
            });

        window.location = URL + 'new-transaction'
    }

    function getOperationTypeAndAmount() {
        if (incomeCheckBox.checked === true && expenseCheckBox.checked === false) {
            if (amount.value < 0) {
                return [amount.value * -1, 'income'];
            } else {
                return [amount.value, 'income'];
            }
        } else if ((incomeCheckBox.checked === false && expenseCheckBox.checked === true) ||
        (incomeCheckBox.checked === false && expenseCheckBox.checked === false)) {
            if (amount.value < 0) {
                return [amount.value, 'expense'];
            } else {
                return [amount.value * -1, 'expense'];
            }
        }
    }

    async function getRequest(requestUrl) {
        return fetch(URL + requestUrl, {
            method: "GET",
        });
    }


    function getCategories() {
        getRequest('categories/json')
            .then((response) => response.json())
            .then((json) => {
                addCategories(json);
            });
    }

    function getSubcategories() {
        getRequest("subcategories/json")
            .then((response) => response.json())
            .then((json) => {
                let categoryName = document.getElementById("categories");
                addSubCategories(json, categoryName.value);
            });
    }

    function addCategories(array) {
        let select = document.getElementById("categories-list")
        let arr = []
        for (let i = 0; i < array.length; i++) {
            if (!arr.includes(array[i].category)) {
                arr.push(array[i].category)
                select.innerHTML +=
                    "<option>" + array[i].category + "</option>";
            }
        }
    }
    function addMainCategoriesToEditor() {
        fetch('categories/json')
            .then((response) => response.json())
            .then((json) => {
                addCategoriesToEditor(json);
            });
    }

    function addCategoriesToEditor(array) {
        let select = document.getElementById("editor-categories-list")
        removeAllChildNodes(select)
        for (let i = 0; i < array.length; i++) {
            let newRow = document.createElement('option')
            newRow.value = array[i].category
            newRow.setAttribute('id', 'editor-cat#' + array[i].id)
            newRow.classList.add('editor-category-list')
            select.appendChild(newRow)
        }
    }

    function addSubCategories(array, categoryName) {
        let select = document.getElementById("subcategories-list");
        removeAllChildNodes(select);
        document.getElementById("subcategories").value = "";
        for (let i = 0; i < array.length; i++) {
            if (array[i].categoryEntity["category"] === categoryName) {
                let option = document.createElement('option')
                option.value = array[i].subCategory
                option.classList.add('transactionType-' + array[i].operationType)
                select.appendChild(option)
            }

        }
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function fillFormToEditData() {
        let urlToCheck = window.location.href;
        urlToCheck = urlToCheck.split('/');
        if (urlToCheck[urlToCheck.length-1] === 'new-transaction') {
            return;
        }
        let id = urlToCheck[urlToCheck.length-1];
        getTransactionById(id);
    }

    function getTransactionById(ID) {
        getRequest('transactions/' + ID)
            .then((response) => response.json())
            .then((json) => {
                moveDataToTransactionEditor(json);
            });
    }

    function moveDataToTransactionEditor(array) {
        let id = document.querySelector('.new-transaction-id')
        id.id = 'new-transaction#' + array['id'];
        let subcategories = document.getElementById("subcategories")
        amount.value = array['amount'];
        category.value = array['category']
        subcategories.value = array['subcategory']
        title.value = array['title']
        tag.value = array['tag']
        let dateToConvert = array['date'];
        let [year, month, day] = dateToConvert.split('-')
        datepicker.value = `${month}/${day}/${year}`
    }

    incomeCheckBox.addEventListener('change', function () {
        if (incomeCheckBox.checked === true) {
            expenseCheckBox.checked = false
        }
    });
    expenseCheckBox.addEventListener('change', function () {
        if (expenseCheckBox.checked === true) {
            incomeCheckBox.checked = false
        }
    });

    function getTransactionTypeFromSubcategory() {
        Array.from(document.querySelector('#subcategories-list').children).forEach(function (element) {
            if (subCategory.value === element.value){
                let operationType = element.classList.value;
                operationType = operationType.split('-')[1];
                if (operationType === 'income') {
                    incomeCheckBox.checked = true;
                    expenseCheckBox.checked = false;
                } else {
                    incomeCheckBox.checked = false;
                    expenseCheckBox.checked = true;
                }
            }
        });
    }



}, false);