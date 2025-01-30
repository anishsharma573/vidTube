// import React from "react";

// const InputField = ({
//   label,
//   type = "text",
//   name,
//   placeholder,
//   value,
//   onChange,
//   required = false,
//   errorMessage = "",
// }) => {
//   return (
//     <div className="mb-4">
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           {label}
//         </label>
//       )}
//       <input
//         type={type}
//         id={name}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className={`w-full px-4 py-2 border ${
//           errorMessage ? "border-red-500" : "border-gray-300"
//         } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
//       />
//       {errorMessage && (
//         <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;
