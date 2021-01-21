const fetchData = async (url) => {
    let response = await fetch(url, { method: "POST"})
    let data = await response.json();
    return data;
}

// To display the card on load (from the previous session for example)
const shoppingCart = async () => {
    const data = await fetchData('/initCart');
    const prices_and_images = await fetchData('/products')
    if (Object.entries(data)) {
        Object.entries(data).forEach(entry => {
            let [key, value] = entry;
            const {price, image} = prices_and_images[key];
            let total = Number(document.querySelector("#price-total").innerHTML)
            document.querySelector("#price-total").innerHTML = (price*value + total).toFixed(2);
            const li = document.createElement("li");
            li.setAttribute("id", key + "_li");
            li.innerHTML = `<a href="/shop-detail" class="photo"><img src=${image} class="cart-thumb" alt="" /></a><h6><a href="/shop-detail">${key}</a></h6><p><span id="amount_${key}">
            ${value}</span>x - <span class="price">€${price}</span> - Total: €<span id="article_total_${key}">${(price*value).toFixed(2)}</span></p>`
            document.querySelector(".cart-list").insertBefore(li, document.querySelector(".total") )
            document.querySelector(".badge").innerHTML = Number(document.querySelector(".badge").innerHTML) + value
        });
    }

//********************************************* /SHOP **************************************************/
    // if (document.URL === process.env.URL + "/shop") { 
    if (document.URL === "http://localhost:3000/shop" || document.URL === "https://e-shop-lamotte.herokuapp.com/shop") {

        document.querySelector('#quantity-products').innerHTML = Object.keys(prices_and_images).length
        // Create the block for product with image price and so on
        Object.entries(prices_and_images).forEach(entry => {
            const [key, value] = entry;
            const {price, image} = prices_and_images[key];
            document.querySelector('#product-container').insertAdjacentHTML('beforeend', `
            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div class="products-single fix">
                    <div class="box-img-hover">
                        <div class="type-lb">
                            <p class="sale">` + "Sale" + `</p>
                        </div>
                        <img src="${image}" class="img-fluid" alt="Image">
                        <div class="mask-icon">
                            <a class="cart ${key}" >Add to Cart</a>
                        </div>
                    </div>
                    <div class="why-text">
                        <h4>${key}</h4>
                        <h5> €${price}</h5>
                    </div>
                </div>
            </div>`)

            document.querySelector('#list-view').insertAdjacentHTML('beforeend', `
            <div class="list-view-box">
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div class="products-single fix">
                            <div class="box-img-hover">
                                <div class="type-lb">
                                    <p class="sale">Sale</p>
                                </div>
                                <img src="${image}" class="img-fluid" alt="Image">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                        <div class="why-text full-width">
                            <h4>${key}</h4>
                            <h5> € ${price}</h5>
                            <p>Integer tincidunt aliquet nibh vitae dictum. In turpis sapien, imperdiet quis magna nec, iaculis ultrices ante. Integer vitae suscipit nisi. Morbi dignissim risus sit amet orci porta, eget aliquam purus
                                sollicitudin. Cras eu metus felis. Sed arcu arcu, sagittis in blandit eu, imperdiet sit amet eros. Donec accumsan nisi purus, quis euismod ex volutpat in. Vestibulum eleifend eros ac lobortis aliquet.
                                Suspendisse at ipsum vel lacus vehicula blandit et sollicitudin quam. Praesent vulputate semper libero pulvinar consequat. Etiam ut placerat lectus.</p>
                            <a class="btn hvr-hover cart ${key}">Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>`)
        
        })

        
    
        // Add event listener to add article to the cart
        document.querySelectorAll('.cart').forEach(element => {
            element.addEventListener("click", function (e) {
                // Setup for the prices cart-side part
                let article;
                if (this.className.includes('btn')) {
                    article = this.className.replace('btn hvr-hover cart ', '');
                } else {
                    article = this.className.replace('cart ', '');
                }
                const {price, image} = prices_and_images[article];
                let total = Number(document.querySelector("#price-total").innerHTML);
                document.querySelector("#price-total").innerHTML = (price + total).toFixed(2);
                let amount=1;
                // Setup to insert the new item in the cart-sidebar
                if (document.querySelector("#" + article + "_li")) {
                    amount = Number(document.querySelector("#amount_" + article).innerHTML)
                    amount ++;
                    document.querySelector("#amount_" + article).innerHTML = amount
                    document.querySelector("#article_total_" + article).innerHTML = (amount * price).toFixed(2)
                } else {
                    const li = document.createElement("li")
                    li.setAttribute("id", article + "_li")
                    li.innerHTML = `<a href="/shop-detail" class="photo"><img src=${image} class="cart-thumb" alt="" /></a><h6><a href="/shop-detail">${article}
                    </a></h6><p><span id="amount_${article}">1</span>x - <span class="price">€${price}</span> - Total: €<span id="article_total_${article}">${price}</span></p>`
                    document.querySelector(".cart-list").insertBefore(li, document.querySelector(".total") )
                }

                // Adding the number of items on the cart button (to display it) in the cart-sidebar
                let badge = document.querySelector(".badge").innerHTML
                if (badge) {
                    badge = Number(badge) + 1
                } else{
                    badge = 1
                }
                document.querySelector(".badge").innerHTML = badge

                // Changing the color to signify the bouton have been clicked
                this.style.color = "#b0b435"
                setTimeout(() => {
                    this.style.color = 'white';
                }, 500);
                amount = Number(document.querySelector("#amount_" + article).innerHTML)
                // Sending the data of the purchase to the backend
                fetch("/addToCart", { method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        name: article,
                        amount
                    }),
                })
            })
        });
    }   

