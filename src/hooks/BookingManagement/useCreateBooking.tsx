import { useMutation } from "react-query";
import supabase from "../../app/supabase";

interface Booking {
  cus_id: string;
  tour_id: string;
  hanhkhach: any[];
  status: string;
}

const createBooking = async (booking: Booking) => {
  if (booking.cus_id && booking.tour_id) {
    const { data, error: InsertError } = await supabase
      .from("booking")
      .insert({
        cus_id: booking.cus_id,
        tour_id: booking.tour_id,
        hanhkhach: booking.hanhkhach,
        status: booking.status,
      })
      .select();
    if (InsertError) {
      throw InsertError;
    }
    return data;
  }
};

export default function useCreateBooking(booking: Booking) {
  return useMutation(() => createBooking(booking));
}
