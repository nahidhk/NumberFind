const apilink = 'https://script.googleusercontent.com/macros/echo?user_content_key=_kEIJ1IsY0iDiysrKFfzBEuFcPGTt4aRgAIBLUa9bbxHuf86OFXYUfBaSd_K_D0DybuSDRg0jrQmHaOoz9UxGuB20-m8m6fGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIdHSUQlSKoTFyyhnzMwWUCS0XU7aCAzxVLdTxfpyZY3b0Q0clrKdp4qCeQbXNja6ETfKZQeAUZCk-wE2qT8p7K7HWFWGZw78A&lib=MOBgxagtPplI3E9XNB2hjtASW3VxzywJF';

const urlParams = new URLSearchParams(window.location.search);
const parameters = Object.fromEntries(urlParams.entries());
const phone = parameters.phone;
const myfun = parameters.f;
if (myfun) {
    window[myfun]();
}

function test() {
    alert('Hello');
}

if (phone) {
    displayData(phone);
    document.getElementById("phone").value = "0" + phone;
} else {
    const dataContainer = document.getElementById("showData");
    if (dataContainer) {
        dataContainer.innerHTML = "<i class='red'>type The mobile number</i>";
    }
}




function getOperator(phoneNumber) {
    if (typeof phoneNumber !== "string") {
        phoneNumber = phoneNumber.toString();
    }
    const operators = {
        '17': 'Grameenphone - Telenor Group',
        '13': 'Grameenphone - Telenor Group',
        '18': 'Robi Axiata Limited',
        '16': 'Airtel - Robi Axiata Limited',
        '15': 'Teletalk - Bangladesh Limited',
        '19': 'Banglalink - Digital Communications Limited',
        '14': 'Banglalink - Digital Communications Limited',
    };
    const prefix = phoneNumber.substring(0, 2);
    if (operators[prefix]) {
        return operators[prefix];
    } else {
        return 'Unknown Operator';
    }
}


