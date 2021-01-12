if (document.URL === "http://localhost:3000/address") {  
    const address = async () => {
        const responseAPI = await fetch('https://restcountries.eu/rest/v2/all')
        dataAPI = await responseAPI.json()
        dataAPI.forEach(element => {
            document.querySelector("#countries").insertAdjacentHTML('beforeend', "<option value="+ element.name +">"+ element.name +"</option>")
        });
    }

    address();
}