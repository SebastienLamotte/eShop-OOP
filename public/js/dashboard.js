let nbRow = document.querySelectorAll('tbody tr').length;


document.querySelectorAll('input[type="image"]').forEach(element => {
    const inputFile = element.parentElement.parentElement.children[5].firstElementChild
    inputFile.addEventListener('change', () => {
        element.src = inputFile.value.replace('C:\\fakepath\\', 'images/')
    })

    element.addEventListener('click', () => {
        inputFile.click(); 
    })
});

document.querySelectorAll('table input').forEach(input => {

    input.addEventListener('change', (e)=> {
        const property = ["product", "price", "image", "_id"];
        const objectToSend = {};
        const tds = document.querySelectorAll("."+ input.className);
        let allFilled = true;

        for (let i = 0; i<property.length; i++) {
            if (tds[i].value !=='') {
                objectToSend[property[i]]=tds[i].value
            } else if (tds[i].src !== '') {
                objectToSend[property[i]]=tds[i].src.replace('http://localhost:3000/','')
            } else {
                allFilled = false;
            }
        }
        console.log(objectToSend)
        if (allFilled) {
            fetch('/changeProducts', { method: 'POST', headers: {"Content-type": "application/json; charset=UTF-8"}, body: JSON.stringify(objectToSend)})
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
        }
        
    })
});

document.querySelector('#btnAddRow').addEventListener('click', (e) => {
    e.preventDefault();
    let lastRowFilled = true;


    for (let i=0; i<4; i++) {
        if (document.querySelectorAll('tbody tr')[nbRow-2].querySelectorAll('input')[i].value === "" && 
        document.querySelectorAll('tbody tr')[nbRow-2].querySelectorAll('input')[i].src === "") {
            lastRowFilled = false;
        }
    }
    
    if (lastRowFilled){
        document.querySelector('#last-tr').insertAdjacentHTML('beforebegin', `
        <tr>
            <th scope="row">${document.querySelectorAll('tbody tr').length}</th>
            <td><input type="text" value=""></td>
            <td><input type="text" value=""></td>
            <td><input type="image" src="images/apple-touch-icon.png" width="50"></td>
            <td><input type="text" value="" readonly></td>
            <td><input style="display:none;" type="file"></td>
        </tr>`)
        lastRowFilled = false;
        nbRow++
    }

    let inputFile = document.querySelectorAll('tbody tr')[nbRow-2].querySelectorAll('input')[4]
    let inputImage = document.querySelectorAll('tbody tr')[nbRow-2].querySelectorAll('input')[2]

    inputFile.addEventListener('change', () => {
        inputImage.src = inputFile.value.replace('C:\\fakepath\\', 'images/')
    })

    inputImage.addEventListener('click', () => {
        inputFile.click(); 
    })

    const tds = document.querySelectorAll('tbody tr')[nbRow-2].querySelectorAll('input')
    let actualImage = tds[2].src
    tds.forEach(input => {
        input.addEventListener('change', (e) => {
            
            const property = ["product", "price", "image", "_id"];
            const objectToSend = {};
            let notFilled = [];
            console.log(actualImage);
            for (let i=0 ; i<4; i++) {
                if (tds[i].value !=='') {
                    objectToSend[property[i]]=tds[i].value
                } else if (tds[i].src !=='' && tds[i].src !== actualImage) {
                    objectToSend[property[i]]=tds[i].src.replace('http://localhost:3000/','')
                } else {
                    notFilled.push(tds[i]);
                }
            }
            console.log(objectToSend)
            if (notFilled[0] && notFilled[0].readOnly) {
                fetch('/changeProducts', { method: 'POST', headers: {"Content-type": "application/json; charset=UTF-8"}, body: JSON.stringify(objectToSend)})
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    tds[3].value = data._id
                })
            }
        })
    })

})

document.querySelectorAll('td a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const tr = a.parentElement.parentElement
        const _id = tr.querySelector('[readonly]').value;
        tr.remove()
        fetch('/removeProduct', { method: 'POST', headers: {"content-type": "application/json; charset=UTF-8"}, body: JSON.stringify({ _id })})
    })
})