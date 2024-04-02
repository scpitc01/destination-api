import hereGeocoding from '../../src/services/hereGeocoding'
import nock from 'nock'
import config from 'config'
import { HereApiResults } from '../../src/types/objects/here'



describe('HereGeocoding Service', () => {
    let HereGeocoding = hereGeocoding

    afterAll(async () => {
        nock.restore()
    })

    it('retrievePointsOfInterest should retrieve response from nock.', async () => {
        const mockResponse: HereApiResults = { items: [{ title: 'Test Resturant', distance: 10, address: { label: 'Test Street' }, categories: [{ primary: true, name: 'Tst' }] }] }
        nock(config.get('hereGeocoding.hostname'))
            .get(`/v1/discover?at=50,20&apiKey=${process.env.GEOCODE_KEY}&q=resturants&limit=100`)
            .reply(200, mockResponse);

        const response = await HereGeocoding.retrievePointsOfInterest('50', '20', 'resturants')

        expect(response).toStrictEqual(mockResponse)
    })

    it('convertPointOfInterestResultsForMongo should convert the response', async () => {
        const mockResponse: HereApiResults = { items: [{ title: 'Test Resturant', distance: 10, address: { label: 'Test Street' }, categories: [{ primary: true, name: 'Tst' }] }] }
        nock(config.get('hereGeocoding.hostname'))
            .get(`/v1/discover?at=50,20&apiKey=${process.env.GEOCODE_KEY}&q=resturants&limit=100`)
            .reply(200, mockResponse);

        const response = HereGeocoding.convertPointOfInterestResultsForMongo({ items: [{ title: 'Test1', distance: 50, categories: [{ name: 'Test', primary: true }], address: { label: 'Test Address' } }] })

        expect(response).toBeDefined()
    })
});
