import { Database } from "../types/database"
import PostCard from "./post-card"
import { type Post } from '@/app/types/post'

export function PostList({ posts }: { posts: Post[] | null }) {
    if (posts === null || posts.length === 0) {
        return <p>No hay POST para mostrar</p>
    }

    return (
        <>
            {
                posts.map(post => {
                    const { id, user, content } = post

                    // Si user es null, asignamos valores predeterminados
                    const userName = user?.user_name || "Usuario desconocido"
                    const userFullName = user?.name || "Usuario desconocido"
                    const avatarUrl = user?.avatar_url || "/default-avatar.png"

                    return (
                        <PostCard
                            content={content}
                            key={id}
                            userName={userName}
                            userFullName={userFullName}
                            avatarUrl={avatarUrl}
                        />
                    )
                })
            }
        </>
    )
}




