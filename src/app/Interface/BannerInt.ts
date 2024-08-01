export interface ApiResponse<T> {
    message?: string;
    data?: T;
}


export interface BannerResponse {
    advertisementTitle: string
    attachment: {}
    delete_status: null
    id: number
    is_banner: boolean
    pageLink: string
    status: number
    visible: number
}
export interface TestResponse {
    group_name: string
    tests: []
    packages: []
    id: number
    status: number

}
export interface BlogResponse {
    blogTitle: string
    blogImage: string
    id: number
    status: number

}