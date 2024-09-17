import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button.jsx";
import {
  DownloadIcon,
  LayoutDashboard,
  CalendarDays,
  FileText,
  User,
  Clock,
  Target,
  Award,
  Menu,
} from "lucide-react";
import SidebarLayout from "../components/layout/sidebarLayout.jsx";
import { useState, useEffect } from "react";
import { useStore } from "../store/store.jsx";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import fs from "fs";

const employeeData = {
  name: "Alice Smith",
  position: "Senior Developer",
  employeeId: "EMP001",
  department: "Engineering",
  joinDate: "2020-03-15",
  payroll: [
    {
      month: "September 2024",
      salary: 85000,
      bonus: 7000,
      deductions: 20100,
      overtime: 8,
      leave: 1,
      netPay: 76300,
    },
    {
      month: "August 2024",
      salary: 85000,
      bonus: 5000,
      deductions: 19800,
      overtime: 6,
      leave: 2,
      netPay: 74700,
    },
    {
      month: "July 2024",
      salary: 85000,
      bonus: 6000,
      deductions: 20000,
      overtime: 7,
      leave: 0,
      netPay: 75500,
    },
  ],
  leaveBalance: {
    annual: 15,
    sick: 10,
    personal: 5,
  },
};

const EmployeeDashboard = () => {
  const { activeModule, changeModule } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    changeModule("Employee Dashboard");
  }, [changeModule]);

  const generatePayslipPDF = (entry) => {
    if (!entry) {
      console.error("Entry data is missing.");
      return;
    }
    console.log(entry);

    const doc = new jsPDF();

    // Create an image element
    const img = new Image();
    img.src = logo; // Using the imported logo

    img.onload = function () {
      try {
        const logoUrl = getBase64Image(img);

        doc.addImage(logoUrl, "PNG", 10, 10, 30, 30); // X, Y, Width, Height

        // Adding title and Employee Information
        doc.setFontSize(16);
        doc.text("Payslip", 105, 20, { align: "center" }); // Title below the logo
        doc.setFontSize(12);

        doc.text(`Employee Name: ${employeeData.name || "N/A"}`, 10, 50);
        doc.text(`Employee ID: ${employeeData.employeeId || "N/A"}`, 10, 60);
        doc.text(`Position: ${employeeData.position || "N/A"}`, 10, 70);
        doc.text(`Department: ${employeeData.department || "N/A"}`, 10, 80);
        doc.text(`Join Date: ${employeeData.joinDate || "N/A"}`, 10, 90);

        // Payroll section
        doc.text("Payroll Information", 10, 110);
        doc.setLineWidth(0.5);
        doc.line(10, 112, 200, 112); // Horizontal line for visual separation

        doc.text(`Month: ${entry.month || "N/A"}`, 10, 120);
        doc.text(
          `Basic Salary: KES ${
            entry.salary ? entry.salary.toLocaleString() : "N/A"
          }`,
          10,
          130
        );
        doc.text(
          `Bonus: KES ${entry.bonus ? entry.bonus.toLocaleString() : "N/A"}`,
          10,
          140
        );
        doc.text(
          `Deductions: KES ${
            entry.deductions ? entry.deductions.toLocaleString() : "N/A"
          }`,
          10,
          150
        );
        doc.text(`Overtime (hours): ${entry.overtime || "N/A"}`, 10, 160);
        doc.text(`Leave (days): ${entry.leave || "N/A"}`, 10, 170);
        doc.text(
          `Net Pay: KES ${
            entry.netPay ? entry.netPay.toLocaleString() : "N/A"
          }`,
          10,
          180
        );

        // Footer for system-generated notice
        doc.setFontSize(10);
        doc.text("This is a system generated payslip.", 10, 200);

        // Save the PDF
        doc.save(`Payslip_${entry.month || "Unknown"}.pdf`);
      } catch (error) {
        console.error("Error occurred while generating the PDF:", error);
      }
    };

    img.onerror = function () {
      console.error("Failed to load the image.");
    };

    // Function to convert image to base64
    function getBase64Image(img) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/png");
    }
  };

  //   const exportToExcel = () => {
  //     const payrollData = employeeData.payroll.map((entry) => ({
  //       Month: entry.month,
  //       Salary: entry.salary,
  //       Bonus: entry.bonus,
  //       Deductions: entry.deductions,
  //       Overtime: entry.overtime,
  //       Leave: entry.leave,
  //       "Net Pay": entry.netPay,
  //     }));

  //     const worksheet = XLSX.utils.json_to_sheet(payrollData);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll Data");

  //     // Download the Excel file
  //     XLSX.writeFile(workbook, "Payroll_Data.xlsx");
  //   };

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
        <div className="bg-gray-100 min-h-screen p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Employee Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => generatePayslipPDF(employeeData.payroll[0])}
                >
                  Generate Test Payslip
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xl font-semibold mr-2">Name:</span>
                    <span className="italic text-lg">{employeeData.name}</span>
                    <br />
                    <span className="text-xl font-semibold mr-2">
                      Position:
                    </span>
                    <span className="italic text-lg">
                      {employeeData.position}
                    </span>
                    <br />
                    <span className="text-xl font-semibold mr-2">
                      Employee ID:
                    </span>
                    <span className="italic text-lg">
                      {employeeData.employeeId}
                    </span>
                  </div>
                  <div>
                    <span className="text-xl font-semibold mr-2">
                      Department:{" "}
                    </span>
                    <span className="italic text-lg">
                      {employeeData.department}
                    </span>
                    <br />
                    <span className="text-xl font-semibold mr-2">
                      Join Date:{" "}
                    </span>
                    <span className="italic text-lg">
                      {employeeData.joinDate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <h4 className="font-semibold">Annual Leave</h4>
                    <p className="text-2xl font-bold">
                      {employeeData.leaveBalance.annual} days
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <h4 className="font-semibold">Sick Leave</h4>
                    <p className="text-2xl font-bold">
                      {employeeData.leaveBalance.sick} days
                    </p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <h4 className="font-semibold">Personal Leave</h4>
                    <p className="text-2xl font-bold">
                      {employeeData.leaveBalance.personal} days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payroll Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Month</th>
                        <th className="border p-2 text-left">Salary (KES)</th>
                        <th className="border p-2 text-left">Bonus (KES)</th>
                        <th className="border p-2 text-left">
                          Deductions (KES)
                        </th>
                        <th className="border p-2 text-left">Overtime (hrs)</th>
                        <th className="border p-2 text-left">Leave (days)</th>
                        <th className="border p-2 text-left">Net Pay (KES)</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeData.payroll.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border p-2">{entry.month}</td>
                          <td className="border p-2">
                            {entry.salary.toLocaleString()}
                          </td>
                          <td className="border p-2">
                            {entry.bonus.toLocaleString()}
                          </td>
                          <td className="border p-2">
                            {entry.deductions.toLocaleString()}
                          </td>
                          <td className="border p-2">{entry.overtime}</td>
                          <td className="border p-2">{entry.leave}</td>
                          <td className="border p-2">
                            {entry.netPay.toLocaleString()}
                          </td>
                          <td className="border p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generatePayslipPDF(entry)}
                            >
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              Payslip
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 flex justify-end">
                    <Button>
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Export to Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                View Full Dashboard
              </Button>
              <Button>
                <CalendarDays className="mr-2 h-4 w-4" />

                <Link to="/leave"> Request Leave</Link>
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />

                <Link to="/hrdocs"> View Documents</Link>
              </Button>
              <Button>
                <User className="mr-2 h-4 w-4" />

                <Link to="/profile">Update Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
