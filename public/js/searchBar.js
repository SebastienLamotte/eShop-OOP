document.querySelector("#search-bar").addEventListener("keydown", async (e)=> {
    try{

        if (e.keyCode === 13) {

            const response = await fetch('/products', {method: 'POST'})
            const products = await response.json();
            const response_page_names = await fetch('/search', { method: "POST" });
            const page_names = await response_page_names.json();
            let found = [];
            const parser = new DOMParser();
            const headerFooter = ['.main-top','.main-header','.top-search','.instagram-box','footer','.footer-copyright']
            headerFooter.forEach(div => {
                
            });
            for (let hash of page_names.array) {
                try {
                    let foundPerPage = [];
                    let page = 'http://localhost:3000/'+hash
                    let response_html = await fetch(page);
                    let html = await response_html.text();
                    let doc = parser.parseFromString(html, 'text/html');
                    headerFooter.forEach(divName => {
                        doc.querySelector(divName).remove()
                    });
                    doc.querySelector('#exampleModal').remove()
                    found.push('<h2 class="text-center h1">'+ hash.toUpperCase() +'</h2><hr>')
                    if (hash === "shop") {
                        Object.entries(products).forEach(entries => {
                            const [key, value] = entries
                            const {price, image} = products[key]
                            if (key.toLowerCase().includes(e.target.value.toLowerCase().trim())) {
                                found.push(`
                                <div>
                                    <div class="products-single fix">
                                        <div class="box-img-hover">
                                            <img src="`+image+`" class="img-fluid" alt="Image">
                                        </div>
                                        <div class="why-text">
                                            <h4>`+key+`</h4>
                                            <h5> €`+price+`</h5>
                                        </div>
                                    </div>
                                </div>`)
                                foundPerPage.push('div')
                            }  
                        })
                    } else {
                        doc.querySelectorAll("div").forEach(div => {
                            if (div.innerText.trim() !== ""){
                                if (div.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {           
                                    if (found.length !== 0) {
                                        if (found[found.length-1].includes(div.innerHTML)) {
                                            found.pop()
                                        }
                                        if (!div.innerText.toLowerCase().includes("cart")){
                                            found.push(div.outerHTML.trim());
                                            foundPerPage.push(div);
                                        }
                                    } else {
                                        if (!div.innerText.toLowerCase().includes("cart")){
                                            found.push(div.outerHTML.trim());
                                            foundPerPage.push(div)
                                        }
                                    }
                                }
                            }
                        })
                    }
                    if (foundPerPage.length === 0 ){
                        found.pop()
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            found = [... new Set(found)]
            document.querySelector("#ul_modal").innerHTML = '';
            $('#exampleModal').modal('show')
            if (found.length === 0) {
                document.querySelector("#ul_modal").insertAdjacentHTML("beforeend", '<li><h2 class="text-center">No result</h2></li>');
            } else {
                found.forEach(element => {
                        document.querySelector("#ul_modal").insertAdjacentHTML("beforeend",'<li class="my-4">'+ element +'</li><hr>');
                });
            }
            const responseFound = await fetch('/found', { method: 'POST', headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(found)
            })
        }
    } catch(e) {
        console.log('error', e);
    } 
});