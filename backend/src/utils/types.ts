export type CreateUserType = {
    username: string,
    password: string
}

export type CreateLibraryEntryType = {
    id: number,
    userId: number,
    imdbId: string
}