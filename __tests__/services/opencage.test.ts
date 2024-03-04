import opencageService from '../../src/services/opencage'
import nock from 'nock'
import config from 'config'
import { OpenCageResults } from '../../src/types/objects/opencage'



describe('Opencage Service', () => {
    let OpenCage = opencageService

    afterAll(async () => {
        nock.restore()
    })

    it('retrieveCoordinates should retrieve response from nock.', async () => {
        const mockResponse: OpenCageResults = { results: [{ components: { city: 'Louisville', state: 'Kentucky', state_code: 'KY' }, geometry: { lat: '50', lng: '20' } }] }
        nock(config.get('opencage.hostname'))
            .get(`/geocode/v1/json?q=Louisville,KY&key=${config.get('opencage.key')}&language=en&pretty=1`)
            .reply(200, mockResponse);

        const response = await OpenCage.retrieveCoordinates('Louisville', 'KY')

        expect(response).toStrictEqual(mockResponse)
    })
});
