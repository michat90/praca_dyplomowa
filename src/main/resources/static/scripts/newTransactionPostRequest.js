
window.addEventListener("load",function(event) {
    let submit = document.getElementById("btn-submit");
    let amount = document.getElementById("amount");
    let datepicker = document.getElementById("datepicker");
    let title = document.getElementById("title");
    let tag = document.getElementById("tag");
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
        let category = document.getElementById("category").innerHTML;
        if (CategoryIsEmpty(category)) {
            valid = false
            setErrorText(CategoryError, "Category cannot be empty")
        } else {
            setHiddenAtribute(CategoryError)
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
        return input === "Select Category"
    }

    function setErrorText(element, msg) {
        element.textContent = msg;
        element.removeAttribute('hidden');
    }

    function setHiddenAtribute(element) {
        element.setAttribute('hidden', '')
    }

    function postRequest() {
        let URL = 'http://localhost:8080/new-transaction'
        let cat = document.getElementById("category").innerHTML;
        let transactionDate = new Date(datepicker.value)
        transactionDate = new Date(transactionDate.getFullYear(),transactionDate.getMonth(),transactionDate.getDay())
        const data = {
            amount: amount.value,
            date: transactionDate,
            category: cat,
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

},false);