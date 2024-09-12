import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { useStore } from "../store/store.jsx";
import SidebarLayout from "../components/layout/sidebarLayout.jsx";

// Dummy data for leave entries
const initialLeaveData = [
  {
    id: 1,
    employeeName: "John Doe",
    leaveType: "Annual",
    startDate: "2024-09-15",
    endDate: "2024-09-20",
    status: "Approved",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    leaveType: "Sick",
    startDate: "2024-09-18",
    endDate: "2024-09-19",
    status: "Pending",
  },
  {
    id: 3,
    employeeName: "Bob Johnson",
    leaveType: "Personal",
    startDate: "2024-09-22",
    endDate: "2024-09-23",
    status: "Approved",
  },
  {
    id: 4,
    employeeName: "Alice Brown",
    leaveType: "Annual",
    startDate: "2024-09-25",
    endDate: "2024-09-29",
    status: "Rejected",
  },
  {
    id: 5,
    employeeName: "Charlie Davis",
    leaveType: "Sick",
    startDate: "2024-09-30",
    endDate: "2024-10-01",
    status: "Pending",
  },
];

const LeaveManagementModule = () => {
  const { activeModule, changeModule } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [newLeave, setNewLeave] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    changeModule("Leave Management");
  }, []);

  // Filter the leave data based on the search term
  const filteredLeaveData = leaveData.filter(
    (entry) =>
      entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = leaveData.length + 1;
    const newLeaveEntry = {
      id,
      ...newLeave,
    };
    setLeaveData((prev) => [...prev, newLeaveEntry]);
    setNewLeave({
      employeeName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
  };

  // Handle leave request approval
  const handleApprove = (id) => {
    setLeaveData((prevData) =>
      prevData.map((entry) =>
        entry.id === id ? { ...entry, status: "Approved" } : entry
      )
    );
  };

  // Handle leave request rejection
  const handleReject = (id) => {
    setLeaveData((prevData) =>
      prevData.map((entry) =>
        entry.id === id ? { ...entry, status: "Rejected" } : entry
      )
    );
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
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search by employee name, leave type, or status"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Employee Name</th>
                      <th className="border p-2 text-left">Leave Type</th>
                      <th className="border p-2 text-left">Start Date</th>
                      <th className="border p-2 text-left">End Date</th>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaveData.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="border p-2">{entry.employeeName}</td>
                        <td className="border p-2">{entry.leaveType}</td>
                        <td className="border p-2">{entry.startDate}</td>
                        <td className="border p-2">{entry.endDate}</td>
                        <td className="border p-2">{entry.status}</td>
                        <td className="border p-2">
                          {entry.status === "Pending" && (
                            <div className="space-x-2">
                              <Button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                                onClick={() => handleApprove(entry.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                onClick={() => handleReject(entry.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle>Request Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">Employee Name</Label>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      value={newLeave.employeeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <select
                      id="leaveType"
                      name="leaveType"
                      className="border-4 rounded-md p-2 w-full"
                      value={newLeave.leaveType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Annual">Annual</option>
                      <option value="Sick">Sick</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newLeave.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={newLeave.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <Button type="submit">Submit Leave Request</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementModule;