/************************************************ /CART ******************************************************/
    // if (document.URL === process.env.URL + "/cart") {
    if (document.URL === "http://localhost:3000/cart" || document.URL === "https://e-shop-lamotte.herokuapp.com/cart") {
        if (Object.entries(data)) {
            Object.entries(data).forEach(entry => {
                let [key, value] = entry;
                const { price, image } = prices_and_images[key]
                const tr = document.createElement("tr");
                tr.setAttribute("id", key + "_tr");

                tr.innerHTML = '<td class="thumbnail-img"><a href="#"><img class="img-fluid" src='+ image +' alt="" /></a></td><td class="name-pr"><a href="#">'+key+'</a></td><td class="price-pr"><p id="price_for_total_'+ key +'">€ '+ price +'</p></td><td class="quantity-box"><input id="input_value_'+ key +'" type="number" size="4" value="'+ value +'" min="0" step="1" class="c-input-text qty text"></td><td class="total-pr"><p id="total_'+ key +'">€ '+ (value*price).toFixed(2) +'</p></td><td class="remove-pr"><a id="remove_product_'+key+'" style="color: black; cursor: pointer" ><i class="fas fa-times"></i></a></td>'
                document.querySelector('#check_purchase').insertBefore(tr, null)
            });

            let subtotal = 0;
            document.querySelectorAll(".total-pr p").forEach(element => {
                subtotal += Number(element.innerHTML.replace("€ ",""));
            });

            document.querySelector("#subTotal").innerHTML = subtotal.toFixed(2);
            document.querySelector("#grandTotal").innerHTML= subtotal.toFixed(2)
            
        }

        document.querySelectorAll("table input").forEach(element => {
            element.addEventListener("change", function () {
                let oldValue = this.defaultValue;
                this.defaultValue=this.value;
                let article = this.id.replace("input_value_", "")
                let amount = Number(this.value)
                let price = prices_and_images[article].price

                // Modify the badge (little number near the image of card on the top right corner of the screen) when modifying the amount
                let badge = document.querySelector(".badge").innerHTML
                badge = Number(badge) + (this.value - oldValue)
                if (badge === 0) {
                    document.querySelector(".badge").innerHTML = ""
                } else {
                    document.querySelector(".badge").innerHTML = badge
                }
                // Modify the side-cart
                if (document.querySelector("#" + article + "_li")) {
                    document.querySelector("#amount_" + article).innerHTML = amount
                    document.querySelector("#article_total_" + article).innerHTML = (amount * price).toFixed(2)
                }
                
                // Modify the side-cart
                let total = Number(document.querySelector("#price-total").innerHTML);
                document.querySelector("#price-total").innerHTML = (price * (this.value - oldValue) + total).toFixed(2);


                // Modify the articles on the center of the page
                document.querySelector("#total_" + article).innerHTML = "€ " + (amount*price).toFixed(2)

                let subtotal = 0;
                document.querySelectorAll(".total-pr p").forEach(element => {
                    subtotal += Number(element.innerHTML.replace("€ ",""));
                });

                document.querySelector("#subTotal").innerHTML = subtotal.toFixed(2);
                document.querySelector("#grandTotal").innerHTML= subtotal.toFixed(2);

                fetch('/changeQuant', { method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        article,
                        amount
                    }),
                });
            })
        });


        document.querySelectorAll(".remove-pr a").forEach(link => {
            link.addEventListener("click", function () {
                let article = this.id.replace("remove_product_", "");
                amount = Number(document.querySelector("#input_value_"+ article).value)
                let badge = document.querySelector(".badge").innerHTML
                badge = Number(badge) - amount
                if (badge === 0) {
                    document.querySelector(".badge").innerHTML = ""
                } else {
                    document.querySelector(".badge").innerHTML = badge
                }

                //Modify the side cart
                document.querySelector("#"+ article + "_tr").remove();
                document.querySelector(`#${article}_li`).remove();
                document.querySelector(`#price-total`).innerHTML =  (Number(document.querySelector(`#price-total`).innerHTML) - prices_and_images[article].price * amount).toFixed(2)
                

                
                let subtotal = 0;
                document.querySelectorAll(".total-pr p").forEach(element => {
                    subtotal += Number(element.innerHTML.replace("€ ",""));
                });

                document.querySelector("#subTotal").innerHTML = subtotal.toFixed(2);
                document.querySelector("#grandTotal").innerHTML= subtotal.toFixed(2);

                fetch('/changeQuant', { method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        article,
                        amount:0
                    }),
                })
            })
        })
    }
