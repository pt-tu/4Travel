import React from "react";
import useTestLoad from "../hooks/useTestLoad";
import useTestCUD from "../hooks/useTestCUD";

function Test() {
  const load = useTestLoad();
  const cud = useTestCUD();
  let data;
  if (load.isSuccess) {
    data = load.data;
  }
  if (load.isError) {
    return <></>;
  }
  if (cud.isSuccess) {
    window.location.reload();
  }
  return (
    <div>
      <button onClick={() => cud.mutate()}>test cud</button>
      {data
        ? data.map((item, index) => <div key={index}>{item.name}</div>)
        : null}
    </div>
  );
}

export default Test;
