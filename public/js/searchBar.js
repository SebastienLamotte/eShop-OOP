document.querySelector("#search-bar").addEventListener("keydown", async (e)=> {
    try{
        if (e.keyCode === 13) {
            
            const response_page_names = await fetch('/search', { method: "POST" });
            const page_names = await response_page_names.json();
            let found = [];
            const parser = new DOMParser();
            for (let hash of page_names.array) {
                try {
                    let foundPerPage = [];
                    let page = 'http://localhost:3000/'+hash
                    let response_html = await fetch(page);
                    let html = await response_html.text();
                    let doc = parser.parseFromString(html, 'text/html');
                    found.push('<h2 class="text-center">'+ hash +'</h2>')
                    doc.querySelectorAll("div").forEach(div => {
                        if (div.innerText.trim() !== ""){
                            if (div.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {           
                                if (found.length !== 0) {
                                    if (found[found.length-1].includes(div.innerHTML)) {
                                        found.pop()
                                    }
                                    div.setAttribute("class", hash);
                                    found.push(div.outerHTML.trim());
                                    foundPerPage.push(div);
                                } else {
                                    div.setAttribute("class", hash);
                                    found.push(div.outerHTML.trim());
                                    foundPerPage.push(div)
                                }
                            }
                        }
                    })
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
                    document.querySelector("#ul_modal").insertAdjacentHTML("beforeend",'<li>'+ element +'</li> <hr>');
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