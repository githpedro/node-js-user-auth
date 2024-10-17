/* eslint-disable react/react-in-jsx-scope */
'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// Cambiar la importación del tipo Session
import { Session } from "@supabase/auth-helpers-nextjs";  // Importar el tipo correcto desde Supabase
import { useRouter } from "next/navigation";
import {Button} from '@nextui-org/button';

export function AuthButton ({session}: {session: Session | null}) {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return(
        <header>
            {
                session === null ? (
                    <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                        Iniciar sesión con Github
                    </button>
                ) :             
                    <Button onClick={handleSignOut}>
                        Cerrar Sesión
                    </Button>
            }
        </header>
    )
}
