const output = document.querySelector(".output");
const fileInput = document.querySelector(".input-file");
const submitBtn = document.querySelector(".btn-submit");
const fileForm = document.querySelector(".form-file")
fileForm.addEventListener("submit", (e) => { e.preventDefault() })

//testing js load
output.innerText = "HELLLO>>"

submitBtn.addEventListener("click", async () => {
  //create loading animation
  output.innerHTML = "<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>"
  
  //creating a new form data to send
  const formData = new FormData(fileForm)
  const selectedFile = fileInput.files[0]
  const fileType = selectedFile.name.split().pop()

  //uploading the form data
  const response = await fetch('/api/upload', {
    method: "POST",
    headers: {
      "file-type": fileType
    },
    body: formData

  });

  //getting the ID from response
  const text = await response.text();
  console.log(`ID is : ${text}`);

  //remove loading animation  
  output.innerHTML = ""

  const downloadLink = `${window.location.href}download/${text}`

  //showing the ID on screen
  const copyLinkBtn = document.createElement("button");
  copyLinkBtn.innerText = "Copy Link"
  copyLinkBtn.addEventListener(("click"), async () => {
    await navigator.clipboard.writeText(downloadLink)
    alert('Text Copied!')
  })
  output.appendChild(copyLinkBtn);

  const shareData = {
    title: 'Download Link',
    text: 'Go to Link to Download the File',
    url: downloadLink
  }
  const shareBtn = document.createElement('button')
  shareBtn.innerText = "Share"
  shareBtn.addEventListener('click', async () => { await navigator.share(shareData) })
  output.appendChild(shareBtn)
});