import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfigCommon";

const About = () => {
   const [contacts, setContacts] = useState([]);

   useEffect(() => {
      const getAllContact = async () => {
         const res = await axios.get("contacts");
         setContacts(res.data.data);
      };
      getAllContact();
   }, []);

   return (
      <section>
         <h2 className="heading text-center">Danh sách liên hệ</h2>
         <div className="grid grid-cols-3 gap-10">
            {contacts.map((contact) => (
               <div
                  key={contact._id}
                  className="border border-solid border-primaryColor rounded-md p-5 text-center"
               >
                  <div>{contact.email}</div>
                  <div>{contact.topic}</div>
                  <div>{contact.message}</div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default About;
