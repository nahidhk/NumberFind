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
console.log(apilink);

yuoip();
function ckpt() {
    console.log(apilink);
    const errors = document.getElementById('errors');
    const mobile = document.getElementById('mobile').value;
    const subtn = document.getElementById('subtn');
    // Validate mobile number length
    if (mobile.length !== 11 || !mobile.startsWith('01')) {
        errors.innerHTML = "মোবাইল নাম্বার সঠিক নয় । 11 ডিজিট হতে হবে । '01XXXXXXXXX' এই ফরম্যাট অনুযায়ী দিন ।";
        subtn.disabled = true;
        subtn.style.backgroundColor = "gray";
        return false;
    } else {
        subtn.disabled = false;
        subtn.style.backgroundColor = "#007bff";
        subtn.type = "submit";
        errors.innerHTML = "";
    }
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







