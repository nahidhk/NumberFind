const apilink = 'https://script.googleusercontent.com/macros/echo?user_content_key=_kEIJ1IsY0iDiysrKFfzBEuFcPGTt4aRgAIBLUa9bbxHuf86OFXYUfBaSd_K_D0DybuSDRg0jrQmHaOoz9UxGuB20-m8m6fGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIdHSUQlSKoTFyyhnzMwWUCS0XU7aCAzxVLdTxfpyZY3b0Q0clrKdp4qCeQbXNja6ETfKZQeAUZCk-wE2qT8p7K7HWFWGZw78A&lib=MOBgxagtPplI3E9XNB2hjtASW3VxzywJF';

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

        // Filter data based on the phone number
        const filteredData = data.filter(
            (item) =>
                String(item.mobile).toLowerCase().includes(searchInput.toLowerCase())
        );

        // If no data found, show "Phone is not found"
        if (filteredData.length === 0) {
            dataContainer.innerHTML = "<tr><td colspan='5'>Phone is not found.</td></tr>";
            return;
        }

        // Render filtered data
        filteredData.forEach((item) => {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
                <tr class="animate__bounceIn animate__animated">
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
