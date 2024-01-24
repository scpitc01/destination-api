export default async function (app: any) {
    app.get('/', async (request: any, reply: any) => {
        console.log("Hey it worked")
    })
}