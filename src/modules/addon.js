import conditions from './conditions.js';

export const get_weather_icon = (conditionCode) => {
	const weather_icon = conditions[conditionCode];
	return `img/${weather_icon}`;
}

export const group_by_date = (forecasts) => {
	let forecast_date = (forecasts[0].forecastTimeUtc.split(' '))[0];
	const date_groups = [];
	const current_list = [];

	for (let i = 0; i < forecasts.length; i++) {
		const forecastTimeSplit = forecasts[i].forecastTimeUtc.split(' ');

		if (forecast_date !== forecastTimeSplit[0]) {
			date_groups.push([]);
			date_groups[date_groups.length - 1].splice(0, 0, ...current_list);
			current_list.length = 0;
			forecast_date = forecastTimeSplit[0];
		}

		forecasts[i].hour = parseInt((forecastTimeSplit[1].split(':'))[0]);
		current_list.push(forecasts[i]);

		if (i === forecasts.length - 1) {
			date_groups.push([]);
			date_groups[date_groups.length - 1].splice(0, 0, ...current_list);
		}
	}

	return date_groups;
}

export const find_closest_temperature = (forecast_groups, hour) => {
	const closest_forecasts = [];
	for (const forecast_group of forecast_groups) {
		let difference = Infinity;
		let currently_closest = [];
		for (const forecast of forecast_group) {
			if (Math.abs(forecast.hour - hour) < difference) {
				difference = Math.abs(forecast.hour - hour);
				currently_closest = forecast;
			}
		}

		var timestamp = Date.parse(currently_closest.forecastTimeUtc);
		var dateObject = new Date(timestamp);
		currently_closest.dayOfWeek = dateObject.toLocaleString('en-us', { weekday: 'short' });

		closest_forecasts.push(currently_closest);
	}

	return closest_forecasts;
}

// Datos exportas
export const get_datetime_string = (dateUTC) => {
	const year = dateUTC.getFullYear();
	const month = dateUTC.getMonth() + 1;
	const day = dateUTC.getDate();
	const hours = String(dateUTC.getHours());

	return `${year}-${month}-${day} ${hours}:00:00`;
}
