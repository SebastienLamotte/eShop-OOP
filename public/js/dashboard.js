document.querySelectorAll('input[type="image"]').forEach(element => {
    const inputFile = element.parentElement.nextElementSibling.children[0];

    inputFile.addEventListener('change', () => {
        element.src = inputFile.value.replace('C:\\fakepath\\', 'images/')
    })

    element.addEventListener('click', () => {
        inputFile.click(); 
    })
});

document.querySelectorAll('table input').forEach(input => {
    // const td = input.parentElement;
    input.addEventListener('change', (e)=> {
        const property = ["product", "price", "image", "_id"];
        const objectToSend = {};
        console.log('.'+input.className);
        const tds = document.querySelectorAll("."+ input.className);
        let indexInput =0;
        let indexProperty = 0;
        const length = property.length;
        while (indexInput<length) {
            if (tds[indexInput].type ==="file"){
                indexInput++
            }
            if (tds[indexInput].value !=='') {
                objectToSend[property[indexProperty]]=tds[indexInput].value
                indexInput++
                indexProperty++
            }else {
                objectToSend[property[indexProperty]]=tds[indexInput].src.replace('http://localhost:3000/','')
                indexInput++
                indexProperty++
            }
        }
        console.log(objectToSend);
        
        fetch('/changeProducts', { method: 'POST', headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(objectToSend)
        })
            .then(response=>console.log(response))
            // .then((data) => {
            //     console.log(data);
            // })
    })
});
