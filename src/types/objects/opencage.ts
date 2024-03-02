export interface OpenCageResponse {
    rate: OpenCageRate
}

export interface OpenCageRate {
    limit: number,
    remaining: number,
    reset: number
}

export interface OpenCageResults {
    results: [
        {
            geometry: OpenCageResultsGeometry,
            components: OpenCageResultsComponents
        }
    ]
}

export interface OpenCageResultsComponents {
    city: string,
    state: string,
    state_code: string
}

export interface OpenCageResultsGeometry {
    lat: string,
    lng: string
}