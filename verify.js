const url = new URL(window.location.href);
const phone = url.searchParams.get('phone');
if (phone) {
   document.write("Hello, +880" + phone + " is processing please wait  a moment !");
    
} else {
    const dataContainer = document.getElementById("showData");
    if (dataContainer) {
       document.write("no Data Fund !")
    }
}


function appletust(){
    fetch('/api/landapi.php')
        .then((response) => response.json())
        .then((data) => {
            let found = false;
            data.forEach((item) => {
                if (item.id === phone) {                 
                   alert('Data Found');
                }
            });
            if (!found) {
               alert('Data Not Found');
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        });
  }
  