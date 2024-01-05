import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetCustomerList = async () => {
    let { data: customer, error } = await supabase
        .from('customer')
        .select('*')
    if (error) {
        throw new Error(error.message);
    }
    if(!customer){
        throw new Error("Customer list not found")
    }
    return customer;
}

export default function useGetCustomerList() {
    return useQuery("CustomerList",() => GetCustomerList())
}