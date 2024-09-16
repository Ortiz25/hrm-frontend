import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@headlessui/react"; // Assuming Button is from Headless UI or similar library
import SidebarLayout from "../components/layout/sidebarLayout";
import { Menu } from "lucide-react";
import { Input } from "../components/ui/input.jsx";
import { useStore } from "../store/store.jsx";
import { X } from "lucide-react";
import { Label } from "../components/ui/label.jsx";

// Dummy data for staff
const initialStaffData = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "IT",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager",
    department: "Operations",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
  },
  {
    id: 3,
    name: "Bob Johnson",
    position: "UI/UX Designer",
    department: "Design",
    email: "bob.johnson@example.com",
    phone: "345-678-9012",
  },
  {
    id: 4,
    name: "Alice Brown",
    position: "Data Analyst",
    department: "Analytics",
    email: "alice.brown@example.com",
    phone: "456-789-0123",
  },
  {
    id: 5,
    name: "Charlie Davis",
    position: "HR Specialist",
    department: "Human Resources",
    email: "charlie.davis@example.com",
    phone: "567-890-1234",
  },
];

const StaffManagementModule = () => {
  const [staffData, setStaffData] = useState(initialStaffData);
  const { activeModule, changeModule } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
  });
  const [editingStaff, setEditingStaff] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    changeModule("Staff Requisition");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingStaff) {
      setEditingStaff({ ...editingStaff, [name]: value });
    } else {
      setNewStaff({ ...newStaff, [name]: value });
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaffData = staffData.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phone.includes(searchTerm)
  );

  const handleAddStaff = () => {
    const id = staffData.length + 1;
    const newStaffMember = { id, ...newStaff };
    setStaffData([...staffData, newStaffMember]);
    setNewStaff({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStaff = () => {
    setStaffData(
      staffData.map((staff) =>
        staff.id === editingStaff.id ? editingStaff : staff
      )
    );
    setEditingStaff(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteStaff = (id) => {
    setStaffData(staffData.filter((staff) => staff.id !== id));
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
          <div className="bg-white shadow rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Staff Management</h2>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Request New Staff
              </Button>
            </div>
            <div className="m-4">
              <Input
                type="text"
                className="px-8"
                placeholder="Search by Name, Position, Department, Email, or Phone"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 font-bold py-2 bg-gray-100">
                    <div>Name</div>
                    <div>Position</div>
                    <div>Department</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Actions</div>
                  </div>
                  {filteredStaffData.map((staff) => (
                    <div
                      key={staff.id}
                      className="grid grid-cols-1 md:grid-cols-6 gap-4 py-2 border-b"
                    >
                      <div>{staff.name}</div>
                      <div>{staff.position}</div>
                      <div>{staff.department}</div>
                      <div>{staff.email}</div>
                      <div>{staff.phone}</div>
                      <div>
                        <Button
                          onClick={() => handleEditStaff(staff)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteStaff(staff.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Add Dialog */}
          <Dialog
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              aria-hidden="true"
            ></div>
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <X
                  className="absolute top-0 right-5 hover:border-2 hover:border-gray-900"
                  onClick={() => setIsAddDialogOpen(false)}
                />

                <h3 className="text-center text-lg font-semibold mb-4">
                  Add New Staff Member
                </h3>

                <div className="space-y-4">
                  {["name", "position", "department", "email", "phone"].map(
                    (field) => (
                      <div key={field} className="flex items-center space-x-4">
                        <Label
                          htmlFor={field}
                          className="text-right w-1/4 font-medium"
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Label>
                        <Input
                          id={field}
                          name={field}
                          value={newStaff[field]}
                          onChange={handleInputChange}
                          type={
                            field === "email"
                              ? "email"
                              : field === "phone"
                              ? "tel"
                              : "text"
                          }
                          className="border border-gray-300 p-2 w-full"
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <Button
                    onClick={() => setIsAddDialogOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddStaff}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
          >
            {/* ... Similar structure for the edit modal */}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default StaffManagementModule;
