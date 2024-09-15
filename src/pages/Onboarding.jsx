import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import SidebarLayout from "../components/layout/sidebarLayout.jsx";
import { useStore } from "../store/store.jsx";
import { Menu } from "lucide-react";
import { ProgressBar } from "../components/ui/progressBar.jsx";
import { Step1, Step2, Step3, Step4 } from "../components/ui/progressBar.jsx";

const Onboarding = () => {
  const dummyEmployees = [
    {
      id: 21,
      username: "johndoe",
      email: "johndoe@example.com",
      company: "TechCorp",
      role: "admin",
    },
    {
      id: 22,
      username: "janedoe",
      email: "janedoe@example.com",
      company: "TechCorp",
      role: "employee",
    },
    {
      id: 23,
      username: "alice",
      email: "alice@example.com",
      company: "HealthPlus",
      role: "employee",
    },
    {
      id: 25,
      username: "brian",
      email: "brian@example.com",
      company: "HealthPlus",
      role: "admin",
    },
    {
      id: 33,
      username: "Tom",
      email: "tom@example.com",
      company: "TechCorp",
      role: "employee",
    },
    {
      id: 34,
      username: "Lisa",
      email: "lisa@example.com",
      company: "TechCorp",
      role: "employee",
    },
    {
      id: 23,
      username: "Duke",
      email: "dike@example.com",
      company: "HealthPlus",
      role: "employee",
    },
  ];

  const [employees, setEmployees] = useState(dummyEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    email: "",
    company: "",
    role: "employee",
  });
  const [employeeIdToRemove, setEmployeeIdToRemove] = useState("");
  const { activeModule, changeModule, discplinaryAction } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    position: "",
    hire_date: "",
    salary: "",
    bonus: "",
    deductions: { tax: "", insurance: "", other: "" },
    company: "",
    policiesAgreed: false,
    email: "",
    phoneNumber: "",
    status: "",
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { ...newEmployee, id: newId }]);
    setNewEmployee({ username: "", email: "", company: "", role: "employee" });
  };
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (entry) =>
      entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveEmployee = (e) => {
    e.preventDefault();
    setEmployees(
      employees.filter(
        (employee) => employee.id !== parseInt(employeeIdToRemove)
      )
    );
    setEmployeeIdToRemove("");
  };

  const steps = [
    {
      component: (
        <Step1
          nextStep={() => setStep(step + 1)}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      component: (
        <Step2
          nextStep={() => setStep(step + 1)}
          prevStep={() => setStep(step - 1)}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      component: (
        <Step3
          nextStep={() => setStep(step + 1)}
          prevStep={() => setStep(step - 1)}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      component: (
        <Step4 prevStep={() => setStep(step - 1)} formData={formData} />
      ),
    },
  ];

  const progress = Math.floor((step / steps.length) * 100);

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <SidebarLayout
          activeModule={activeModule}
          setActiveModule={changeModule}
        />
      )}
      <div className="flex-1 overflow-auto ">
        <div className="p-4 bg-white shadow-md flex justify-between items-center">
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu />
          </Button>
          <h1 className="text-xl font-bold">{activeModule}</h1>
        </div>
        <div className="p-6 space-y-8">
          <Card className="shadow-2xl p-4">
            <h2 className="text-2xl font-bold mb-4">Employee Onboarding</h2>
            <ProgressBar progress={progress} />
            <div className="mt-8">{steps[step - 1].component}</div>
          </Card>

          {/* Offboarding Section */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Offboard Employee</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRemoveEmployee} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID to Remove</Label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={employeeIdToRemove}
                    onChange={(e) => setEmployeeIdToRemove(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="mt-4">
                  Remove Employee
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Employees List */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Current Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search by employee name, action type, reason, or status"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">ID</th>
                      <th className="border p-2 text-left">Username</th>
                      <th className="border p-2 text-left">Email</th>
                      <th className="border p-2 text-left">Company</th>
                      <th className="border p-2 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="border p-2">{employee.id}</td>
                        <td className="border p-2">{employee.username}</td>
                        <td className="border p-2">{employee.email}</td>
                        <td className="border p-2">{employee.company}</td>
                        <td className="border p-2">{employee.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
