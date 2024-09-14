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
  ];

  const [employees, setEmployees] = useState(dummyEmployees);
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    email: "",
    company: "",
    role: "employee",
  });
  const [employeeIdToRemove, setEmployeeIdToRemove] = useState("");
  const { activeModule, changeModule, discplinaryAction } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { ...newEmployee, id: newId }]);
    setNewEmployee({ username: "", email: "", company: "", role: "employee" });
  };

  const handleRemoveEmployee = (e) => {
    e.preventDefault();
    setEmployees(
      employees.filter(
        (employee) => employee.id !== parseInt(employeeIdToRemove)
      )
    );
    setEmployeeIdToRemove("");
  };

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <SidebarLayout
          activeModule={activeModule}
          setActiveModule={changeModule}
        />
      )}
      <div className="flex-1 overflow-auto">
        <div className="p-4 bg-white shadow-md flex justify-between items-center">
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu />
          </Button>
          <h1 className="text-xl font-bold">{activeModule}</h1>
        </div>
        <div className="p-4 space-y-6">
          {/* Onboarding Section */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle>Onboard Employee</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={newEmployee.username}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          username: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={newEmployee.company}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          company: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      name="role"
                      className="border-4 rounded-md p-2 w-full"
                      value={newEmployee.role}
                      onChange={(e) =>
                        setNewEmployee({ ...newEmployee, role: e.target.value })
                      }
                    >
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Add Employee
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Offboarding Section */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle>Offboard Employee</CardTitle>
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
              <CardTitle>Current Employees</CardTitle>
            </CardHeader>
            <CardContent>
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
                    {employees.map((employee) => (
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
