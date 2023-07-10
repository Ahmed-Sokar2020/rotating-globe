export interface Interaction {
    repoId: number;
    type: string;
    timestamp: string;
    coordinates: { latitude: number; longitude: number };
}

export async function fetchInteractions(): Promise<Interaction[]> {
    // Simulating interaction data
    const interactions: Interaction[] = [
    {
        repoId: 1,
        type: 'push',
        timestamp: '2023-07-09T10:30:00Z',
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
    },
    {
        repoId: 2,
        type: 'pullRequest',
        timestamp: '2023-07-09T11:15:00Z',
        coordinates: { latitude: 51.5074, longitude: -0.1278 },
    },
    // Add more interaction data as needed
    ];

    return interactions;
}
