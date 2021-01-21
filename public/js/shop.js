if (document.URL === "http://localhost:3000/shop" || document.URL === "https://e-shop-lamotte.herokuapp.com/shop") {
    const shop = async () => {
        try {
            let response = await fetch('/products', { method: "POST" })
            let prices_and_images = await response.json();
            document.querySelector('#quantity-products').innerHTML = Object.keys(prices_and_images).length
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
                            <img src="`+image+`" class="img-fluid" alt="Image">
                            <div class="mask-icon">
                                <a id="`+key+`" class="cart" >Add to Cart</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>`+key+`</h4>
                            <h5> €`+price+`</h5>
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
                                <a class="btn hvr-hover cart ${key}" href="#">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>`)
            })
            document.querySelectorAll('.cart').forEach(element => {
                element.href = "/login-register";
            })
        } catch (e) {
            console.log(e)
        }
    }

    shop()
}