/******************************************* /CHECKOUT ********************************************************/
    // if (document.URL === process.env.URL + "/checkout") {
    if (document.URL === "http://localhost:3000/checkout" || document.URL === "https://e-shop-lamotte.herokuapp.com/checkout") {
        console.log(data);
        if (Object.entries(data)) {
            Object.entries(data).forEach(entry => {
                let [key, value] = entry;

                const { price, image } = prices_and_images[key]
                const div = document.createElement("div");
                div.setAttribute("id", key + "_div");
                div.setAttribute("class", "media mb-2 border-bottom");

                div.innerHTML = '<div class="media-body"> <a style="color:black;"> '+ key +'</a><div class="small text-muted">Price: €'+ price +' <span class="mx-2">|</span> Qty: '+ value +' <span class="mx-2">|</span> Subtotal: €<span class="subtotal_pr">'+ price*value +'</span></div></div>'
                document.querySelector('#final_container').insertBefore(div, null)
            });

            // setup the subtotal
            let subtotal = 0;
            document.querySelectorAll(".subtotal_pr").forEach(element => {
                subtotal += Number(element.innerHTML);
            });

            document.querySelector("#subTotal").innerHTML = subtotal.toFixed(2); 
            document.querySelector("#grandTotal").innerHTML= subtotal.toFixed(2); 

            // Setup the options for shipping cost and then the grand total
            document.querySelectorAll(".shipopt").forEach(shipoption => {
                shipoption.addEventListener("click", () => {
                    if (document.querySelector("#shippingOption1").checked) {
                        document.querySelector("#final_ship_cost").innerHTML = " Free ";
                        document.querySelector("#grandTotal").innerHTML= subtotal.toFixed(2);       
                    } else if (document.querySelector("#shippingOption2").checked) {
                        document.querySelector("#final_ship_cost").innerHTML = " €10.00 ";
                        document.querySelector("#grandTotal").innerHTML= (subtotal + 10).toFixed(2)
                    } else {
                        document.querySelector("#final_ship_cost").innerHTML = " €20.00 ";
                        document.querySelector("#grandTotal").innerHTML= (subtotal + 20).toFixed(2)
                    }
                })
            });
            
            // Pre-fill the forms with the user data
            const finalFormData = await fetchData('/finalForm', { method: "POST"})
            document.querySelector("#firstName").value = finalFormData.firstname
            document.querySelector("#lastName").value = finalFormData.lastname
            document.querySelector("#email").value = finalFormData.email

            const responseAPI = await fetch('https://restcountries.eu/rest/v2/all')
            const dataAPI = await responseAPI.json();
            dataAPI.forEach(element => {
                document.querySelector("#country").insertAdjacentHTML('beforeend', "<option value="+ element.name +">"+ element.name +"</option>")
            });
            
            const response = await fetch('/setAddressPayment', { method: 'POST' });
            const dataAddrPay = await response.json();
            if (dataAddrPay) {
                Object.entries(dataAddrPay).forEach(entries => { 
                    let [key, value] = entries
                    switch (key) {
                        case "method" :
                            document.querySelectorAll('input[name="method"]').forEach(input=> {
                                if (input.id === dataAddrPay.method) {
                                    input.checked = true
                                }
                            })
                            break;
                        case "expiration" :
                            const expiration = new Date(Date.parse(dataAddrPay.expiration));
                            
                            document.querySelector("#expiration").value = expiration.getFullYear().toString() + '-' + 
                            (expiration.getMonth() + 1).toString().padStart(2, 0) + '-' + expiration.getDate().toString().padStart(2, 0);
                            break;
                        default :
                        console.log(key);
                            document.querySelector("#"+key).value = value;
                    }
                })
            }
            
        }

        

        document.querySelector("#FinalOrder").addEventListener("click", () => {
            const formFields = ["#firstName", "#lastName", "#email", "#address", "#address2", "#zip", "#cc-name", "#cc-number", "#cc-expiration", "#cc-cvv"];
            let filled = true;
            formFields.forEach(formField => {
                if (document.querySelector(formField).value ==="") {
                    filled = false;
                }
            });

            if (document.querySelector("#countries").value ==="Choose...") {
                console.log("countries wrong")
            }

            if (filled) {
                
            } else {
                console.log("Not filled")
            }
        })
    }
} 

shoppingCart() 
