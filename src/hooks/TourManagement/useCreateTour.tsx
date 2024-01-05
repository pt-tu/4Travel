import { useMutation } from "react-query";
import supabase from "../../app/supabase";
import { v4 as uuidv4 } from "uuid";

interface Tour {
  name: string;
  tourguide_id: string;
  bia: any;
  diemdi: string;
  diemden: string;
  hotel: string;
  start: string;
  end: string;
  chitiet: string;
}

const createTour = async (tour: Tour, id: string) => {
  if (!id) {
    id = uuidv4();
  }
  if (tour.bia == null) {
    const { data, error: InsertError } = await supabase.from("tour").upsert({
      id: id,
      name: tour.name,
      tourguide_id: tour.tourguide_id,
      diemdi: tour.diemdi,
      diemden: tour.diemden,
      hotel: tour.hotel,
      start: tour.start,
      end: tour.end,
      chitiet: tour.chitiet,
    });
    if (InsertError) {
      throw InsertError;
    }
    return data;
  } else {
    const fileanhbia = uuidv4();

    const { data: idata, error } = await supabase.storage
      .from("anhbia")
      .upload("public/" + fileanhbia + ".jpg", tour.bia);

    const { data, error: InsertError } = await supabase.from("tour").upsert({
      id: id,
      name: tour.name,
      tourguide_id: tour.tourguide_id,
      bia:
        "https://iefaqndqhivmuelkgvvt.supabase.co/storage/v1/object/sign/anhbia/" +
        tour.bia +
        ".jpg",
      diemdi: tour.diemdi,
      diemden: tour.diemden,
      hotel: tour.hotel,
      start: tour.start,
      end: tour.end,
      chitiet: tour.chitiet,
    });
    if (InsertError) {
      throw InsertError;
    }
    return data;
  }
};

export default function useCreateTour(tour: Tour, id: string) {
  return useMutation(() => createTour(tour, id));
}
