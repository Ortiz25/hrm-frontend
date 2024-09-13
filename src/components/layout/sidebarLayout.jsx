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
import "./tooltip.css"; //

const SidebarLayout = ({ activeModule, setActiveModule }) => {
  const [hoveredModule, setHoveredModule] = useState(null);
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
      {/* Sidebar with responsive width */}
      <div className="bg-gray-800 text-white w-20 md:w-80 min-h-screen p-4 relative">
        {/* Logo and heading */}
        <div className="flex items-center justify-center md:justify-start mb-10">
          <Shield className="mr-0 md:mr-2" />
          <h1 className="hidden md:block text-2xl font-bold">SecureHR</h1>
        </div>

        {/* Navigation */}
        <nav className="relative">
          {modules.map((module) => (
            <div
              key={module.name}
              className="relative flex flex-col items-center md:flex-row"
              onMouseEnter={() => setHoveredModule(module.name)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <NavLink
                to={`/${module.route}`}
                className={`flex items-center justify-center md:justify-start w-full p-2 mt-4 rounded-md ${
                  activeModule === module.name
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveModule(module.name)}
              >
                {/* Icon */}
                <module.icon className="w-full md:w-auto" size={24} />
                {/* Module name - visible only on md and above */}
                <span className="hidden md:inline-block ml-2">
                  {module.name}
                </span>
              </NavLink>

              {/* Tooltip widget for module name on hover (only for screens smaller than md) */}
              {hoveredModule === module.name && (
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 md:hidden bg-gray-900 text-white p-2 rounded-lg shadow-lg z-20">
                  {module.name}
                  {/* Callout (tail) */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-4 left-4">
          <button className="flex items-center justify-center md:justify-start text-gray-400 hover:text-white">
            <LogOut className="mr-0 md:mr-2" size={24} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>

      {/* Outlet to render pages */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
