import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useChatStore=create(()=>({
    allContacts:[],
    allChats:[],
    messages:[],
    activeTab:"chat",
    isUserLoading:false,
    isMessagesLoading:false,
    selectedUser:null,
    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUSer:(selectedUser)=>set({selectedUser}),
    getAllContacts: async ()=>{
        set({isUserLoading:true})
        try {
            const res= await axiosInstance.get("/message/contacts")
            set({allContacts:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },
    getMyChatPartners: async ()=>{
        set({isUserLoading:true})
        try {
            const res= await axiosInstance.get("/message/chats")
            set({allChats:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },
}))