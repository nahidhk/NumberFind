const apilink = 'https://script.googleusercontent.com/macros/echo?user_content_key=_kEIJ1IsY0iDiysrKFfzBEuFcPGTt4aRgAIBLUa9bbxHuf86OFXYUfBaSd_K_D0DybuSDRg0jrQmHaOoz9UxGuB20-m8m6fGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIdHSUQlSKoTFyyhnzMwWUCS0XU7aCAzxVLdTxfpyZY3b0Q0clrKdp4qCeQbXNja6ETfKZQeAUZCk-wE2qT8p7K7HWFWGZw78A&lib=MOBgxagtPplI3E9XNB2hjtASW3VxzywJF';

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

const url = new URL(window.location.href);
const phone = url.searchParams.get('phone');
if (phone) {
    displayData(phone);
    document.getElementById("phone").value = phone;
} else {
    const dataContainer = document.getElementById("showData");
    if (dataContainer) {
        dataContainer.innerHTML = "<i class='red'>type The mobile number</i>";
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
        <button class='btn' onclick='addProfile'>Add Profile</button>
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
    
 <div  class="topbox">
      <blockquote>
        <img class="userimg" src="${item.imgurl}" alt="">
        <h3 class='fff'>${item.name}</h3>
        <p>${item.bio}</p>
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




  function only10(data10) {
   const inputids = document.getElementById(data10.inputid);
   const rids = document.getElementById(data10.rid);
    if (inputids.value.length > 10) {
     document.getElementById(data10.rid).style.border='1px solid red';
      document.getElementById(data10.rid).style.boxShadow='0 0 10px 0 red'
      rids.innerHTML=`<button onclick='reloadjs()' type='button' class='btn'>Reload</button>`
      document.getElementById('err_log').innerHTML=`<i>This Mobile Number is Invalid , try again (171234567890) not type '0' in Fast Number! Reload and try again.</i>`
    }
  }

function reloadjs(){
   window.location.reload();
}