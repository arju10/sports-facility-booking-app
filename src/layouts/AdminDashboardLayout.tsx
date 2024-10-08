import { Link, Outlet, useLocation } from 'react-router-dom';

import { useState } from 'react';
import Copyright from '../pages/Shared/Copyright';
import TopNavbar from '../pages/Shared/TopNavbar';

const AdminDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  const items = [
    {
      key: 'adminDashboard',
      //   icon: <DesktopOutlined />,
      label: 'Dashboard',
      to: '/adminDashboard',
    },
    {
      key: 'Sports Facilities',
      //   icon: <ShoppingCartOutlined />,
      label: 'Facility',
      to: '/admin/facilities',
    },
    {
      key: 'RequisitionAuthorization',
      //   icon: <ShoppingCartOutlined />,
      label: 'Requisition(Authorize)',
      to: '/RequisitionAuthorization',
    },
    {
      key: 'requisionApp',
      //   icon: <ShoppingCartOutlined />,
      label: 'Requisition(Approval)',
      to: '/requisitionApp',
    },
    {
      key: 'requisitionIssue',
      //   icon: <ShoppingCartOutlined />,
      label: 'Requisition(issue)',
      to: '/IssuedRequisition',
    },
    {
      key: 'issuedRequisition',
      //   icon: <ShoppingCartOutlined />,
      label: 'Issued Requisition',
      to: '/issuedRequisition',
    },
    {
      key: 'allInventory',
      //   icon: <ShoppingCartOutlined />,
      label: 'Add Inventory',
      to: '/allInventory',
    },
    {
      key: 'currentStock',
      //   icon: <ShoppingCartOutlined />,
      label: 'Current Stock',
      to: '/currentStock',
    },
    {
      key: 'stockAdjust',
      //   icon: <ShoppingCartOutlined />,
      label: 'Stock Adjust',
      to: '/stockAdjust',
    },
    {
      key: 'suppliers',
      //   icon: <BlockOutlined />,
      label: 'Suppliers',
      to: '/allSuppliers',
    },
    {
      key: 'products',
      //   icon: <VerticalAlignBottomOutlined />,
      label: 'Products',
      to: '/allProducts',
    },
    {
      key: 'reports',
      //   icon: <FileOutlined />,
      label: 'Reports',
      subMenu: [
        {
          key: 'productIssue',
          //   icon: <LogoutOutlined />,
          label: 'ProductIssue',
          to: '/productIssue',
        },
        {
          key: 'inventory',
          //   icon: <LogoutOutlined />,
          label: 'Inventory',
          to: '/inventory',
        },
        {
          key: 'employeeUser',
          //   icon: <LogoutOutlined />,
          label: 'Employee/User',
          to: '/employeeUser',
        },
      ],
    },
    {
      key: 'employee',
      //   icon: <TeamOutlined />,
      label: 'Employee',
      to: '/allEmployees',
    },
    {
      key: 'userManagement',
      //   icon: <UserOutlined />,
      label: 'User Management',
      to: '/userManagement',
    },
    {
      key: 'settings',
      //   icon: <SettingOutlined />,
      label: 'Settings',
      subMenu: [
        {
          key: 'department',
          //   icon: <LogoutOutlined />,
          label: 'Department',
          to: '/department',
        },
        {
          key: 'designation',
          //   icon: <LogoutOutlined />,
          label: 'Designation',
          to: '/designation',
        },
        {
          key: 'productKeys',
          //   icon: <LogoutOutlined />,
          label: 'Product Key',
          to: '/productKeys',
        },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      <div
        className={`flex flex-col bg-gray-800 text-white ${collapsed ? 'w-16' : 'w-64'} transition-width duration-200 `}
      >
        {/* <div className="flex items-center justify-center p-4">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            GOINNOVIOR
          </Link>
        </div> */}
        <nav className="flex-1 overflow-y-auto ">
          <ul className="menu p-2">
            {items.map((item) =>
              item.subMenu ? (
                <li key={item.key} className="my-1">
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                  >
                    {/* <span className="text-lg">{item.icon}</span> */}
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {settingsOpen && (
                    <ul className="pl-8">
                      {item.subMenu.map((subItem) => (
                        <li
                          key={subItem.key}
                          className={`my-1 ${isActive(subItem.to) ? 'bg-blue-500 text-white' : ''}`}
                        >
                          <Link
                            to={subItem.to}
                            className="flex items-center gap-4"
                          >
                            {/* <span className="text-lg">{subItem.icon}</span> */}
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li
                  key={item.key}
                  className={`my-1 ${isActive(item.to) ? 'bg-blue-500 text-white' : ''}`}
                >
                  <Link to={item.to} className="flex items-center gap-4">
                    {/* <span className="text-lg">{item.icon}</span> */}
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col flex-1 ">
        <TopNavbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* <TopNavigationBar /> */}
        <div className="overflow-y-auto ">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