async function displayData(searchInput = "") {
    try {
        const response = await fetch(apilink);
        const data = await response.json();
        const dataContainer = document.getElementById("showData");
        if (!dataContainer) {
            throw new Error("Element with id 'showData' not found.");
        }
        dataContainer.innerHTML = "";
        const filteredData = data.filter(
            (item) =>
                String(item.mobile).toLowerCase().includes(searchInput.toLowerCase())
        );
        if (filteredData.length === 0) {
            dataContainer.innerHTML = `
            
               
 <div  class="topbox">
      <blockquote>
        
        <h3 class='fff'>This Number not found !</h3>
        <p>Add this Number</p>
        <button class='btn' onclick='addProfile()'>Add This Profile</button>
      </blockquote>
      <div class="topbox bgfff">
        <blockquote>
          <span class="apx"><i class="fa-solid fa-phone"></i></span>
          <span class="apo"> <a href='tel:+880${phone}'>+880${phone}</a> <br> <span class="stikar">${getOperator(phone)}</span></span>
          <br>
          <span class="apx"><i class="fa-solid fa-location-dot"></i></span>
          <span class="apo"> Bangladesh <br> <span class="stikar">Location</span></span>
          <br>
          <span class="apx"><i class="fa-brands fa-square-whatsapp"></i></span>
          <span class="apo"> <a href='https://api.whatsapp.com/send?phone=880${phone}&text=Hello%20I%27m%20your%20number%20Find%20just%20Number%20Lookup%20!%20%0Ahttps%3A%2F%2Fnfind.vercel.app?phone=${phone}'> WhatsApp</a> <br> <span class="stikar"> WhatsApp</span></span>
        </blockquote>
      </div>
    </div>
            
            `;
            return;
        }
        filteredData.forEach((item) => {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
    
 <div  class="topbox" style="margin:4px;">
      <blockquote>
        <img class="userimg" src="${item.imgurl}" alt="">
        <h3 >${item.name}</h3>
        <p>${item.bio}</p>
        <p class='uid'>UID:(<b>${item.uid}</b>)</p>
      </blockquote>
      <div class="topbox bgfff">
        <blockquote>
          <span class="apx"><i class="fa-solid fa-phone"></i></span>
          <span class="apo"> <a href='tel:+880${item.mobile}'>+880${item.mobile}</a> <br> <span class="stikar">${getOperator(item.mobile)}</span></span>
          <br>
          <span class="apx"><i class="fa-solid fa-location-dot"></i></span>
          <span class="apo"> Bangladesh <br> <span class="stikar">Location</span></span>
          <br>
          <span class="apx"><i class="fa-regular fa-envelope"></i></span>
          <span class="apo"> <a href='mailto:${item.email}'>${item.email}</a> <br> <span class="stikar">E-mail</span></span>
          <br>
          <span class="apx"><i class="fa-brands fa-square-facebook"></i></span>
          <span  class="apo" > <a href='${item.facebookurl}'>Facebook</a> <br> <span class="stikar"> Facebook</span></span>
          <br>
          <span class="apx"><i class="fa-brands fa-square-whatsapp"></i></span>
          <span class="apo"> <a href='https://api.whatsapp.com/send?phone=${item.mobile}&text=Hello%20I%27m%20your%20number%20Find%20just%20Number%20Lookup%20!%20%0Ahttps%3A%2F%2Fnfind.vercel.app?phone=${item.mobile}'> WhatsApp</a> <br> <span class="stikar"> WhatsApp</span></span>
        </blockquote>
      </div>
    </div>
            `;
            dataContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error("data error", error);
    }
}



function validInput(event) {
    let inputField = event.target;
    let value = inputField.value;
    if (value.length > 0 && value.charAt(0) !== '0') {
        inputField.value = "";
        alert("Phone number must start with 0!");
    }
    inputField.value = value.replace(/[^0-9]/g, '');
}



function processNumber(inputData) {
    let phoneNumber = document.getElementById(inputData.inputid).value;
    if (phoneNumber.length === 0) {
        alert("Please enter a phone number starting with 0.");
        return;
    }
    if (phoneNumber.startsWith("0")) {
        phoneNumber = phoneNumber.substring(1);
    }
    window.location.href = `?phone=${phoneNumber}`

}

function addProfile() {
    window.location.href = window.location.href + "&f=joining";
}

function copyText(event) {
    let text = event.target.innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

function openLink(event) {
    let url = event.target.href;
    window.open(url, "_blank");
}

function sendWhatsApp(event) {
    let url = event.target.href;
    window.open(url, "_blank");
}

function openCall(event) {
    let url = event.target.href;
    window.open(url, "_blank");
}

function openEmail(event) {
    let url = event.target.href;
    window.open(url, "_blank");
}

function openFacebook(event) {
    let url = event.target.href;
    window.open(url, "_blank");
}

function joining() {
    document.getElementById("myjoin").style.display = "block";
    document.getElementById('phones').value = "0" + phone;
}


function shows() {
    const showmy = document.getElementById('showImg');
    const inputImg = document.getElementById('inputImg').value;

    if (showmy && inputImg) {
        showmy.src = inputImg;
    } else {
        console.error("Element not found or input is empty");
    }
}




// mobile appp custome set in 



function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}
function darkside() {
    document.getElementById("darkside").style.display = "none";
}

let os = "web";
let icon = '<i class="fa-solid fa-desktop"></i>';
if (navigator.userAgent.indexOf("Android") !== -1) {
    os = 'Android';
    icon = '<i class="fa-brands fa-google-play"></i>';
} else if (navigator.userAgent.indexOf("Windows") !== -1) {
    os = 'Windows';
    icon = '<i class="fa-brands fa-windows"></i>';
} else if (navigator.userAgent.indexOf("Mac") !== -1) {
    os = 'macOS';
    icon = '<i class="fa-brands fa-apple"></i>';
} else if (navigator.userAgent.indexOf("Linux") !== -1) {
    os = 'Linux';
    icon = '<i class="fa-brands fa-linux"></i>';
} else if (navigator.userAgent.indexOf("iPhone") !== -1 || navigator.userAgent.indexOf("iPad") !== -1) {
    os = 'iOS';
    icon = '<i class="fa-brands fa-apple"></i>';
}
if (getCookie("install") == "true") {
    document.getElementById('nanBtn').classList="vcc";
} else {
   
    document.getElementById("rooting").innerHTML = `
        <div id="darkside">
        <div class="darkside flex anaround">  
        <div>  
        <br><br><br>
            <div class='popup'>
                <button onclick="darkside()" style='background-color:red;color:#fff;' class="btn"><i class="fa-solid fa-xmark"></i></button>
                <center>
                    <h3>Download PAW</h3>
                    <hr>
                   <span style="font-size:5rem;">${icon}</span> <br> <span style="font-size:15pt;">Install the app on your ${os} device to launch it easily. <span>
                    <button class="btn ins" id="installBtn">Install ${os} App</button>
                </center>
                <br>
                </div>
            </div>
            </div>
        </div>`;
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'block';
    document.getElementById('installBtn').addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                function setCookie(name, value, days) {
                    let date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + date.toUTCString();
                    document.cookie = name + "=" + value + "; " + expires + "; path=/";
                }
                setCookie('install', 'true', 365);
                window.location.href = "/"
            } else {
                console.log('User dismissed the install prompt');
                setCookie("install", flase);
            }
            deferredPrompt = null;
        });
    });
});

 function saveinfo(){
    const myform = document.getElementById('fromx');
    const myname = document.getElementById('myname').value;
    const imgurl = document.getElementById('inputImg').value;
    const mybio = document.getElementById('mybio').value;
    const email = document.getElementById('email').value;
    const fburl = document.getElementById('fburl').value;
    if (myname && imgurl && mybio && email && fburl) {
        myform.action="https://script.google.com/macros/s/AKfycbyIhGL3pjSewLk-hYcdyIOzxBNy7Xrpxpax7pXSOhh7gRQfYoJRsZDcFCTMfVwtnLGG/exec";
        myform.method="post";
        myform.submit();
        setTimeout(reloadio, 500)
    } else {
      const mycon =  confirm('You Not Input Data! Reload and try agin');
      if(mycon === true){
        location.reload()
      }
    }
 }

function reloadio(){
    window.location.href=`/?phone=${phone}`;
}




