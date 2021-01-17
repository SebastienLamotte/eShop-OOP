document.querySelector('#btn-newsletter').addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.querySelector("#email-newsletter").value;
    console.log(email)
    fetch("/newsletter", {
    method: "POST",
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({
        email
    }),
    })
    .then((response)=> response.json())
    .then((data)=> {
        alert(data.message)
    }) 
});