import React, { useState, useEffect } from "react";
import OrderItem from "../components/orderComponents/orderItem";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get_orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const downloadOrder = async (order) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/download_order/${order.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const jsonData = JSON.stringify(data);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `order_${order.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading order:", error);
    }
  };

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <OrderItem order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
