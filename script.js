
async function displayData(searchInput = "") {

    try {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=_kEIJ1IsY0iDiysrKFfzBEuFcPGTt4aRgAIBLUa9bbxHuf86OFXYUfBaSd_K_D0DybuSDRg0jrQmHaOoz9UxGuB20-m8m6fGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIdHSUQlSKoTFyyhnzMwWUCS0XU7aCAzxVLdTxfpyZY3b0Q0clrKdp4qCeQbXNja6ETfKZQeAUZCk-wE2qT8p7K7HWFWGZw78A&lib=MOBgxagtPplI3E9XNB2hjtASW3VxzywJF");
        const data = await response.json();
        const dataContainer = document.getElementById("app");
        if (!dataContainer) {
            throw new Error("Element with id 'app' not found.");
        }

        dataContainer.innerHTML = "";


        const filteredData = data.filter(
            (item) =>
                item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.fname.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.vlg.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.para.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.mobile.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.work.toLowerCase().includes(searchInput.toLowerCase()) 
        
      );



        filteredData.forEach((item) => {

            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
    <tr>
                            <td>${item.name}</td>
                            <td>${item.fname}</td>
                            <td>${item.work}</td>
                            <td>${item.vlg} - ${item.para}</td>
                            <td><a href='tel:+880${item.mobile}'> +880 ${item.mobile}</a></td>
                        </tr>
     
              `;

            dataContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error("data error", error);
    }
}


function searchData() {
    const searchInput1 = document.querySelector("#search").value;
    const name = document.getElementById('name').value;
    const fname = document.getElementById('fname').value;
    displayData(searchInput1);
    window.location.href = "#" + searchInput1;
}

displayData();


function opencsv() {
    document.getElementById('csv').style.display = 'flex';
}


