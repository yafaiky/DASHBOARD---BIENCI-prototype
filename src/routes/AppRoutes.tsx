import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { WorkforcePage } from '../pages/workforce/WorkforcePage';
import { LabourCostPage } from '../pages/labour-cost/LabourCostPage';
import { TurnoverPage } from '../pages/turnover/TurnoverPage';
import { AttendancePage } from '../pages/attendance/AttendancePage';
import { StorePerformancePage } from '../pages/store-performance/StorePerformancePage';
import { IndustrialRelationPage } from '../pages/industrial-relation/IndustrialRelationPage';
import { CompliancePage } from '../pages/compliance/CompliancePage';
import { EmployeesPage } from '../pages/employees/EmployeesPage';
import { RecentEmployeesPage } from '../pages/employees/RecentEmployeesPage';
import { EmployeeHistoryPage } from '../pages/employees/EmployeeHistoryPage';
import { EmployeeDetailPage } from '../pages/employees/EmployeeDetailPage';
import { ImportPage } from '../pages/import/ImportPage';
import { ImportHistoryPage } from '../pages/import/ImportHistoryPage';
import { TrashPage } from '../pages/trash/TrashPage';
import { MasterDataPage } from '../pages/master-data/MasterDataPage';
import { UsersPage } from '../pages/users/UsersPage';
import { RolesPage } from '../pages/users/RolesPage';
import { ActivityLogPage } from '../pages/activity-log/ActivityLogPage';
import { SettingsPage } from '../pages/settings/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Workforce */}
        <Route path="workforce" element={<WorkforcePage />} />
        <Route path="workforce/:tab" element={<WorkforcePage />} />

        {/* Labour Cost */}
        <Route path="labour-cost" element={<LabourCostPage />} />
        <Route path="labour-cost/:tab" element={<LabourCostPage />} />

        {/* Turnover */}
        <Route path="turnover" element={<TurnoverPage />} />
        <Route path="turnover/:tab" element={<TurnoverPage />} />

        {/* Attendance */}
        <Route path="attendance" element={<AttendancePage />} />

        {/* Store Performance */}
        <Route path="store-performance" element={<StorePerformancePage />} />

        {/* Industrial Relation & Risk */}
        <Route path="industrial-relation" element={<IndustrialRelationPage />} />
        <Route path="industrial-relation/:tab" element={<IndustrialRelationPage />} />

        {/* Compliance */}
        <Route path="compliance" element={<CompliancePage />} />

        {/* Employees */}
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/recent" element={<RecentEmployeesPage />} />
        <Route path="employees/history" element={<EmployeeHistoryPage />} />
        <Route path="employees/:id" element={<EmployeeDetailPage />} />

        {/* Data Management */}
        <Route path="import" element={<ImportPage />} />
        <Route path="import/history" element={<ImportHistoryPage />} />
        <Route path="trash" element={<TrashPage />} />

        {/* Administration */}
        <Route path="master-data" element={<MasterDataPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="activity-log" element={<ActivityLogPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};
