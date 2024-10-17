import { Avatar, button } from "@nextui-org/react"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export function ComposePost ({
    userAvatarUrl,
}: {
    userAvatarUrl: string
}){
    const addPost = async (formData: FormData) =>{
        'use server'

        const content = formData.get('content')

        if(content === null) return
        
        const supabase = createServerActionClient({cookies})
        const { data: {user}} = await supabase.auth.getUser()
        
        if(user === null) return

        await supabase
            .from('post')
            .insert({content, user_id: user.id})
        revalidatePath('/')
    }

    return(
        <form action={addPost} className="flex flex-row p-2 border-b border-white/20">
            <Avatar className="rounded-full w-10 h-12 object-contain mr-4" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea 
                    name="content"
                    rows={4}
                    className="w-full text-xl bg-black placeholder-gray-500 p-2"
                    placeholder="¿Qué onda?"
                />
                <button type="submit" className="bg-sky-500 text-sm font-bold rounded-full px-5 py-2 self-end">
                    Postear Righ Now
                </button>
            </div>
        </form>
    )
}