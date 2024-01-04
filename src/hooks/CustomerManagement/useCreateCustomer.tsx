import { useMutation } from "react-query";
import supabase from "../../app/supabase";
import { v4 as uuidv4 } from "uuid";

interface Customer {
  hoten: string;
  cccd: string;
  sdt: string;
  email: string;
  ngaysinh: string;
  diachi: string;
  ghichu: string;
  yeucau: string;
}

const createCustomer = async (customer: Customer, id: string) => {
  if (!id) {
    id = uuidv4();
  }
  const { data, error: InsertError } = await supabase.from("customer").upsert({
    id: id,
    hoten: customer.hoten,
    cccd: customer.cccd,
    sdt: customer.sdt,
    email: customer.email,
    ngaysinh: customer.ngaysinh,
    diachi: customer.diachi,
    ghichu: customer.ghichu,
    yeucau: customer.yeucau,
  });
  if (InsertError) {
    throw InsertError;
  }
  return data;
};

export default function useCreateCustomer(customer: Customer, id: string) {
  return useMutation(() => createCustomer(customer, id));
}
