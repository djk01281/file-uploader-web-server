const output = document.querySelector(".output");
const fileInput = document.querySelector(".input-file");
const submitBtn = document.querySelector(".btn-submit");
const fileForm = document.querySelector(".form-file")
fileForm.addEventListener("submit", (e)=>{ e.preventDefault()})

//testing js load
output.innerText = "HELLLO>>"

submitBtn.addEventListener("click", async () => {

    const serverURL =
      "https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3000.preview.app.github.dev/upload";
    

    const selectedFile = fileInput.files[0]
    const fileName = new Date().getTime() + selectedFile.name;
    console.log(fileName);

    //creating a new form data to send
    const formData = new FormData(fileForm)

    //uploading the form data
    const response = await fetch('/upload', {
    method: "POST",
    headers: {
      "file-name": fileName,
    },
    body: formData
    });  
  
    //getting the ID from response
    const text = await response.text();
    console.log(`ID is : ${text}`);
  

    //showing the ID on screen
    const idElement = document.createElement("div");
    idElement.innerText = `ID is : ${text}`;
    output.appendChild(idElement);
  });