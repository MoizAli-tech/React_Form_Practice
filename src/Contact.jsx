import React, { useState, useEffect } from "react";
import Joi, { func } from "joi"
import Zod from "zod"
import * as yup from "yup"

function Contact() {
  // state variables for form inputs
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
    terms: false
  });

  const [errors, setErr] = useState({});
  let Obj = {};



  let schema = Zod.object({
    name: Zod.string().nonempty({ message: "name is required" }).min(3,{message:"name must have 3 characters"}),
    email: Zod.string().nonempty({ message: "email is required" }),
    message: Zod.string().min(4, { message: "must be 4 characters" }).nonempty({ message: "message is required" }),
    terms: Zod.boolean().refine((val) => val === true, {
      message: "Terms must be checked",
      path: ["terms"],
    }),
  })

  async function errorHandler() {
    try {
      schema.parse(input)
      setInput({
        name: "",
        email: "",
        message: "",
        terms: false
      })
      setErr({})
    } catch (error) {

      error.issues.map((item) => {
         Obj = {...Obj,[item.path[0]]: item.message}
      })
      setErr(Obj)
    }
  }



  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    errorHandler()
  };

  return (

    <div className="contact h-screen border-2 border-emerald-300 p-8 flex justify-center bg-emerald-500">

      <div className="bg-emerald-600  shadow-sm shadow-black flex flex-col align-center justify-center rounded-md w-1/2 p-4 ">
        <h1 className="text-4xl text-white text-center p-2">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group flex flex-col">

          <label htmlFor="name" className={errors.name? "text-red-500 " : ""}>{errors.name? errors.name : "Name"}</label>
            <input
              type="text"
              className="border-2 border-teal-500  w-1/2 focus:outline-none focus:border-emerald-700  rounded-md m-1"
              id="name"
              value={input.name}
              onChange={(e) => {
                setInput({ ...input, name: e.target.value })
              }}
            />
          </div>
          <div className="form-group flex flex-col">
          <label htmlFor="email" className={errors.email? "text-red-500 " : ""}>{errors.email? errors.email : "Email"}</label>
            <input
              type="email"
              id="email"
              value={input.email}
              className="border-2  w-1/2 border-teal-500 focus:border-teal-600 focus:outline-none rounded-md m-1"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
          <div className="form-group flex flex-col">
          <label htmlFor="message" className={errors.message? "text-red-500 " : ""}>{errors.message? errors.message: "Message"}</label>
            <textarea
              id="message"
              value={input.message}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              className="border-2 border-teal-500 focus:outline-none focus:border-teal-600 rounded-md m-1"
            />
          </div>
          <div className="form-group">
          <p  className={errors.terms? "text-red-500 " : ""}>{errors.terms? errors.terms: ""}</p>

            <input
              type="checkbox"
              id="terms"
              checked={input.terms}
              className="border-2 border-teal-600 focus:outline-none mx-2"
              onChange={(e) => setInput({ ...input, terms: !input.terms })}
            />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
          <div className="mt-4  flex align-center justify-center">
            <button type="submit"
              className="bg-emerald-400 rounded-md px-4 py-1 hover:bg-emerald-700">
              Send</button>
          </div>

        </form>

      </div>
    </div>
  )

}

export default Contact;
