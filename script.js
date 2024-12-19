const apilink = 'https://script.googleusercontent.com/macros/echo?user_content_key=_kEIJ1IsY0iDiysrKFfzBEuFcPGTt4aRgAIBLUa9bbxHuf86OFXYUfBaSd_K_D0DybuSDRg0jrQmHaOoz9UxGuB20-m8m6fGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIdHSUQlSKoTFyyhnzMwWUCS0XU7aCAzxVLdTxfpyZY3b0Q0clrKdp4qCeQbXNja6ETfKZQeAUZCk-wE2qT8p7K7HWFWGZw78A&lib=MOBgxagtPplI3E9XNB2hjtASW3VxzywJF';
function searchData() {
    const name = document.getElementById('name').value.toLowerCase();
    const fname = document.getElementById('fname').value.toLowerCase();
    const gram = document.getElementById('gram').value.toLowerCase();
    const search = document.getElementById('search').value.toLowerCase();
    displayData({ name, fname, gram, search });
}
async function displayData(filters = {}) {
    try {
        const response = await fetch(apilink);
        const data = await response.json();
        const dataContainer = document.getElementById("app");
        if (!dataContainer) {
            throw new Error("Element with id 'app' not found.");
        }
        dataContainer.innerHTML = "";
        const filteredData = data.filter((item) => {
            const matchesName = item.name.toLowerCase().includes(filters.name || "");
            const matchesFname = item.fname.toLowerCase().includes(filters.fname || "");
            const matchesGram = item.vlg.toLowerCase().includes(filters.gram || "");
            const matchesPara = item.para.toLowerCase().includes(filters.para || "");
            const matchesSearch = (
                item.name.toLowerCase().includes(filters.search || "") ||
                item.fname.toLowerCase().includes(filters.search || "") ||
                item.vlg.toLowerCase().includes(filters.search || "") ||
                item.para.toLowerCase().includes(filters.search || "") ||
                (typeof item.mobile === "string" && item.mobile.toLowerCase().includes(filters.search || "")) ||
                item.work.toLowerCase().includes(filters.search || "")
            );

            return matchesName && matchesFname && matchesGram && matchesPara && matchesSearch;
        });

        filteredData.forEach((item) => {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
                <tr class="animate__bounceIn  animate__animated">
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

displayData();
function nodatepas() {
    const name = document.getElementById('name');
    const fname = document.getElementById('fname');
    name.addEventListener('input', function () {
        document.getElementById('v1').style.display = "block";
    });
    fname.addEventListener('input', function () {
        document.getElementById('v2').style.display = "block";
    });
}
nodatepas();

function yuoip() {
    fetch(apilink)
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('namedata');
            const dataList1 = document.getElementById('fnamedata');
            const dataList2 = document.getElementById('garamdata');
            const dataList3 = document.getElementById('workdata');
            const dataList4 = document.getElementById('paradata');
            data.forEach(item => {
                const option1 = document.createElement('option');
                option1.value = item.name;
                dataList.appendChild(option1);
            });
            data.forEach(item => {
                const option2 = document.createElement('option');
                option2.value = item.fname;
                dataList1.appendChild(option2);
            });
            const uniqueVlg = new Set();
            data.forEach(item => {
                uniqueVlg.add(item.vlg); 
            });
            uniqueVlg.forEach(vlg => {
                const option3 = document.createElement('option');
                option3.value = vlg;
                dataList2.appendChild(option3);
            });
            const uniqueVlg1 = new Set();
            data.forEach(item => {
                uniqueVlg1.add(item.para); 
            });
            uniqueVlg1.forEach(para => {
                const option4 = document.createElement('option');
                option4.value = para;
                dataList4.appendChild(option4);
            });

            const uniqueVlg2 = new Set();
            data.forEach(item => {
                uniqueVlg2.add(item.work); 
            });
            uniqueVlg2.forEach(work => {
                const option3 = document.createElement('option');
                option3.value = work;
                dataList3.appendChild(option3);
            });

        })
        .catch(error => console.error('Error fetching data:', error));
}

yuoip();
function ckpt() {
    const mobile = document.getElementById('mobile').value;
    console.log(mobile);

}
function opencsv() {
    document.getElementById('csv').style.display = 'flex';
}

function loadajson() {
    fetch(apilink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('jsonData', JSON.stringify(data));
        })
        .catch(error => console.error('Error loading JSON data:', error));
};


