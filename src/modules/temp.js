import { get_weather_icon, group_by_date, find_closest_temperature } from './addon.js'

export const render_temperatures = (forecasts) => {
	const temperatures = document.querySelector('#temperatures');

	temperatures.replaceChildren();

	const grouped_forecasts = group_by_date(forecasts.forecastTimestamps);

	const closest_temps = find_closest_temperature(grouped_forecasts, new Date().getUTCHours());
	closest_temps[0].dayOfWeek = "Today";

	for (const temps of closest_temps) {
		const temperature_item = document.querySelector('#temperature-item-template').content.firstElementChild.cloneNode(true);
 
		temperature_item.querySelector('#day').textContent = temps.dayOfWeek;
		temperature_item.querySelector('#weather-icon').src = get_weather_icon(temps.conditionCode);
		temperature_item.querySelector('#temperature').textContent = `${temps.airTemperature}°`;

		temperatures.appendChild(temperature_item);
	}

	return closest_temps[0];
}