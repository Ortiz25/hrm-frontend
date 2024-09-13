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
import SidebarLayout from "../components/layout/sidebarLayout.jsx";
import { useStore } from "../store/store.jsx";

// Dummy data for disciplinary actions
const initialDisciplinaryData = [
  {
    id: 1,
    employeeName: "John Doe",
    actionType: "Verbal Warning",
    date: "2024-09-10",
    reason: "Late arrival",
    status: "Closed",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    actionType: "Written Warning",
    date: "2024-09-15",
    reason: "Unauthorized absence",
    status: "Open",
  },
  {
    id: 3,
    employeeName: "Bob Johnson",
    actionType: "Performance Improvement Plan",
    date: "2024-09-20",
    reason: "Missed deadlines",
    status: "In Progress",
  },
  {
    id: 4,
    employeeName: "Alice Brown",
    actionType: "Suspension",
    date: "2024-09-25",
    reason: "Violation of company policy",
    status: "Open",
  },
  {
    id: 5,
    employeeName: "Charlie Davis",
    actionType: "Final Warning",
    date: "2024-09-30",
    reason: "Insubordination",
    status: "Closed",
  },
];

const DisciplinaryModule = () => {
  const {
    activeModule,
    changeModule,
    discplinaryAction,
    removeDiscplinaryAction,
  } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [disciplinaryData, setDisciplinaryData] = useState(
    initialDisciplinaryData
  );
  const [newAction, setNewAction] = useState({
    employeeName: "",
    actionType: "",
    date: "",
    reason: "",
    status: "Open",
  });
  useEffect(() => {
    changeModule("Disciplinary Management");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAction((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle the search term input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInProgress = (id) => {
    setDisciplinaryData((prevData) =>
      prevData.map((entry) =>
        entry.id === id ? { ...entry, status: "In Progress" } : entry
      )
    );
  };

  const handleClose = (id) => {
    setDisciplinaryData((prevData) =>
      prevData.map((entry) =>
        entry.id === id ? { ...entry, status: "Closed" } : entry
      )
    );
  };

  // Filter the data based on the search term
  const filteredData = disciplinaryData.filter(
    (entry) =>
      entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = disciplinaryData.length + 1;
    const newActionEntry = {
      id,
      ...newAction,
    };
    setDisciplinaryData((prev) => [...prev, newActionEntry]);
    setNewAction({
      employeeName: "",
      actionType: "",
      date: "",
      reason: "",
      status: "Open",
    });
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
              <CardTitle>Disciplinary Actions</CardTitle>
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
                      <th className="border p-2 text-left">Employee Name</th>
                      <th className="border p-2 text-left">Action Type</th>
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Reason</th>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="border p-2">{entry.employeeName}</td>
                        <td className="border p-2">{entry.actionType}</td>
                        <td className="border p-2">{entry.date}</td>
                        <td className="border p-2">{entry.reason}</td>
                        <td className="border p-2">{entry.status}</td>
                        <td className="border p-2">
                          {entry.status !== "Closed" && (
                            <div className="space-x-2">
                              {entry.status === "Open" && (
                                <Button
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                  onClick={() => handleInProgress(entry.id)}
                                >
                                  In Progress
                                </Button>
                              )}
                              {entry.status === "In Progress" && (
                                <Button
                                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                                  onClick={() => handleClose(entry.id)}
                                >
                                  Close
                                </Button>
                              )}
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
              <CardTitle>Record Disciplinary Action</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">Employee Name</Label>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      value={newAction.employeeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="actionType">Action Type</Label>
                    <select
                      id="actionType"
                      name="actionType"
                      className="border-4 rounded-md p-2 w-full"
                      value={newAction.actionType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Action Type</option>
                      {discplinaryAction.map((action) => {
                        return (
                          <option value={action} key={action}>
                            {action}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newAction.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      className="border-4 rounded-md p-2 w-full"
                      value={newAction.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <textarea
                    id="reason"
                    name="reason"
                    className="border-4  rounded-md p-2 w-full"
                    value={newAction.reason}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit">Record Disciplinary Action</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DisciplinaryModule;
