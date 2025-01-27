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
} else {
    const dataContainer = document.getElementById("showData");
    if (dataContainer) {
        dataContainer.innerHTML = "<tr><td colspan='5'>Phone is not found.</td></tr>";
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
            dataContainer.innerHTML = "<tr><td colspan='5'>Phone is not found.</td></tr>";
            return;
        }
        filteredData.forEach((item) => {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
    
 <div  class="topbox">
      <blockquote>
        <img class="userimg" src="/img/icon.png" alt="">
        <h3>${item.name}</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </blockquote>
      <div class="topbox bgfff">
        <blockquote>
          <span class="apx"><i class="fa-solid fa-phone"></i></span>
          <span class="apo">+880${item.mobile} <br> <span class="stikar">${getOperator(item.mobile)}</span></span>
          <br>
          <span class="apx"><i class="fa-solid fa-location-dot"></i></span>
          <span class="apo">Bangladesh <br> <span class="stikar">Loction</span></span>
          <br>
          <span class="apx"><i class="fa-regular fa-envelope"></i></span>
          <span class="apo">nahidappltd@gmail.com <br> <span class="stikar">E-mail</span></span>
          <br>
          <span class="apx"><i class="fa-brands fa-square-facebook"></i></span>
          <span  class="apo" >nahid.td <br> <span class="stikar"> Facebook</span></span>
          <br>
          <span class="apx"><i class="fa-brands fa-square-whatsapp"></i></span>
          <span class="apo">nahid.td <br> <span class="stikar"> WhatsApp</span></span>
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
