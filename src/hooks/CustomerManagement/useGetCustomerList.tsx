import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetCustomerList = async (Search: string) => {
    let { data: customer, error } = await supabase
        .from('customer')
        .select('*')
        //.ilike('cccd',`%${Search}%`)
        .or(`cccd.ilike.%${Search}%,hoten.ilike.%${Search}%`)
    if (error) {
        throw new Error(error.message);
    }
    if(!customer){
        throw new Error("Customer list not found")
    }
    return customer;
}

export default function useGetCustomerList(Search: string) {
    return useQuery("CustomerList",() => GetCustomerList(Search))
}