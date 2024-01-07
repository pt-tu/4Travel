import { useMutation } from "react-query";
import supabase from "../../app/supabase";
import { v4 as uuidv4 } from "uuid";

interface Booking {
  cus_id: string;
  tour_id: string;
  hanhkhach: any[] | null;
}
interface Bill {
  id: any;
  tourname: string;
  cusname: string;
  sdt: string;
  email: string;
  time: string;
  by: string;
  hanhkhach: any;
  total: number;
  diemden: string;
  price: number;
}

const Checkout = async (booking: Booking, bill: Bill) => {
  const { data, error: InsertError } = await supabase.from("booking").upsert({
    cus_id: booking.cus_id,
    tour_id: booking.tour_id,
    status: "done",
  });
  const bid = bill.id;
  const { error: InsertbillError } = await supabase.from("bill").upsert({
    id: bid,
    tourname: bill.tourname,
    cusname: bill.cusname,
    sdt: bill.sdt,
    email: bill.email,
    time: bill.time,
    by: bill.by,
    hanhkhach: bill.hanhkhach,
    total: bill.total,
    diemden: bill.diemden,
    price: bill.price,
  });
  if (InsertbillError) {
    throw InsertbillError;
  }
  return data;
};

export default function useCheckOut(booking: Booking, bill: Bill) {
  return useMutation(() => Checkout(booking, bill));
}
