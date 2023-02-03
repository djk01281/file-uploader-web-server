const dlBtn = document.querySelector(".btn-dl");
const output = document.querySelector(".output")
output.innerText = "dadawd"
const paths = window.location.pathname.split('/');
const id = paths[paths.length - 1]

output.innerText = id
dlBtn.addEventListener("click", async () => {
  console.log("clicked");

  //get the ID from URL


  //get the URL from API
  const downloadURL = `/api/download/${id}`;
  const response = await fetch(downloadURL)
  const url = await response.text();

  //create link to file and attach to output

  const link = document.createElement("a");
  link.innerText = 'Download'
  link.href = url
  link.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
});
