const idBtn = document.querySelector(".btn-id");
const idInput = document.querySelector(".input-id");
const output = document.querySelector(".output")
output.innerText  = "dadawd"

idBtn.addEventListener("click", async () => {
  console.log("clicked");
  const id = idInput.value;
  const downloadURL = `/download/${id}`;
  //https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3000.preview.app.github.dev/download?id=A9G50Ux90P
  const res = await fetch(downloadURL);
  const reader = res.body.getReader();

  let chunks = [];
  let chunk;
  while (!(chunk = await reader.read()).done) {
    chunks.push(chunk.value);
  }
  const blob = new Blob(chunks);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "file.jpeg";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log("ended!");
});
