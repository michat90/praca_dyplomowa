
window.addEventListener("load",function(event) {
    let submit = document.getElementById("btn-submit");
    let amount = document.getElementById("amount");
    let datepicker = document.getElementById("datepicker");
    let title = document.getElementById("title");
    let tag = document.getElementById("tag");
    let URL = 'http://localhost:8080/new-transaction'
    let category = document.getElementById("categories")

    getCategories()
    category.addEventListener("change", function () {
        getSubcategories()
    });
    submit.addEventListener("click", function () {

        if (validForm()) {
            postRequest()
        }
    });



    function validForm() {
        let valid = true
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
            console.log("dksnfksdkfksdf")
        }

    }

    function postRequest() {
        let cat = document.getElementById("categories");
        let subCat = document.getElementById("subcategories");
        let dateToConvert = datepicker.value
        let [month,day,year] = dateToConvert.split('/')
        transactionDate  = `${year}-${month}-${day}`;
        console.log(transactionDate)
        const data = {
            amount: amount.value,
            date: transactionDate,
            category: cat.value,
            subcategory: subCat.value,
            tag: title.value,
            title: tag.value
        }
        console.log(data)
        fetch(URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        window.location = URL
    }

    async function getRequest (){
        return fetch(URL + '/json-cat', {
        method: "GET",
    });
    }


    function getCategories () {
        getRequest()
            .then((response) => response.json())
            .then((json) => {
                addCategoriesToDropdown(json);
            });
    }

    function getSubcategories () {
        getRequest()
            .then((response) => response.json())
            .then((json) => {
                let categoryName = document.getElementById("categories");
                addSubCategories(json,categoryName.value);
            });
    }

    function addCategoriesToDropdown(array) {
        let select = document.getElementById("categories-list")
        for (let i = 0; i < array.length; i++) {
            select.innerHTML +=
                "<option>" + array[i].category + "</option>";
        }
    }

    function addSubCategories(array,categoryName) {
        let select = document.getElementById("subcategories-container");
        removeAllChildNodes(select);
        document.getElementById("subcategories").value = "";
        for (let i = 0; i < array.length; i++) {
            console.log(array[i].category === categoryName)
            if (array[i].category === categoryName) {
                select.innerHTML +=
                    "<option>" + array[i].subCategory + "</option>";
            }

        }
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

},false);