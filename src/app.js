import fetch_places from './modules/places.js';
import { render_widgets } from './modules/card.js'
import { render_temperatures } from './modules/temp.js';
import { check_forecast_errors, fetch_forecasts } from './modules/forecasts.js';

let today_forecast;

const places_input = document.querySelector('#places-input');
const location_btn = document.querySelector('#location-btn');


location_btn.addEventListener('click', async (e) => {

const forecasts = await fetch_forecasts(places_input.value);

if (check_forecast_errors(forecasts)) {
	return;
}
today_forecast = render_temperatures(forecasts)

document.querySelectorAll('.widget-basic').forEach(widget => {
	widget.style.display = 'none';
});

});

void async function init() {
	await fetch_places();
	render_widgets();
}();

