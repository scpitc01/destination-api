import { Schema } from 'mongoose'
import destinationRatingController from '../../src/controllers/destinationRating'
import UserDestinationRatingModel from '../../src/models/userDestinationRating'


describe('Destination Rating Controller', () => {
    const DestinationRatingController = destinationRatingController

    it('insertDestinationRating should not find one and insert into the database.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue(null)
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOne').mockImplementation(findDestinationRating)
        const createDestinationRating = jest.fn().mockResolvedValue({ useId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        const serviceCreateRating = jest.spyOn(UserDestinationRatingModel, 'create').mockImplementation(createDestinationRating)

        const rating = await DestinationRatingController.insertDestinationRating({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        expect(rating).toBeDefined()
        expect(serviceCreateRating).toHaveBeenCalled()
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('insertDestinationRating should find one and not insert into the database.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue({ useId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOne').mockImplementation(findDestinationRating)

        const rating = await DestinationRatingController.insertDestinationRating({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        expect(rating).toBeDefined()
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('updateDestinationRating should find one and update into the database.', async () => {
        const updateDestinationRating = jest.fn().mockResolvedValue({ useId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        const serviceUpdateRating = jest.spyOn(UserDestinationRatingModel, 'findOneAndUpdate').mockImplementation(updateDestinationRating)

        const rating = await DestinationRatingController.updateDestinationRating({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        expect(rating).toBeDefined()
        expect(serviceUpdateRating).toHaveBeenCalled()
    })

    it('findDestinationRating should find one.', async () => {
        const findDestinationRating = jest.fn().mockResolvedValue({ useId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25 })
        const serviceFindRating = jest.spyOn(UserDestinationRatingModel, 'findOne').mockImplementation(findDestinationRating)

        const rating = await DestinationRatingController.findDestinationRating({ userId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13' })
        expect(rating).toBeDefined()
        expect(serviceFindRating).toHaveBeenCalled()
    })

    it('listDestinationRating should find an array.', async () => {
        const listDestinationRating = jest.fn().mockResolvedValue([{ useId: '65e50a396c69ace0de368e13', destinationId: '65e50a396c69ace0de368e13', rating: 3.25, destinationsObject: { state: 'KY', city: 'Louisville' } }])
        const serviceListRating = jest.spyOn(UserDestinationRatingModel, 'aggregate').mockImplementation(listDestinationRating)

        const rating = await DestinationRatingController.listCombinedDestinationRating('65e50a396c69ace0de368e13')
        expect(rating).toBeDefined()
        expect(serviceListRating).toHaveBeenCalled()
    })

    it('deleteDestinationRating should try and delete a record', async () => {
        const deleteDestinationRating = jest.fn().mockResolvedValue(null)
        const serviceDeleteRating = jest.spyOn(UserDestinationRatingModel, 'deleteOne').mockImplementation(deleteDestinationRating)

        await DestinationRatingController.deleteDestinationRating({ 'userId': 'TestId', destinationId: 'testId' })
        expect(serviceDeleteRating).toHaveBeenCalled()
    })
})
