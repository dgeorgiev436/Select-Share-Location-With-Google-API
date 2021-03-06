import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyC4tIxM58OJG99Dnc1SnfNJs3LVkjZWXzw";

// Telling ts that the google var exists
// declare var google: any;

// Building the expected response type of the request
type GoogleGeocoding = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchAddress = (event: Event) => {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  // Send address to google API
  axios
    .get<GoogleGeocoding>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
    //   if (response.data.status !== "OK") {
    //     throw new Error("Could not fetch location!");
    //   }
      // Get long and lat from the result
      console.log(response);
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates)

      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });


    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};


form.addEventListener("submit", searchAddress);
