if (document.URL === "http://localhost:3000/address-payment" || document.URL === "https://e-shop-lamotte.herokuapp.com/address-payment") { 
    
    let timeoutCountry = 0;
    let timeoutValues = 0 


    const fetchCountry = async () => {
        try {
            responseAPI = await fetch('https://restcountries.eu/rest/v2/all')
            dataAPI = await responseAPI.json();
            dataAPI.forEach(element => {
                document.querySelector("#country").insertAdjacentHTML('beforeend', "<option value="+ element.name +">"+ element.name +"</option>")
            })
            fetchPaymentValues()
        } catch (e) {
            timeoutCountry += 1000;
            setTimeout(()=> {
                fetchCountry()
            },timeoutCountry)
        } 
    }

    const fetchPaymentValues = async () => {
        try {
        const response = await fetch('/setAddressPayment', { method: 'POST' });
            const data = await response.json();
            if (data) {
                Object.entries(data).forEach(entries => { 
                    let [key, value] = entries
                    switch (key) {
                        case "method" :
                            document.querySelectorAll('input[name="method"]').forEach(input=> {
                                if (input.id === data.method) {
                                    input.checked = true
                                }
                            })
                            break;
                        case "expiration" :
                            const expiration = new Date(Date.parse(data.expiration));
                            
                            document.querySelector("#expiration").value = expiration.getFullYear().toString() + '-' + 
                            (expiration.getMonth() + 1).toString().padStart(2, 0) + '-' + expiration.getDate().toString().padStart(2, 0);
                            break;
                        default :
                            document.querySelector("#"+key).value = value;
                    }
                })
            }
        } catch (e) {
            timeoutValues += 1000;
            setTimeout(()=> {
                fetchPaymentValues()
            }, timeoutValues)
        }
    }

    fetchCountry()
        
    document.querySelector('#update').addEventListener("click", (e) => {
        e.preventDefault();
        const body = {}
        document.querySelectorAll('input[name="method"]').forEach(input=> {
            if (input.checked) {
                body.method = input.id
            }
        })
        body.address1 = document.querySelector("#address1").value,
        body.address2 = document.querySelector("#address2").value,
        body.country = document.querySelector("#country").value,
        body.zip = document.querySelector("#zip").value,
        body.cardName = document.querySelector('#cardName').value;
        body.cardNumber = document.querySelector('#cardNumber').value;
        body.expiration = document.querySelector('#expiration').value
        body.cvv = document.querySelector('#cvv').value;

        fetch('/addressPayment', { method: "POST", headers: { "content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then((data) => {
            if (document.querySelectorAll(".errors").length !== 0){
                document.querySelectorAll(".errors").forEach(element => {
                    element.remove();
                });
            }
            if (data.errors) {
                data.errors.forEach(error => {
                    document.querySelector("#update").insertAdjacentHTML("afterend", '<div class="errors alert alert-danger mt-3">'+ error +'</div>')
                });
            } else if(data.message === "ok") {
                document.querySelector("#update").insertAdjacentHTML("afterend", '<div class="errors alert alert-success mt-3">Your data have been updated</div>')
            } else {
                document.querySelector("#update").insertAdjacentHTML("afterend", '<div class="errors alert alert-danger mt-3">Server problem, try again in a minute!</div>')
            }
        })
        .catch((e) => {
            document.querySelector("#update").insertAdjacentHTML("afterend", '<div class="errors alert alert-danger mt-3">Server problem, try again in a minute!</div>')
        })
    })
}