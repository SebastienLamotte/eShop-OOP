if (document.URL === "http://localhost:3000/shop" || document.URL === "https://e-shop-lamotte.herokuapp.com/shop") {
    const shop = async () => {
        try {
            let response = await fetch('/products', { method: "POST" })
            let prices_and_images = await response.json();
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
                                <ul>
                                    <li><a data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye text-white"></i></a></li>
                                    <li><a data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt text-white"></i></a></li>
                                    <li><a data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart text-white"></i></a></li>
                                </ul>
                                <a id="`+key+`" class="cart" >Add to Cart</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>`+key+`</h4>
                            <h5> €`+price+`</h5>
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