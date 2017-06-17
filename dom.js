let buttonDOM = document.getElementById('testButton')
buttonDOM.addEventListener('click', () => {
    console.log("HALLO  ")
    fetch('/parrot1.jpg')
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('testimg').src = URL.createObjectURL(imageBlob);
	});
})
console.log('in domjs')