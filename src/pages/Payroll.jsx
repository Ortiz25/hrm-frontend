import React, { useEffect, useState } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
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
import Modal from "../components/ui/modal.jsx";

// Dummy data for payroll entries
const initialPayrollData = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    salary: 75000,
    bonus: 5000,
    deductions: 1000,
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager",
    salary: 85000,
    bonus: 7000,
    deductions: 1200,
  },
  {
    id: 3,
    name: "Bob Johnson",
    position: "UI/UX Designer",
    salary: 70000,
    bonus: 4000,
    deductions: 900,
  },
  {
    id: 4,
    name: "Alice Brown",
    position: "Data Analyst",
    salary: 72000,
    bonus: 3500,
    deductions: 950,
  },
  {
    id: 5,
    name: "Charlie Davis",
    position: "HR Specialist",
    salary: 65000,
    bonus: 3000,
    deductions: 800,
  },
];

const PayrollModule = () => {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [searchTerm, setSearchTerm] = useState("");
  const { activeModule, changeModule } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newEntry, setNewEntry] = useState({
    name: "",
    position: "",
    salary: "",
    bonus: "",
    deductions: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false); // For modal state
  const [currentEntry, setCurrentEntry] = useState(null); // Store the entry being edited

  useEffect(() => {
    changeModule("Payroll");
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPayrollData = payrollData.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = payrollData.length + 1;
    const netPay =
      Number(newEntry.salary) +
      Number(newEntry.bonus) -
      Number(newEntry.deductions);
    const newPayrollEntry = {
      id,
      ...newEntry,
      salary: Number(newEntry.salary),
      bonus: Number(newEntry.bonus),
      deductions: Number(newEntry.deductions),
      netPay: netPay,
    };
    setPayrollData((prev) => [...prev, newPayrollEntry]);
    setNewEntry({
      name: "",
      position: "",
      salary: "",
      bonus: "",
      deductions: "",
    });
  };

  const handleEditClick = (entry) => {
    setCurrentEntry(entry);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    setPayrollData((prev) =>
      prev.map((item) => (item.id === currentEntry.id ? currentEntry : item))
    );
    setEditModalOpen(false);
  };

  const calculateNetPay = (salary, bonus, deductions) => {
    return salary + bonus - deductions;
  };

  return (
    <>
      <div className="flex h-screen">
        {sidebarOpen && (
          <SidebarLayout
            activeModule={activeModule}
            setActiveModule={changeModule}
          />
        )}
        <div className="flex-1 overflow-auto">
          <div className="p-4 bg-white shadow-md flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              <Menu />
            </Button>
            <h1 className="text-xl font-bold">{activeModule}</h1>
          </div>
          <div className="p-4 space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Payroll Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Search by Employee name or Position"
                    className="focus:border-blue-400 w-full p-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Name</th>
                        <th className="border p-2 text-left">Position</th>
                        <th className="border p-2 text-left">Salary ($)</th>
                        <th className="border p-2 text-left">Bonus ($)</th>
                        <th className="border p-2 text-left">Deductions ($)</th>
                        <th className="border p-2 text-left">Net Pay ($)</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayrollData.map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="border p-2">{entry.name}</td>
                          <td className="border p-2">{entry.position}</td>
                          <td className="border p-2">
                            {entry.salary.toLocaleString()}
                          </td>
                          <td className="border p-2">
                            {entry.bonus.toLocaleString()}
                          </td>
                          <td className="border p-2">
                            {entry.deductions.toLocaleString()}
                          </td>
                          <td className="border p-2">
                            {calculateNetPay(
                              entry.salary,
                              entry.bonus,
                              entry.deductions
                            ).toLocaleString()}
                          </td>
                          <td className="border p-2">
                            <Button
                              variant="outline"
                              className="text-blue-500 border-blue-500 hover:bg-blue-100"
                              onClick={() => handleEditClick(entry)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Add New Payroll Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newEntry.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        value={newEntry.position}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary ($)</Label>
                      <Input
                        id="salary"
                        name="salary"
                        type="number"
                        value={newEntry.salary}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bonus">Bonus ($)</Label>
                      <Input
                        id="bonus"
                        name="bonus"
                        type="number"
                        value={newEntry.bonus}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deductions">Deductions ($)</Label>
                      <Input
                        id="deductions"
                        name="deductions"
                        type="number"
                        value={newEntry.deductions}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="netPay">Net Pay ($)</Label>
                      <Input
                        id="netPay"
                        name="netPay"
                        type="number"
                        value={
                          Number(newEntry.salary) +
                          Number(newEntry.bonus) -
                          Number(newEntry.deductions)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                        readOnly
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-blue-500 text-white">
                    Add Entry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Component for Editing Payroll Entry */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        {currentEntry && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Payroll Entry</h2>
              <Button variant="ghost" onClick={() => setEditModalOpen(false)}>
                <X />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Name</Label>
                <Input
                  id="editName"
                  name="name"
                  value={currentEntry.name}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPosition">Position</Label>
                <Input
                  id="editPosition"
                  name="position"
                  value={currentEntry.position}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editSalary">Salary ($)</Label>
                <Input
                  id="editSalary"
                  name="salary"
                  type="number"
                  value={currentEntry.salary}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      salary: Number(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editBonus">Bonus ($)</Label>
                <Input
                  id="editBonus"
                  name="bonus"
                  type="number"
                  value={currentEntry.bonus}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      bonus: Number(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDeductions">Deductions ($)</Label>
                <Input
                  id="editDeductions"
                  name="deductions"
                  type="number"
                  value={currentEntry.deductions}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      deductions: Number(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="editNetPay">Net Pay ($)</Label>
                <Input
                  id="editNetPay"
                  name="netPay"
                  type="number"
                  value={currentEntry.netPay}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      netPay: Number(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div> */}
              <Button
                onClick={handleUpdate}
                className="bg-green-500 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PayrollModule;
