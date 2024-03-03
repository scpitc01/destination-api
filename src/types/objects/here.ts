
export interface HereApiResults {
    items: [
        {
            title: string,
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