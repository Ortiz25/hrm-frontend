import React, { useState } from "react";
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
import { Dialog } from "@headlessui/react";

// Sample data for disciplinary actions
const initialDisciplinaryData = [
  {
    id: 1,
    employeeName: "John Doe",
    actionType: "Warning",
    date: "2024-09-01",
    reason: "Late to work",
    status: "Open",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    actionType: "Suspension",
    date: "2024-09-10",
    reason: "Unapproved leave",
    status: "In Progress",
  },
  {
    id: 3,
    employeeName: "Emily Johnson",
    actionType: "Termination",
    date: "2024-09-15",
    reason: "Misconduct",
    status: "Closed",
  },
];

const DisciplinaryModule = () => {
  const { activeModule, changeModule } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [disciplinaryData, setDisciplinaryData] = useState(
    initialDisciplinaryData
  );
  const [selectedAction, setSelectedAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = (action) => {
    setSelectedAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAction(null);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setDisciplinaryData((prevData) =>
      prevData.map((entry) =>
        entry.id === id ? { ...entry, status: newStatus } : entry
      )
    );
  };

  const filteredData = disciplinaryData.filter(
    (entry) =>
      entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      <th className="border p-2 text-left w-1/6">Actions</th>
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
                          <Button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
                            onClick={() => handleOpenModal(entry)}
                          >
                            Actions
                          </Button>
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
              {/* Form for adding a new disciplinary action (same as before) */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal for disciplinary action */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-sm bg-white p-6 rounded">
            <Dialog.Title className="text-lg font-bold mb-4">
              Disciplinary Action Details
            </Dialog.Title>
            {selectedAction && (
              <div>
                <p>
                  <strong>Employee Name:</strong> {selectedAction.employeeName}
                </p>
                <p>
                  <strong>Action Type:</strong> {selectedAction.actionType}
                </p>
                <p>
                  <strong>Date:</strong> {selectedAction.date}
                </p>
                <p>
                  <strong>Reason:</strong> {selectedAction.reason}
                </p>
                <p>
                  <strong>Status:</strong> {selectedAction.status}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  {selectedAction.status === "Open" && (
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() =>
                        handleUpdateStatus(selectedAction.id, "In Progress")
                      }
                    >
                      Mark as In Progress
                    </Button>
                  )}
                  {selectedAction.status === "In Progress" && (
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() =>
                        handleUpdateStatus(selectedAction.id, "Closed")
                      }
                    >
                      Mark as Closed
                    </Button>
                  )}
                  <Button onClick={handleCloseModal}>Close</Button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default DisciplinaryModule;
