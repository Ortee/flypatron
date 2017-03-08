import request from 'superagent';
import airportController from '../controllers/airport';

function fetchAirports() {
  request
  .get('http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey=prtl6749387986743898559646983194')
  .end((err, res)=>{
    res.body.Continents.map( continient => {
      continient.Countries.map( country => {
        country.Cities.map( city => {
          city.Airports.map( airport =>{
            airportController.create({
              body: {
                Name: airport.Name,
                Id: airport.Id,
                Location: airport.Location,
                CountryId: airport.CountryId,
                CityId: airport.CityId,
              },
            });
          });
        });
      });
    });
  });
}

export default fetchAirports;
