
export interface HereApiResults {
    items: [
        {
            title: string,
            distance: number,
            categories: [
                {
                    name: string,
                    primary: boolean
                }
            ],
            address: {
                label: string
            }
        }
    ]
}