import React, { useState } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  UserPlus,
  Shield,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const SidebarLayout = ({ activeModule, setActiveModule }) => {
  const modules = [
    { name: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
    { name: "Payroll", icon: DollarSign, route: "payroll" },
    { name: "Leave Management", icon: Calendar, route: "leave" },
    { name: "Disciplinary Management", icon: FileText, route: "disciplinary" },
    { name: "Staff Requisition", icon: UserPlus, route: "staff" },
    { name: "Admin Settings", icon: Settings, route: "admin" },
  ];

  return (
    <div className="flex">
      <div className="bg-gray-800 text-white w-80 min-h-screen p-4">
        <div className="flex items-center mb-10">
          <Shield className="mr-2 size-10" />
          <h1 className="text-2xl font-bold">SecureHR</h1>
        </div>
        <nav>
          {modules.map((module) => (
            <NavLink
              to={`/${module.route}`}
              key={module.name}
              className={`flex items-center w-full p-2 mt-4 rounded ${
                activeModule === module.name
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveModule(module.name)}
            >
              <module.icon className="mr-2" size={18} />
              {module.name}
            </NavLink>
          ))}
        </nav>
        <div></div>
        <div className="absolute bottom-4 left-4">
          <button className="flex items-center text-gray-400 hover:text-white">
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
