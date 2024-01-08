import { Col, ConfigProvider, Flex, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import useGetBillList from "../hooks/Bill/useGetBillList";
import useGetTopRevenue from "../hooks/Report/useGetTopRevenue";
import { start } from "repl";
interface bar {
  diemden: string;
  total: number;
  time_of_day: string;
} //cột hiển thị gồm tên tỉnh và giá trị doanh thu của tỉnh đó
const style: React.CSSProperties = {
  fontSize: 14,
  textAlign: "center",
  margin: "0 auto",
};

function BaoCao() {
  const billist = useGetBillList();
  const [topchoose, settopchoose] = useState("10"); //chon top nao de hien bao cao (1,3,10), mac dinh la 10
  const [time, settime] = useState("01/24");
  let daonguoc1: bar[] = []; //đảo ngược để hiển thị từ thấp lên cao
  let daonguoc10: bar[] = []; //
  let daonguoc3: bar[] = []; //
  let tongdoanhthu = 0;
  const barlist1: bar[] = [];
  const barlist3: bar[] = [];
  const barlist10: bar[] = [];
  let top1 = 0; //tỉnh có danh thu cao nhất để tính tỉ lệ cột
  const toprevenue = useGetTopRevenue(time);
  console.log(time);
  if (toprevenue.isSuccess) {
    top1 = toprevenue.data.top1[0]?.total ? toprevenue.data.top1[0].total : "";
    console.log(top1);
    toprevenue.data.top1.map((item: any) => {
      barlist1.push({
        diemden: item.diemden,
        total: item.total,
        time_of_day: item.time_of_day,
      });
      daonguoc1 = [...barlist1].reverse();
    });
    toprevenue.data.top3.map((item: any) => {
      barlist3.push({
        diemden: item.diemden,
        total: item.total,
        time_of_day: item.time_of_day,
      });
      console.log(barlist3);
    });
    daonguoc3 = [...barlist3].reverse();
    toprevenue.data.top10.map((item: any) => {
      barlist10.push({
        diemden: item.diemden,
        total: item.total,
        time_of_day: item.time_of_day,
      });
    });
    daonguoc10 = [...barlist10].reverse();
    console.log(toprevenue.data);
  }
  if (billist.isSuccess) {
    billist.data.map((item) => {
      tongdoanhthu += item.total;
    });
  }
  const handleSelectChange = (selectedValues: any) => {
    settopchoose(selectedValues); // Cập nhật state genre khi có giá trị được chọn
    console.log(topchoose);
  };
  const handleSelect1Change = (selectedValues: any) => {
    settime(selectedValues); // Cập nhật state genre khi có giá trị được chọn
    console.log(topchoose);
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimaryHover: "none" },
        components: {
          Select: {
            colorPrimary: "#4B268F",
            boxShadow: "#4B268F",
            borderRadius: 0,
          },
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <p style={{ marginTop: 18, fontSize: 20, fontWeight: "bold" }}>
          Tổng doanh thu: ${tongdoanhthu}
        </p>
        <div>
          <Select
            style={{
              width: 100,
              marginTop: 0,
              marginLeft: 32,
              marginRight: 20,
            }}
            options={[
              { value: "1", label: "Top 1" },
              { value: "3", label: "Top 3" },
              { value: "10", label: "Top 10" },
            ]}
            defaultValue={"Top 10"}
            onChange={handleSelectChange}
          />
          <Select
            style={{ width: 150, marginTop: 0, marginLeft: 32 }}
            options={[
              { value: "01/24", label: "01/2024" },
              { value: "12/23", label: "12/2023" },
              { value: "11/23", label: "11/2023" },
              { value: "10/23", label: "10/2023" },
              { value: "09/23", label: "09/2023" },
              { value: "08/23", label: "08/2023" },
              { value: "07/23", label: "07/2023" },
              { value: "06/23", label: "06/2023" },
              { value: "05/23", label: "05/2023" },
              { value: "04/23", label: "04/2023" },
              { value: "03/23", label: "03/2023" },
              { value: "02/23", label: "02/2023" },
              { value: "01/23", label: "01/2023" },
            ]}
            defaultValue={"01/24"}
            onChange={handleSelect1Change}
          />
        </div>
        <div
          style={{
            width: "95%",
            height: 600,
            margin: "0 auto",
            marginTop: 20,
            border: "1px solid rgba(0, 0, 0, 0.26)",
          }}
        >
          <p style={{ textAlign: "start", marginLeft: 10 }}>
            Biểu đồ doanh thu các tỉnh
          </p>
          {topchoose == "10" ? (
            <>
              <div
                style={{
                  height: 525,

                  width: "98%",
                  margin: "0 auto",
                }}
              >
                <div style={{ height: 475, width: "100%" }}>
                  <Flex
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      height: "100%",
                      backgroundColor: "#D9D9D9",
                      display: "flex",
                      alignItems: "end",
                    }}
                    gap={20}
                  >
                    {daonguoc10.map((item) => (
                      <>
                        <div
                          style={{
                            height: `${90 / (top1 / item.total)}%`,
                            display: "flex",
                            alignItems: "center",

                            width: "9%",
                            backgroundColor: "#4B268F",
                          }}
                        >
                          <p style={{ margin: "0 auto", fontSize: 16 }}>
                            ${item.total}
                          </p>
                        </div>
                      </>
                    ))}
                  </Flex>
                </div>
                <div style={{ height: 50, width: "100%" }}>
                  <Flex
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      height: "100%",
                    }}
                    gap={20}
                  >
                    {daonguoc10.map((item) => (
                      <>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            width: "9%",
                            backgroundColor: "white",
                          }}
                        >
                          <p style={style}>{item.diemden} </p>
                        </div>
                      </>
                    ))}
                  </Flex>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {topchoose == "3" ? (
            <>
              <>
                <div
                  style={{
                    height: 525,

                    width: "98%",
                    margin: "0 auto",
                  }}
                >
                  <div style={{ height: 475, width: "100%" }}>
                    <Flex
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        height: "100%",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "end",
                      }}
                      gap={20}
                    >
                      {daonguoc3.map((item) => (
                        <>
                          <div
                            style={{
                              height: `${90 / (top1 / item.total)}%`,
                              display: "flex",
                              alignItems: "center",

                              width: "35%",
                              backgroundColor: "#4B268F",
                            }}
                          >
                            <p style={{ margin: "0 auto", fontSize: 16 }}>
                              ${item.diemden}
                            </p>
                          </div>
                        </>
                      ))}
                    </Flex>
                  </div>
                  <div style={{ height: 50, width: "100%" }}>
                    <Flex
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        height: "100%",
                      }}
                      gap={20}
                    >
                      {daonguoc3.map((item) => (
                        <>
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              width: "35%",
                              backgroundColor: "white",
                            }}
                          >
                            <p style={style}>{item.diemden} </p>
                          </div>
                        </>
                      ))}
                    </Flex>
                  </div>
                </div>
              </>
            </>
          ) : (
            <></>
          )}
          {topchoose == "1" ? (
            <>
              <>
                <div
                  style={{
                    height: 525,

                    width: "98%",
                    margin: "0 auto",
                  }}
                >
                  <div style={{ height: 475, width: "100%" }}>
                    <Flex
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        height: "100%",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "end",
                      }}
                      gap={20}
                    >
                      {daonguoc1.map((item) => (
                        <>
                          <div
                            style={{
                              height: `${90 / (top1 / item.total)}%`,
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              backgroundColor: "#4B268F",
                            }}
                          >
                            <p style={{ margin: "0 auto", fontSize: 16 }}>
                              ${item.total}
                            </p>
                          </div>
                        </>
                      ))}
                    </Flex>
                  </div>
                  <div style={{ height: 50, width: "100%" }}>
                    <Flex
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        height: "100%",
                      }}
                      gap={20}
                    >
                      {daonguoc1.map((item) => (
                        <>
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              backgroundColor: "white",
                            }}
                          >
                            <p style={style}>{item.diemden} </p>
                          </div>
                        </>
                      ))}
                    </Flex>
                  </div>
                </div>
              </>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default BaoCao;
