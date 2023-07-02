"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams} from "next/navigation";

import Form from "@components/Form"

const UpdatePrompt = () => {
    const router = useRouter()
    
    const searchParams=useSearchParams();
    const promptid=searchParams.get('id')

    const [submitting,setSubmitting]=useState(false);
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    })

    useEffect(()=>{
        const getPromptDetails=async()=>{
            const res=await fetch(`/api/prompt/${promptid}`)
            const data=await res.json()

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(promptid)
        {
            getPromptDetails()
        }
    },[promptid])

    const editPrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        
        if(!promptid) return alert("Prompt to update not found")

        try{
            const res=await fetch(`/api/prompt/${promptid}` ,{
                method:"PATCH",
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                }),

            });
            if(res.ok)
            {
                router.push("/");
            }
        }
        catch(err)
        {
            console.log(err);   
        }
        finally{
            setSubmitting(false);   
        }
    }

    return (
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt} />
    )
}

export default UpdatePrompt