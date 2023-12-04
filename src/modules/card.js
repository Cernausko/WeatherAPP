import { get_weather_icon } from './addon.js'
import { fetch_forecasts } from './forecasts.js';
import { get_datetime_string } from './addon.js'



export const render_widgets = async () => {
    const cityPlaces = ['Vilnius', 'Šiauliai', 'Astraviec', 'Bartoszyce'];

    for (const place of cityPlaces) {
        try {
            const forecasts = await fetch_forecasts(place);
            const currentDateTime = new Date();
            const currentDateTimeString = get_datetime_string(currentDateTime);

            for (const forecastTimestamp of forecasts.forecastTimestamps) {
                const ltTime = new Date(forecastTimestamp.forecastTimeUtc);
                ltTime.setHours(ltTime.getHours() + 2);

                const forecastTimeString = get_datetime_string(ltTime);

                if (forecastTimeString === currentDateTimeString) {
                    create_widget(forecastTimestamp, place);
                }
            }
        } catch (error) {
            console.error(`Klaida ${place}:`, error);
        }
    }

}

export const create_widget = (forecast, place_name) => {
	const widget_basic = document.querySelector('#widget-daily-template').content.firstElementChild.cloneNode(true);
	widget_basic.querySelector('.widget-basic__cname').textContent = place_name;
	widget_basic.querySelector('#temperature').textContent = `${forecast.airTemperature}°`;
	widget_basic.querySelector('#weather-icon').src = get_weather_icon(forecast.conditionCode);
	widget_basic.querySelector('#weather-name').textContent = forecast.conditionCode.replaceAll("-", " ");
	const time = new Date(Date.parse(forecast.forecastTimeUtc + '.000Z'));

	widget_basic.querySelector('#time').textContent = `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`;

    document.querySelector('.basic-widgets').appendChild(widget_basic);
    
}


