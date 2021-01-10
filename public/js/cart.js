
let imgs = {
    Carrots: "images/img-pro-01.jpg",
    Tomatoes: "images/img-pro-02.jpg",
    Grapes: "images/img-pro-03.jpg",
    Beets: "images/big-img-01b.jpg",
    Papayas: "images/big-img-02b.jpg",
    Strawberries: "images/instagram-img-08b.jpg",
    Pumpkins: "images/instagram-img-07b.jpg",
    Cucumbers: "images/gallery-img-01b.jpg",
    GreenLentils: "images/gallery-img-06b.jpg"
}

let prices = {
    Carrots: 1.38,
    Tomatoes: 2.16,
    Grapes: 3.83,
    Beets: 1.44,
    Papayas: 3.45,
    Strawberries: 12.60,
    Pumpkins: 1.58,
    Cucumbers: 2.39,
    GreenLentils: 4.83
}



//********************************************* SHOP **************************************************/
if (document.URL === "http://localhost:3000/shop") {

    fetch('/initCart', {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({}),
        }).then((response)=> response.json()).then((data)=> {
            if (Object.entries(data.articles)) {
                Object.entries(data.articles).forEach(entry => {
                    let [key, value] = entry;

                    const price = Number(document.querySelector("#" + key).parentNode.parentNode.parentNode.querySelector(".why-text h5").innerHTML.replace("€", ""));
                    let total = Number(document.querySelector("#price-total").innerHTML)
                    document.querySelector("#price-total").innerHTML = (price*value + total).toFixed(2);
                    const li = document.createElement("li");
                    li.setAttribute("id", key + "_li");
                    const img = imgs[key];
                    li.innerHTML = '<a href="/shop-detail" class="photo"><img src='+ img +' class="cart-thumb" alt="" /></a><h6><a href="/shop-detail">'+ key +'</a></h6><p><span id="amount_'+ key +'">'+ value +'</span>x - <span class="price">€'+ price +'</span> - Total: €<span id="article_total_'+key+'">'+ (price*value).toFixed(2) +'</span></p>'
                    document.querySelector(".cart-list").insertBefore(li, document.querySelector(".total") )
                    document.querySelector(".badge").innerHTML = Number(document.querySelector(".badge").innerHTML) + value
                });
            }
            
        })


    document.querySelectorAll('.cart').forEach(element => {
        element.addEventListener("click", function (e) {
            
            // Setup for the price cart-side part
            const price = Number(this.parentNode.parentNode.parentNode.querySelector(".why-text h5").innerHTML.replace("€", ""));
            let total = Number(document.querySelector("#price-total").innerHTML)
            document.querySelector("#price-total").innerHTML = (price + total).toFixed(2);
            
            // Setup to insert the new item in the cart-sidebar
            if (document.querySelector("#" + this.id + "_li")) {
                let amount = Number(document.querySelector("#amount_" + this.id).innerHTML)
                amount ++
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
            console.log({name: this.id, amount}, "name & amount")
            // Sending the data of the purchase to the backend
            fetch("/addToCart", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({
                    name: this.id,
                    amount
                }),
                }).then((response)=> response.json()).then((data)=> {
                    // console.log(data)
                })
        })
    });
}


/************************************************ CART ******************************************************/
if (document.URL === "http://localhost:3000/cart") {

    fetch('/initCart', {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({}),
    }).then((response)=> response.json()).then((data)=> {
        console.log(data)
        if (Object.entries(data.articles)) {
            Object.entries(data.articles).forEach(entry => {
                let [key, value] = entry;

                const tr = document.createElement("tr");
                tr.setAttribute("id", key + "_tr");
                const img = imgs[key]

                tr.innerHTML = '<td class="thumbnail-img"><a href="#"><img class="img-fluid" src='+ img +' alt="" /></a></td><td class="name-pr"><a href="#">'+key+'</a></td><td class="price-pr"><p id="price_for_total_'+ key +'">€ '+ prices[key] +'</p></td><td class="quantity-box"><input id="input_value_'+ key +'" type="number" size="4" value="'+ value +'" min="0" step="1" class="c-input-text qty text"></td><td class="total-pr"><p id="total_'+ key +'">€ '+ (value*prices[key]).toFixed(2) +'</p></td><td class="remove-pr"><a id="remove_product_'+key+'" style="color: black; cursor: pointer" ><i class="fas fa-times"></i></a></td>'
                document.querySelector('#check_purchase').insertBefore(tr, null)

                let subtotal = 0;
                document.querySelectorAll(".total-pr p").forEach(element => {
                    subtotal += Number(element.innerHTML.replace("€ ",""));
                });

                document.querySelector("#subTotal").innerHTML = subtotal.toFixed(2);
                document.querySelector("#grandTotal").innerHTML= subtotal.toFixed(2)
            });
        }

        document.querySelectorAll("table input").forEach(element => {
            element.addEventListener("change", function (e) {
                
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

                fetch('/changeQuant', {
                    method: "POST",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        article,
                        amount
                    }),
                }).then((response)=> response).then((data)=> {
                    // console.log(data);
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

                fetch('/changeQuant', {
                    method: "POST",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        article,
                        amount:0
                    }),
                }).then((response)=> response).then((data)=> {
                    // console.log(data);
                })
            })
        })
    })

    
}







