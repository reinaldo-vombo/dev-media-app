export interface ISavedPost {
    postId: string,
    userId: string
}
export interface IDeletePost {
    postId?: string
    imageId: string
}
export interface IGetInfinitePost {
    pageParam: number
}