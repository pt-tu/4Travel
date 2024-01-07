import { useMutation } from "react-query";
import supabase from "../../app/supabase";

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
    if (tour.bia == null) {
      const { data, error: InsertError } = await supabase
        .from("tour")
        .insert({
          name: tour.name,
          tourguide_id: tour.tourguide_id,
          diemdi: tour.diemdi,
          diemden: tour.diemden,
          hotel: tour.hotel,
          start: tour.start,
          end: tour.end,
          chitiet: tour.chitiet,
        })
        .select();
      if (InsertError) {
        throw InsertError;
      }
      return data;
    } else {
      const { data: img, error } = await supabase.storage
        .from("anhbia")
        .upload("public/" + id + ".jpg", tour.bia);

      const { data, error: InsertError } = await supabase
        .from("tour")
        .insert({
          name: tour.name,
          tourguide_id: tour.tourguide_id,
          bia:
            "https://iefaqndqhivmuelkgvvt.supabase.co/storage/v1/object/public/anhbia/public" +
            id +
            ".jpg",
          diemdi: tour.diemdi,
          diemden: tour.diemden,
          hotel: tour.hotel,
          start: tour.start,
          end: tour.end,
          chitiet: tour.chitiet,
        })
        .select();
      if (InsertError) {
        throw InsertError;
      }
      return data;
    }
  } else {
    if (tour.bia == null) {
      const { data, error: InsertError } = await supabase
        .from("tour")
        .upsert({
          id: id,
          name: tour.name,
          tourguide_id: tour.tourguide_id,
          diemdi: tour.diemdi,
          diemden: tour.diemden,
          hotel: tour.hotel,
          start: tour.start,
          end: tour.end,
          chitiet: tour.chitiet,
        })
        .select();
      if (InsertError) {
        throw InsertError;
      }
      return data;
    } else {
      const { data: img, error } = await supabase.storage
        .from("anhbia")
        .upload("public/" + id + ".jpg", tour.bia);

      const { data, error: InsertError } = await supabase
        .from("tour")
        .upsert({
          id: id,
          name: tour.name,
          tourguide_id: tour.tourguide_id,
          bia:
            "https://iefaqndqhivmuelkgvvt.supabase.co/storage/v1/object/public/anhbia/public" +
            id +
            ".jpg",
          diemdi: tour.diemdi,
          diemden: tour.diemden,
          hotel: tour.hotel,
          start: tour.start,
          end: tour.end,
          chitiet: tour.chitiet,
        })
        .select();
      if (InsertError) {
        throw InsertError;
      }
      return data;
    }
  }
};

export default function useCreateTour(tour: Tour, id: string) {
  return useMutation(() => createTour(tour, id));
}
