import places_data from './place-list';

const fetch_places = async () => {
	const places_datalist = document.querySelector('#places');

	try {
		const places = places_data; 
		for (const place of places) {
			const option = document.createElement('option');
			option.value = place.name;
			places_datalist.appendChild(option);
		}
	} catch (error) {
		console.log(error.message);
	}
}

export default fetch_places;