import React from 'react';
import { Button } from 'flowbite-react';

const OrderItem = ({ order }) => {
    const user_type = localStorage.getItem("user_type");

    const onDownloadClick = async () => {
        window.open("http://127.0.0.1:8000/download_order/"+ order.design_id, "_blank");
    };

    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <p className="text-gray-700">Manufacturer Email: {order.manufacturer_email}</p>
            <p className="text-gray-700">Customer Email: {order.customer_email}</p>
            <p className="text-gray-700">Design ID: {order.design_id}</p>
            <p className="text-gray-700">Design Name: {order.design_name}</p>
            <p className="text-gray-700">Quantity: {order.quantity}</p>
            <p className="text-gray-700">Shipping Address: {order.shippingAddress}</p>
            {user_type === "manufacturer" && (
                <Button onClick={onDownloadClick} className="mt-2">
                    Download Design
                </Button>
            )}
        </div>
    );
};

export default OrderItem;
