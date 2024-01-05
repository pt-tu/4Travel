import React, { useEffect, useState } from "react";
import useTestLoad from "../hooks/useTestLoad";
import useTestCUD from "../hooks/useTestCUD";
import { Button } from "antd";
import useTestDelete from "../hooks/useTestDelete";

function Test() {
  const load = useTestLoad();
  const cud = useTestCUD();
  const [testid, settestid] = useState();
  const deletetest = useTestDelete(testid);
  if (deletetest.isSuccess) {
    window.location.reload();
  }
  useEffect(() => {
    if (testid != null) {
      deletetest.mutate();
    }
  }, [testid]);
  let data;
  if (load.isSuccess) {
    data = load.data;
  }
  if (load.isError) {
    return <></>;
  }
  if (cud.isSuccess) {
  }
  return (
    <div>
      <button onClick={() => cud.mutate()}>test cud</button>
      {data
        ? data.map((item, index) => (
            <div key={index}>
              {item.name}{" "}
              <Button
                onClick={() => {
                  settestid(item.id);
                }}
              >
                delete
              </Button>
            </div>
          ))
        : null}
    </div>
  );
}

export default Test;
