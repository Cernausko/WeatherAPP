export const fetch_forecasts = async (city) => {
	try {
		const forecasts_response = await fetch(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`);
		return await forecasts_response.json();
	} catch (error) {
		console.log(error.message);
	}
}

export const check_forecast_errors = (forecasts) => {
	const alert_wrapper = document.querySelector('#alert-wrapper');
	const temperatures_wrapper = document.querySelector('#temperatures-wrapper');

	if (forecasts.error !== undefined) {
		temperatures_wrapper.classList.add('d-none');
		alert_wrapper.classList.remove('d-none');
		alert_wrapper.querySelector('.alert').textContent = `Informacija apie šito miesto orus negalima.`;
		return true;
	}

	alert_wrapper.classList.add('d-none');
	temperatures_wrapper.classList.remove('d-none');

	return false;
}