import { Database } from "../types/database"

type UserEntity = Database['public']['Tables']['users']['Row']
type PostsEntity = Database['public']['Tables']['post']['Row']

export type Post = PostsEntity & {
    user: UserEntity | null
}