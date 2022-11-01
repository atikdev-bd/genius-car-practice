import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const CheckOut = () => {
  const service = useLoaderData();
  const { title, price, _id } = service;
  const { user } = useContext(AuthContext);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = `${form.FirstName.value}  ${form.LastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const massage = form.massage.value;
    console.log(name, phone);

    const order = {
      service: _id,
      serviceName: title,
      price: price,
      customer: name,
      email: email,
      phone: phone,
      massage: massage,
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged){
            toast.success('orders successfully placed')
        } 
        form.reset()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleOrder}>
      <h1 className="text-2xl text-orange-600 font-semibold mb-3">
        Service : {title}
      </h1>
      <h1 className="text-xl text-green-700 font-semibold mb-3">
        Price : $ {price}
      </h1>
      <div className=" border p-8 bg-zinc-300 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="FirstName"
            required
            placeholder="First name"
            className="input input-bordered input-md w-full"
          />
          <input
            name="LastName"
            required
            type="text"
            placeholder="Last name"
            className="input input-bordered input-md w-full"
          />
          <input
            name="phone"
            required
            type="text"
            placeholder="Your phone"
            className="input input-bordered input-md w-full"
          />
          <input
            type="text"
            name="email"
            required
            readOnly
            placeholder="Your email"
            defaultValue={user?.email}
            className="input input-bordered input-md w-full"
          />
        </div>
        <textarea
          name="massage"
          required
          className="textarea textarea-bordered h-24 w-full mt-2"
          placeholder="Your massage"
        ></textarea>
        <input
          className="bg-green-700 text-white px-4 py-1 rounded-md mt-4 ml-2"
          type="submit"
          value="submit"
        />
      </div>
      <Toaster />
    </form>
  );
};

export default CheckOut;
