export interface RegisterType {
    name: string,
    email: string,
    event: string,
    message?: string | null,
    id?: string,
    status?: string,
    loading?: boolean,
    error?: string | null
}