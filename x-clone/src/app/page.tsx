import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from 'react';
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";
import PostCard from "./components/post-card";
import {PostList} from "./components/post-list";
import { Database } from "./types/database";
import { ComposePost } from "./components/compose-post";


export default async function Home () {
  const supabase = createServerComponentClient<Database>({cookies})
  const { data: {session}} = await supabase.auth.getSession()

  if(session === null){
    redirect('/login')
  }

  
  const { data: posts } = await supabase
  .from('post')
  .select('*, user:users(*)')
  .order('created_at', {ascending: false})


  return( 
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/80 min-h-screen">
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostList posts={posts} />
      </section>
        <AuthButtonServer />
    </main>
  )
}