// import React from "react";
// import InputField from "./InputField";

// const AuthForm = ({ title, fields, onSubmit }) => {
//   if (!fields || !onSubmit) {
//     throw new Error("AuthForm requires 'fields' and 'onSubmit' props.");
//   }

//   return (
//     <form onSubmit={onSubmit} className="auth-form">
//       <h2 className="text-xl font-bold mb-4">{title}</h2>
//       {fields.map((field, index) => (
//         <InputField
//           key={index}
//           type={field.type}
//           name={field.name}
//           placeholder={field.placeholder}
//           required={field.required}
//         />
//       ))}
//       <button
//         type="submit"
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AuthForm;
