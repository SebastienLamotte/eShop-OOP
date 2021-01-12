// const getPrice = async () => {
//     let response = await fetch('/getPrices&Images', { method: "POST"})
//     let data = await response.json();
//     return data;
// }



const fetchData = async (url) => {
    let response = await fetch(url, { method: "POST"})
    let data = await response.json();
    return data;
}

// To display the card on load (from the previous session for example)
const shoppingCart = async () => {
    const data = await fetchData('/initCart');
    const prices_and_images = await fetchData('/getPrices&Images')
    
    if (Object.entries(data.articles)) {
        Object.entries(data.articles).forEach(entry => {
            let [key, value] = entry;
            const {price, image} = prices_and_images[key];
            let total = Number(document.querySelector("#price-total").innerHTML)
            document.querySelector("#price-total").innerHTML = (price*value + total).toFixed(2);
            const li = document.createElement("li");
            li.setAttribute("id", key + "_li");
            li.innerHTML = '<a href="/shop-detail" class="photo"><img src='+ image +' class="cart-thumb" alt="" /></a><h6><a href="/shop-detail">'+ key +'</a></h6><p><span id="amount_'+ key +'">'+ value +'</span>x - <span class="price">€'+ price +'</span> - Total: €<span id="article_total_'+key+'">'+ (price*value).toFixed(2) +'</span></p>'
            document.querySelector(".cart-list").insertBefore(li, document.querySelector(".total") )
            document.querySelector(".badge").innerHTML = Number(document.querySelector(".badge").innerHTML) + value
        });
    }

//********************************************* /SHOP **************************************************/
    if (document.URL === "http://localhost:3000/shop") {  
        document.querySelectorAll('.cart').forEach(element => {
            element.addEventListener("click", function (e) {
                // Setup for the price cart-side part
                const price = Number(this.parentNode.parentNode.parentNode.querySelector(".why-text h5").innerHTML.replace("€", ""));
                let total = Number(document.querySelector("#price-total").innerHTML);
                document.querySelector("#price-total").innerHTML = (price + total).toFixed(2);
                
                // Setup to insert the new item in the cart-sidebar
                if (document.querySelector("#" + this.id + "_li")) {
                    let amount = Number(document.querySelector("#amount_" + this.id).innerHTML)
                    amount ++;
                    document.querySelector("#amount_" + this.id).innerHTML = amount
                    document.querySelector("#article_total_" + this.id).innerHTML = (amount * price).toFixed(2)
                } else {
                    const li = document.createElement("li")
                    li.setAttribute("id", this.id + "_li")
                    const img = this.parentNode.parentNode.querySelector("img").src
                    li.innerHTML = '<a href="/shop-detail" class="photo"><img src='+ img+' class="cart-thumb" alt="" /></a><h6><a href="/shop-detail">'+this.id+'</a></h6><p><span id="amount_'+this.id+'">1</span>x - <span class="price">€'+price+'</span> - Total: €<span id="article_total_'+ this.id +'">'+price+'</span></p>'
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
                amount = Number(document.querySelector("#amount_" + this.id).innerHTML)
                // Sending the data of the purchase to the backend
                fetch("/addToCart", { method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        name: this.id,
                        amount
                    }),
                })
            })
        });
    }   

/************************************************ /CART ******************************************************/
    if (document.URL === "http://localhost:3000/cart") {

            if (Object.entries(data.articles)) {
                Object.entries(data.articles).forEach(entry => {
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
                    
                    article = this.id.replace("input_value_", "")
                    amount = Number(document.querySelector("#input_value_"+ article).value)
                    price = Number(document.querySelector("#price_for_total_"+ article).innerHTML.replace("€ ",""));
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
                    })
                })
            });

            document.querySelectorAll(".remove-pr a").forEach(link => {
                link.addEventListener("click", function () {
                    let article = this.id.replace("remove_product_", "");
                    document.querySelector("#"+ article + "_tr").remove();

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
    if (document.URL === "http://localhost:3000/checkout") {

        if (Object.entries(data.articles)) {
            Object.entries(data.articles).forEach(entry => {
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
        }

        const responseAPI = await fetch('https://restcountries.eu/rest/v2/all')
        const dataAPI = await responseAPI.json();
        dataAPI.forEach(element => {
            document.querySelector("#countries").insertAdjacentHTML('beforeend', "<option value="+ element.name +">"+ element.name +"</option>")
        });

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
