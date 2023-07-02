import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const GET =async (req , {params})=>{
    try{
        await connectToDB();

        const prompts=await Prompt.find({
            creator: params.id
        }).populate('creator')
        
        //It will fetch all the prompts with creator details as well. (creator = User.id, so all user detaisl too)
        return new Response(JSON.stringify(prompts), { status: 200 })

    }
    catch(err)
    {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}