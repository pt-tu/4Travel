import { useMutation } from "react-query";
import supabase from "../../app/supabase";

interface Device {
  name: string;
  id_staff: string;
  status: string;
}

const createDevice = async (device: Device, id: string) => {
  if (!id) {
    const { data, error: InsertError } = await supabase
      .from("device")
      .insert({
        name: device.name,
        id_staff: device.id_staff,
        status: device.status,
      })
      .select();
    if (InsertError) {
      throw InsertError;
    }
    return data[0];
  } else {
    const { data, error: InsertError } = await supabase
      .from("device")
      .upsert({
        id: id,
        name: device.name,
        id_staff: device.id_staff,
        status: device.status,
      })
      .select();
    if (InsertError) {
      throw InsertError;
    }
    return data[0];
  }
};

export default function useCreateDevice(device: Device, id: string) {
  return useMutation(() => createDevice(device, id));
}
