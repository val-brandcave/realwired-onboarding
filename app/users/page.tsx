"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding, type UserRole } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function UsersPage() {
  const { state, addUser, deleteUser, updateUsers } = useOnboarding();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    role: 'job-manager' as UserRole 
  });
  const [uploadingCSV, setUploadingCSV] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate initials from name
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleAddUser = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) return;
    
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    addUser({
      name: fullName,
      email: formData.email.trim(),
      role: formData.role,
      active: true,
    });
    
    setFormData({ firstName: '', lastName: '', email: '', role: 'job-manager' });
    setIsAdding(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to remove this user?')) {
      deleteUser(userId);
    }
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCSV(true);
    
    // Simulate CSV processing
    setTimeout(() => {
      // In a real implementation, this would parse the CSV
      // For now, we'll just add a sample user
      addUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'loan-officer',
        active: true,
      });
      addUser({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'job-manager',
        active: true,
      });
      
      setUploadingCSV(false);
      alert('CSV uploaded successfully! 2 users added.');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const handleContinue = () => {
    router.push('/users/lending-groups');
  };

  const canProceed = state.users.users.length > 0;

  const roleLabels: Record<UserRole, string> = {
    'bank-admin': 'Bank Admin',
    'job-manager': 'Job Manager',
    'loan-officer': 'Loan Officer',
  };

  const roleDescriptions: Record<UserRole, string> = {
    'bank-admin': 'Full system access and configuration',
    'job-manager': 'Oversee orders, manage vendors, and review submissions',
    'loan-officer': 'Submit orders and track request status',
  };

  const steps = [
    { id: '1', label: 'Add Users', status: 'in_progress' as const },
    { id: '2', label: 'Assign Roles', status: 'not_started' as const },
  ];

  return (
    <MainLayout 
      currentStep={0} 
      steps={steps}
      title="Team & Groups Setup"
      showWalkthrough={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Add Your Team
              </h1>
              <p className="text-base text-muted-foreground">
                Add users and assign roles. You can add users individually or bulk upload via CSV.
              </p>
            </div>

            {/* CSV Upload Button */}
            <div className="mb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all cursor-pointer ${
                  uploadingCSV
                    ? 'bg-muted text-muted-foreground border-border cursor-wait'
                    : 'text-primary bg-primary/10 border-primary/30 hover:bg-primary/20'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {uploadingCSV ? 'Uploading...' : 'Bulk Upload CSV'}
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Upload a CSV with columns: First Name, Last Name, Email, Role
              </p>
            </div>

            {/* Users List */}
            <div className="space-y-3 mb-6">
              {state.users.users.map((user) => (
                <div key={user.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 ${getAvatarColor(user.name)} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-semibold text-sm">
                        {getInitials(user.name)}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground mb-1">{user.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{user.email}</div>
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {roleLabels[user.role]}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      aria-label={`Remove ${user.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {state.users.users.length === 0 && !isAdding && (
                <div className="text-center py-8 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                  <svg className="w-10 h-10 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm text-muted-foreground">No users added yet</p>
                </div>
              )}
            </div>

            {/* Add User Form */}
            {isAdding ? (
              <div className="bg-card border-2 border-primary rounded-lg p-6 mb-6">
                <h3 className="text-base font-semibold text-foreground mb-4">User #{state.users.users.length + 1}</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First name"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last name"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="user@example.com"
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label htmlFor="user-role" className="block text-sm font-medium text-foreground mb-1">
                      Role <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="user-role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="bank-admin">Bank Admin</option>
                      <option value="job-manager">Job Manager</option>
                      <option value="loan-officer">Loan Officer</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddUser}
                      disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()}
                      className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Add User
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setFormData({ firstName: '', lastName: '', email: '', role: 'job-manager' });
                      }}
                      className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full px-4 py-3 text-sm font-medium text-primary bg-primary/10 border-2 border-dashed border-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                + Add Another User
              </button>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={() => router.push('/hub')}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back to Hub
              </button>
              <button 
                onClick={handleContinue}
                disabled={!canProceed}
                className={`px-6 py-3 text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all ${
                  canProceed
                    ? 'text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] hover:from-[#8A2826] hover:to-[#6B1F1D] shadow-lg hover:shadow-xl'
                    : 'text-muted-foreground bg-muted cursor-not-allowed'
                }`}
              >
                {canProceed ? 'Next →' : 'Add at least one user'}
              </button>
            </div>
          </div>

          {/* Right Rail: Role Guide & Educational Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-semibold text-foreground">User Roles Guide</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Assign the right role to each user based on their responsibilities in your workflow.
              </p>

              {/* Role Descriptions */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div>
                  <div className="font-medium text-foreground text-sm mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Bank Admin
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {roleDescriptions['bank-admin']}. Can configure system settings and manage all aspects.
                  </p>
                </div>

                <div>
                  <div className="font-medium text-foreground text-sm mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Job Manager
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {roleDescriptions['job-manager']}. Primary day-to-day operators.
                  </p>
                </div>

                <div>
                  <div className="font-medium text-foreground text-sm mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Loan Officer
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {roleDescriptions['loan-officer']}. Limited to their own orders.
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-medium text-foreground text-sm mb-3">Tips</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Start with 1-2 admins and your job managers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Add loan officers later as needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>You can edit roles anytime from settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>CSV upload supports bulk adding teams</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
