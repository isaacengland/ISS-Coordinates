const button = document.getElementById('info-button');
const data = document.getElementById('info');

function getCoords() {
	// Make a GET request to the API endpoint
	fetch('http://api.open-notify.org/iss-now.json')
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Something went wrong');
			}
		})
		.then((data) => {
			// Make a POST request to the local server
			fetch('http://localhost:5000/receiver', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Accept: 'application/json',
				},
				// Use the data from the API request as the request body
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						throw new Error('Something went wrong');
					}
				})
				.then((jsonResponse) => {
					// Log the response data in the console & update DOM
					console.log(jsonResponse);
					document.getElementById('latitude').innerHTML =
						data.iss_position.latitude;
					document.getElementById('longitude').innerHTML =
						data.iss_position.longitude;
				})
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
}

getCoords();
