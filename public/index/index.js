const output = document.querySelector(".output");
const fileInput = document.querySelector(".input-file");
const submitBtn = document.querySelector(".btn-submit");
const fileForm = document.querySelector(".form-file")
fileForm.addEventListener("submit", (e) => { e.preventDefault() })

//testing js load
output.innerText = "HELLLO>>"

submitBtn.addEventListener("click", async () => {

  //creating a new form data to send
  const formData = new FormData(fileForm)
  const selectedFile = fileInput.files[0]
  const fileType = selectedFile.name.split().pop()

  //uploading the form data
  const response = await fetch('/upload', {
    method: "POST",
    headers: {
      "file-type": fileType
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