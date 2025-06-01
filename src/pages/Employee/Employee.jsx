import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const initialEmployees = [
  {
    id: 1001,
    name: "Tomas Alex",
    email: "tomas@gmail.com",
    phone: "09545241",
    role: "Head Staff",
  },
  {
    id: 1002,
    name: "Robin Albert",
    email: "robin@gmail.com",
    phone: "09545242",
    role: "Sub-head Staff",
  },
  {
    id: 1003,
    name: "Moron Joroz",
    email: "moron@gmail.com",
    phone: "09545243",
    role: "General Staff",
  },
  {
    id: 1004,
    name: "Alen Albert",
    email: "alen@gmail.com",
    phone: "09545244",
    role: "General Staff",
  },
];

const Employee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation(); // Use the i18next hook for translation

  // Form state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
  });

  const handleRemove = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewEmployee = () => {
    if (
      !newEmployee.name ||
      !newEmployee.role ||
      !newEmployee.email ||
      !newEmployee.phone
    ) {
      alert("Please fill all fields");
      return;
    }
    const newId = employees.length
      ? Math.max(...employees.map((emp) => emp.id)) + 1
      : 1001;
    const employeeToAdd = { id: newId, ...newEmployee };
    setEmployees([...employees, employeeToAdd]);
    setNewEmployee({ name: "", role: "", email: "", phone: "" });
    setShowModal(false);
  };

  return (
    <div className="my-10 px-4 md:px-8 font-sans text-gray-900">
      <h2 className="text-3xl font-bold mb-8">{t("employee.employee")}</h2>

      {/* Employees Details Section */}
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-md mb-10">
        <h3 className="text-xl font-semibold mb-1">
          {t("employee.emp_details")}
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          {t("employee.manage_employees")}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-6 transition"
        >
          {t("employee.add_employee")}
        </button>

        <table className="w-full border-collapse text-[12px] md:text-sm">
          <thead>
            <tr>
              <th className="text-left font-semibold pb-3 border-b border-gray-300 text-gray-700">
                {" "}
                {t("employee.name")}
              </th>
              <th className="text-left font-semibold pb-3 border-b border-gray-300 text-gray-700">
                {" "}
                {t("employee.designation")}
              </th>
              <th className="text-left font-semibold pb-3 border-b border-gray-300 text-gray-700">
                {t("employee.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map(({ id, name, role }) => (
              <tr key={id} className="hover:bg-gray-50 transition ">
                <td className="py-3 border-b border-gray-200">{name}</td>
                <td className="py-3 border-b border-gray-200">{role}</td>
                <td className="py-3 border-b border-gray-200">
                  <button
                    onClick={() => handleRemove(id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition"
                  >
                    {t("common.remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Employee Details Section */}
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-md mb-10">
        <h3 className="text-xl font-semibold mb-1">
          {t("employee.emp_details")}
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          {t("employee.manage_employees")}
        </p>

        <table className="w-full border-collapse ">
          <thead>
            <tr className="text-[9px] md:text-sm">
              <th className="text-left font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700">
                {" "}
                {t("employee.name")}
              </th>
              <th className="text-left font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700">
                {" "}
                {t("employee.designation")}
              </th>
              <th className="text-left font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700">
                {t("employee.id")}
              </th>
              <th className="text-left font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700">
                {t("employee.email")}
              </th>
              <th className="text-left font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700">
                {t("employee.phone")}
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map(({ id, name, role, email, phone }) => (
              <tr
                key={id}
                className="hover:bg-gray-50 transition text-[9px] md:text-sm"
              >
                <td className="py-2 px-1 md:px-3 border-b border-gray-200">
                  {name}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200">
                  {role}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200">
                  {id}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200">
                  {email}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200">
                  {phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#9A9A9A50]  flex justify-center items-center z-50 font-Roboto">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-blue-900 text-center">
              {t("employee.add_employee")}
            </h3>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.emp_name")}
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                placeholder={t('employee.placeholder.name')}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
             {t("employee.designation")}
              <input
                type="text"
                name="role"
                value={newEmployee.role}
                placeholder={t('employee.placeholder.designation')}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.email")}
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                placeholder={t('employee.placeholder.email')}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.phone")}
              <input
                type="text"
                name="phone"
                value={newEmployee.phone}
                placeholder={t('employee.placeholder.phone')}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 transition"
              onClick={handleAddNewEmployee}
            >
              {t('employee.add')}
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-2 transition"
              onClick={() => setShowModal(false)}
            >
              {t('employee.cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
