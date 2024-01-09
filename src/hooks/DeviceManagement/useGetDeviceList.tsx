import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetDeviceList = async (Search: string) => {
    let { data: customer, error } = await supabase
        .from('device')
        .select(`
            *
        `)
        .ilike('name',`%${Search}%`)
        
    if (error) {
        throw new Error(error.message);
    }
    if(!customer){
        throw new Error("Device list not found")
    }
    return customer;
}

export default function useGetDeviceList(Search: string) {
    return useQuery("CustomerList",() => GetDeviceList(Search))
}