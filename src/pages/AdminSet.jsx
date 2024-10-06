import React, { useEffect, useState } from "react";
import {
  Menu,
  Moon,
  Sun,
  PlusCircle,
  Trash2,
  UserPlus,
  MoreHorizontal,
  Key,
  Edit,
  TriangleAlert,
} from "lucide-react";
import {
  Description,
  Dialog as Dialog1,
  DialogPanel as DialogPanel1,
  DialogTitle as DialogTitle1,
} from "@headlessui/react";
import { useStore } from "../store/store.jsx";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button1,
} from "../components/ui/dropdownMenu.jsx";
import SidebarLayout from "../components/layout/sidebarLayout";
import { AlertTriangle } from "lucide-react";

const AdminSettingsModule = () => {
  const { activeModule, changeModule, disciplinaryAction } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leaveTypes, setLeaveTypes] = useState(["Annual", "Sick", "Personal"]);
  const [newLeaveType, setNewLeaveType] = useState("");
  const [newActionType, setNewActionType] = useState("");
  const [settings, setSettings] = useState({
    autoApproveLeaves: false,
    maxConsecutiveLeaves: 14,
    notifyManagerOnLeaveRequest: true,
    enforceProgressiveDiscipline: true,
    theme: "light",
  });
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Employee",
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bob@example.com",
      role: "Super Admin",
    },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "User",
  });
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserActionModalOpen, setIsUserActionModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    changeModule("Admin Settings");
  }, [changeModule]);

  const handleAddLeaveType = () => {
    if (newLeaveType && !leaveTypes.includes(newLeaveType)) {
      setLeaveTypes([...leaveTypes, newLeaveType]);
      setNewLeaveType("");
    }
  };

  const handleThemeChange = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const handleAddActionType = () => {
    if (newActionType && !disciplinaryAction.includes(newActionType)) {
      useStore.setState({
        disciplinaryAction: [...disciplinaryAction, newActionType],
      });
      setNewActionType("");
    }
  };

  const handleAddUser = () => {
    if (
      newUser.name &&
      newUser.email &&
      newUser.password === newUser.cpassword
    ) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        role: "User",
      });
      setIsAddUserModalOpen(false);
    } else {
      alert(
        "Please ensure all fields are filled correctly and passwords match."
      );
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setIsUserActionModalOpen(false);
  };

  const openUserActionModal = (user) => {
    setSelectedUser(user);
    setIsUserActionModalOpen(true);
  };

  const handleResetPassword = (userId) => {
    console.log(`Password reset for user ${userId}`);
    setIsResetPasswordModalOpen(false);
    // Implement actual password reset logic here
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setEditUserData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
    });
    setIsEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUserSubmit = () => {
    if (
      editUserData.name &&
      editUserData.email &&
      editUserData.role
      // You can add more validation if needed
    ) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...editUserData,
                password: undefined,
                confirmPassword: undefined,
              }
            : user
        )
      );
      closeEditUserModal();
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const openResetPasswordModal = (user) => {
    setSelectedUser(user);
    setIsResetPasswordModalOpen(true);
  };

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
    setSelectedUser(null);
    setEditUserData({
      ...editUserData,
      password: "",
      confirmPassword: "",
    });
  };

  const handleResetPasswordSubmit = () => {
    if (
      editUserData.password &&
      editUserData.password === editUserData.confirmPassword
    ) {
      // Implement password reset logic here, e.g., API call
      console.log(`Password reset for user ${selectedUser.id}`);
      // Optionally, update the user's password in state if needed
      closeResetPasswordModal();
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleRemoveLeaveType = (type) => {
    setLeaveTypes(leaveTypes.filter((t) => t !== type));
  };

  const handleRemoveActionType = (type) => {
    useStore.setState({
      disciplinaryAction: disciplinaryAction.filter((t) => t !== type),
    });
  };

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  return (
    <div className={`flex h-screen ${settings.theme === "dark" ? "dark" : ""}`}>
      {sidebarOpen && (
        <SidebarLayout
          activeModule={activeModule}
          setActiveModule={changeModule}
        />
      )}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold dark:text-white">{activeModule}</h1>
          <Button variant="ghost" onClick={handleThemeChange}>
            {settings.theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="leave">
                <TabsList className="grid w-full grid-cols-4 bg-gray-200">
                  <TabsTrigger value="leave">Leave</TabsTrigger>
                  <TabsTrigger value="disciplinary">Disciplinary</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                <TabsContent value="leave" className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Leave Types</h3>
                  <ul className="space-y-2">
                    {leaveTypes.map((type) => (
                      <li
                        key={type}
                        className="flex justify-between items-center"
                      >
                        {type}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveLeaveType(type)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <Input
                      value={newLeaveType}
                      onChange={(e) => setNewLeaveType(e.target.value)}
                      placeholder="New leave type"
                    />
                    <Button onClick={handleAddLeaveType}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="disciplinary" className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Disciplinary Action Types
                  </h3>
                  <ul className="space-y-2">
                    {disciplinaryAction?.map((type) => (
                      <li
                        key={type}
                        className="flex justify-between items-center"
                      >
                        {type}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveActionType(type)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <Input
                      value={newActionType}
                      onChange={(e) => setNewActionType(e.target.value)}
                      placeholder="New action type"
                    />
                    <Button onClick={handleAddActionType}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="general" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Auto-approve leave requests</span>
                    <Switch
                      checked={settings.autoApproveLeaves}
                      onCheckedChange={(value) =>
                        handleSettingChange("autoApproveLeaves", value)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Maximum consecutive leave days</span>
                    <Input
                      type="number"
                      value={settings.maxConsecutiveLeaves}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxConsecutiveLeaves",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notify manager on leave request</span>
                    <Switch
                      checked={settings.notifyManagerOnLeaveRequest}
                      onCheckedChange={(value) =>
                        handleSettingChange(
                          "notifyManagerOnLeaveRequest",
                          value
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enforce progressive discipline</span>
                    <Switch
                      checked={settings.enforceProgressiveDiscipline}
                      onCheckedChange={(value) =>
                        handleSettingChange(
                          "enforceProgressiveDiscipline",
                          value
                        )
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="users" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">User Management</h3>
                    <Dialog
                      open={isAddUserModalOpen}
                      onOpenChange={setIsAddUserModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                          <UserPlus className="h-4 w-4 mr-2" /> Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800">
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Fill in the details to add a new user to the system.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={newUser.name}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employee-id" className="text-right">
                              Employee ID/No:
                            </Label>
                            <Input
                              id="employee-id"
                              value={newUser.employeeId || ""}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  employeeId: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={newUser.email}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  email: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                              Password
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              value={newUser.password}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  password: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cpassword" className="text-right">
                              Confirm Password
                            </Label>
                            <Input
                              id="cpassword"
                              type="password"
                              value={newUser.cpassword}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  cpassword: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                              Role
                            </Label>
                            <Select
                              value={newUser.role}
                              onValueChange={(value) =>
                                setNewUser({ ...newUser, role: value })
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-200">
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Employee">
                                  Employee
                                </SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Super Admin">
                                  Super Admin
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleAddUser}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Add User
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-lg font-bold">
                          Name
                        </TableHead>
                        <TableHead className="text-lg font-bold">
                          Email
                        </TableHead>
                        <TableHead className="text-lg font-bold">
                          Role
                        </TableHead>
                        <TableHead className="text-right text-lg font-bold">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button1
                                  variant="ghost"
                                  className="h-8 w-8 p-1"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-6 w-6" />
                                </Button1>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-200"
                              >
                                <DropdownMenuLabel className="font-bold text-md">
                                  Actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => openEditUserModal(user)}
                                  className="hover:bg-gray-400"
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="hover:bg-gray-400"
                                  onClick={() => openResetPasswordModal(user)}
                                >
                                  <Key className="mr-2 h-4 w-4" /> Reset
                                  Password
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="hover:bg-gray-400"
                                  onClick={() => openUserActionModal(user)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete User */}
      <Dialog1
        open={isUserActionModalOpen}
        onClose={() => {
          setIsUserActionModalOpen(!isUserActionModalOpen);
        }}
      >
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-center">
              <AlertTriangle className="inline mr-4 size-10 text-red-500" />
              Delete User !!
            </h3>
            <p>
              Are you sure you want to delete{" "}
              <span className="text-red-500 font-bold">
                {selectedUser?.name}
              </span>
              ? This action cannot be undone !!!
            </p>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={() => handleDeleteUser(selectedUser?.id)}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete User
              </Button>
              <Button
                variant="outlinehandleResetPassword"
                onClick={() => setIsUserActionModalOpen(false)}
                className="outline outline-offset-2 outline-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Dialog1>

      {/* Edit User */}
      <Dialog1
        open={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(isEditUserModalOpen);
        }}
      >
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-center">Edit User !</h3>
            <p>Modify the user details below</p>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-left">
                  Name:
                </Label>
                <Input
                  id="edit-name"
                  value={editUserData.name}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-left">
                  Email:
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editUserData.email}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-left">
                  Role:
                </Label>
                <Select
                  value={editUserData.role}
                  onValueChange={(value) =>
                    setEditUserData({ ...editUserData, role: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-200">
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handleEditUserSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={closeEditUserModal}
                className="outline outline-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Dialog1>

      {/* Reset Password Modal */}
      <Dialog1
        open={isResetPasswordModalOpen}
        onClose={() => {
          setIsResetPasswordModalOpen(!isResetPasswordModalOpen);
        }}
      >
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Reset Password !
            </h3>
            <p>
              Enter a new password for{" "}
              <span className="font-bold text-red-500">
                {selectedUser?.name}
              </span>{" "}
              .
            </p>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-password" className="text-right">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={editUserData.password || ""}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      password: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirm-password" className="text-right">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={editUserData.confirmPassword || ""}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={() => {
                  // Validate passwords
                  if (
                    editUserData.password &&
                    editUserData.password === editUserData.confirmPassword
                  ) {
                    handleResetPasswordSubmit();
                  } else {
                    alert("Passwords do not match!");
                  }
                }}
                className="bg-green-500 hover:bg-red-600 text-white"
              >
                Reset Password
              </Button>
              <Button
                variant="outline"
                onClick={closeResetPasswordModal}
                className="outline outline-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Dialog1>
    </div>
  );
};

export default AdminSettingsModule;
