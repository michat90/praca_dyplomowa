
window.addEventListener("load",function(event) {
    let submit = document.getElementById("btn-submit");
    let amount = document.getElementById("amount");
    let datepicker = document.getElementById("datepicker");
    let category = document.getElementById("category");
    let title = document.getElementById("title");
    let tag = document.getElementById("tag");
    submit.addEventListener("click", function () {

        if (validForm()) {
            console.log('Poprawnie wysłany formularz');
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

    function setErrorText(element, msg) {
        element.textContent = msg;
        element.removeAttribute('hidden');
    }

    function setHiddenAtribute(element) {
        element.setAttribute('hidden', '')
    }

},false);