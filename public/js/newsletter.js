// function validate(inputID)
// {
//  var input = document.getElementById(inputID);
//  var validityState_object = input.validity;

//  if (validityState_object.valueMissing)
//  {
//   input.setCustomValidity('You gotta fill this out, yo!');
//   input.reportValidity();
//  }
//  else if (validityState_object.rangeUnderflow)
//  {
//   input.setCustomValidity('We need a higher number!');
//   input.reportValidity();
//  }
//  else if (validityState_object.rangeOverflow)
//  {
//   input.setCustomValidity('Thats too high!');
//   input.reportValidity();
//  }
//  else
//  {
//   input.setCustomValidity('');
//   input.reportValidity();
//  }
// }


// document.querySelector('#btn-newsletter').addEventListener("click", (e) => {
//     e.preventDefault();
//     validate("email-newsletter")
//     // let email = document.querySelector("#email-newsletter");
//     // if (email.checkValidity() && email.value !== "") {
//     //   fetch("/test", {
//     //     method: "POST",
//     //     headers: {"Content-type": "application/json; charset=UTF-8"},
//     //     body: JSON.stringify({
//     //         test: email.value
//     //     }),
//     //   }).then((response)=> response.json()).then((data)=> {
//     //     console.log(data)
//     //   })
//     // }
//     // emailValidity = email.validity;
//     // if (emailValidity.valueMissing) {
//     //   email.setCustomValidity('You gotta fill this out, yo!');
//     //   input.reportValidity();
//     // }

//     // console.log(email.validity);   
// });