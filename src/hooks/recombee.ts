import recombee from "recombee-js-api-client";
interface ItemsUserProps {
  item: string;
  userId: string;
}
export const client = new recombee.ApiClient(
  "4travel-dev",
  "Z4BliQic0gwmqrFIMDEohKyOFViGQRZnrszR4ybrEsvuXt61K1q6pYlIyfTFbcyE",
  { region: "us-west" }
);

export const getRecommendItemsForUser = async (props: ItemsUserProps) => {
  const response = await client.send(
    new recombee.RecommendItemsToItem(props.item, props.userId, 5)
  );
  return response;
};

export const getRecommendForUser = async (userId: string) => {
  const res = await client.send(new recombee.RecommendItemsToUser(userId, 5));
  return res;
};
