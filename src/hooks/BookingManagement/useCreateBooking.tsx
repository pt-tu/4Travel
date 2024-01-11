import { useMutation } from "react-query";
import supabase from "../../app/supabase";

interface Booking {
  cus_id: string;
  tour_id: string;
  hanhkhach: any[];
  status: string;
}

const createBooking = async (booking: Booking, user_id: string) => {
  if (booking.cus_id && booking.tour_id) {
    if (user_id) {
      const { data, error: InsertError } = await supabase
        .from("booking")
        .upsert({
          cus_id: booking.cus_id,
          tour_id: booking.tour_id,
          user_id: user_id,
          hanhkhach: booking.hanhkhach,
          status: booking.status,
        })
        .select();
      if (InsertError) {
        throw InsertError;
      }
      return data[0];
    } else {
      const { data, error: InsertError } = await supabase
        .from("booking")
        .upsert({
          cus_id: booking.cus_id,
          tour_id: booking.tour_id,
          hanhkhach: booking.hanhkhach,
          status: booking.status,
        })
        .select();
      if (InsertError) {
        throw InsertError;
      }
      return data[0];
    }
  } else {
    throw new Error("Missing customer id or tour id");
  }
};

export default function useCreateBooking(booking: Booking, user_id: string) {
  return useMutation(() => createBooking(booking, user_id));
}
