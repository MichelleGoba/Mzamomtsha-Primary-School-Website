
const form = document.getElementById('form');
const FullName = document.getElementById('fullname');
const Surname = document.getElementById('surname');
const nationality = document.getElementById('nationality');
const IdNumber = document.getElementById('ID Number');
const Vacancy = document.getElementById('vacancy');
const Qualifications = document.getElementById('qualifications');
const Availability = document.getElementById('availability');
const Residential = document.getElementById('residential');
const Postal= document.getElementById('postal');
const Contact= document.getElementById('contact');
const email = document.getElementById('email');


//Show input error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}


//show success colour
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// Phone number validation
// function validatePhoneNumber(input_str) {
//   var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//   return re.test(input_str);
// }

function validateForm(event) {
  var phone = document.getElementById('contact').value;
  if (!validatePhoneNumber(phone)) {

      document.getElementById('phone_error').classList.remove('hidden');
  } else {

      // document.getElementById('phone_error').classList.add('hidden');  
      alert("validation success")
  }
  // event.preventDefault();

}
document.getElementById('contact').addEventListener('submit', validateForm);


//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) {
      showSucces(input)
  }else {
      showError(input,'Email is not invalid');  
  }
}
//checkRequired fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input){
      if(input.value.trim() === ''){
          showError(input,`${getFieldName(input)} is required`)
      }else {
          showSucces(input);
      }
  });
}
//check input Length
function checkLength(input, min ,max) {
  if(input.value.length < min) {
      showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  }else if(input.value.length > max) {
      showError(input, `${getFieldName(input)} must be les than ${max} characters`);
  }else {
      showSucces(input);
  }
}
//get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit',function(e) {
  e.preventDefault();

  checkRequired([fullname, surname, IdNumber, contact, email, qualifications, residential,]);
  checkEmail(email);
  checkLength(fullName,3,15);
  checkLength(surname,3,25);


});


// // CV file reader start
// function onfilechange(evt) {
//   var selFile = evt.target.files[0];
//   var reader = new FileReader();
//   reader.onloadend = function (e) {
//       console.log(e);
//       console.log(new Int8Array(e.target.result));
//   };
//   reader.readAsArrayBuffer(selFile);
// }
// document.getElementById('file').addEventListener('change', onfilechange);
// // CV file reader end


// Reads the size of the files
const uploadInput = document.getElementById("uploadInput");
  uploadInput.addEventListener(
    "change",
    () => {
      // Calculate total size
      let numberOfBytes = 0;
      for (const file of uploadInput.files) {
        numberOfBytes += file.size;
      }

      // Approximate to the closest prefixed unit
      const units = [
        "B",
        "KiB",
        "MiB",
        "GiB",
        "TiB",
        "PiB",
        "EiB",
        "ZiB",
        "YiB",
      ];
      const exponent = Math.min(
        Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
        units.length - 1
      );
      const approx = numberOfBytes / 1024 ** exponent;
      const output =
        exponent === 0
          ? `${numberOfBytes} bytes`
          : `${approx.toFixed(3)} ${
              units[exponent]
            } (${numberOfBytes} bytes)`;

      document.getElementById("fileNum").textContent =
        uploadInput.files.length;
      document.getElementById("fileSize").textContent = output;
    },
    false
  );

 // CV
 function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  
}

//  function readFile(input) {
//   let file = input.files[0];

//   alert(`File name: ${file.name}`); // e.g my.png
//  }
 
 //  function readFile(input) {  // This line defines a new function named readFile that takes a single parameter named input.
//   let file = input.files[0];  // This line gets the first file that the user has selected in the input element and assigns it to a variable named file.
//   let reader = new FileReader();

//   alert(`File name: ${file.name}`); // This line displays an alert box with the filename of the file object. 
//  }

 // Matric certificate
 function readFile(input) {
  let file = input.files[0]  //reads from the first file selected

  let reader = new FileReader();

  reader.readAsText(file); // insterted or loaded file will be read as text

  reader.onload = function() {  //sets up an event handler that is called when the file has been successfully loaded.

    console.log(reader.result);
  };

  reader.onerror = function() { // sets up an event handler that is called when an error occurs during the file reading operation.

    console.log(reader.error);

  };


}

// sending a form with a file
formElem.onsubmit = async (e) => {
  e.preventDefault();

  let response = await fetch('/article/formdata/post/user-avatar', {   // This line sends a POST request to the URL /article/formdata/post/user-avatar using the fetch function. The fetch function returns a Promise that resolves to a Response object. By using the await keyword, the code waits for the Promise to resolve before continuing.
    method: 'POST',
    body: new FormData(formElem)
  });

  let result = await response.json();  // 

  alert(result.message);
};

