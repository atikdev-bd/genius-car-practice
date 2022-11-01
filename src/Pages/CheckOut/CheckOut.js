import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const CheckOut = () => {
  const service = useLoaderData();
  const { title,price } = service;
  const {user} = useContext(AuthContext)
  return (
    <form>
        <h1 className="text-2xl text-orange-600 font-semibold mb-3">Service : {title}</h1>
        <h1 className="text-xl text-green-700 font-semibold mb-3">Price : $ {price}</h1>
      <div className=" border p-8 bg-zinc-300 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            className="input input-bordered input-md w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="input input-bordered input-md w-full"
          />
          <input
            type="text"
            placeholder="Your phone"
            className="input input-bordered input-md w-full"
          />
          <input
            type="text"
            readOnly
            placeholder="Your email"
            defaultValue={user?.email}
            className="input input-bordered input-md w-full"
          />
        </div>
        <button className="bg-green-700 text-white px-4 py-1 rounded-md mt-4 ml-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
