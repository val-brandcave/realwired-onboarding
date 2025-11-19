"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter, useParams } from "next/navigation";
import { useState, useMemo } from "react";

// Module configuration mapping
const MODULE_CONFIG = {
  'organization-setup': {
    title: 'Organization Setup',
    tabs: [
      { id: 'org-info', label: 'Organization Info & URL' },
      { id: 'branding', label: 'Branding' },
      { id: 'participants', label: 'Onboarding Participants' },
      { id: 'it-config', label: 'IT Configuration' },
    ],
    editPath: '/organization-setup',
  },
  'definitions': {
    title: 'Definitions',
    tabs: [
      { id: 'property-categories', label: 'Property Categories' },
      { id: 'property-fields', label: 'Property Fields' },
      { id: 'request-types', label: 'Request Types' },
      { id: 'request-form', label: 'Request Form' },
    ],
    editPath: '/definitions',
  },
  'users': {
    title: 'Users Setup',
    tabs: [
      { id: 'user-roles', label: 'User Roles' },
      { id: 'lending-groups', label: 'Lending Groups' },
    ],
    editPath: '/users',
  },
  'vendors': {
    title: 'Vendors',
    tabs: [
      { id: 'vendor-upload', label: 'Vendor Upload' },
      { id: 'vendor-types', label: 'Vendor Types' },
      { id: 'vendor-classifications', label: 'Classifications' },
      { id: 'vendor-geography', label: 'Geography' },
    ],
    editPath: '/vendors',
  },
  'routing': {
    title: 'Routing',
    tabs: [
      { id: 'routing-method', label: 'Routing Method' },
      { id: 'routing-config', label: 'Configuration' },
    ],
    editPath: '/routing-setup',
  },
  'general-settings': {
    title: 'General Settings',
    tabs: [
      { id: 'general-config', label: 'Configuration' },
    ],
    editPath: '/general-settings',
  },
  'it-checklist': {
    title: 'IT Checklist',
    tabs: [
      { id: 'checklist-items', label: 'Checklist Items' },
    ],
    editPath: '/it-checklist',
  },
};

export default function ModuleReviewPage() {
  const { state } = useOnboarding();
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [activeTab, setActiveTab] = useState(0);

  const moduleConfig = MODULE_CONFIG[moduleId as keyof typeof MODULE_CONFIG];

  // Check if user is assigned to this module
  const moduleAssignment = state.moduleAssignments.find(a => a.moduleId === moduleId);
  const currentUserId = 'primary-decision-maker'; // In real app, get from auth
  const isAssigned = moduleAssignment?.assignedParticipantIds.includes(currentUserId);

  // Check if module is completed
  const isModuleCompleted = useMemo(() => {
    switch (moduleId) {
      case 'organization-setup':
        return state.companySetup.completed;
      case 'definitions':
        return state.definitions.completed;
      case 'users':
        return state.users.completed;
      case 'vendors':
        return state.moduleStatuses['vendors'] === 'completed';
      case 'routing':
        return state.routing.completed;
      case 'general-settings':
        return state.generalSettings.completed;
      case 'it-checklist':
        return state.itChecklist.completed;
      default:
        return false;
    }
  }, [moduleId, state]);

  if (!moduleConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  // Render review content based on module and tab
  const renderTabContent = () => {
    const tab = moduleConfig.tabs[activeTab];
    
    if (moduleId === 'organization-setup') {
      if (tab.id === 'org-info') {
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReviewField label="Organization Name" value={state.companySetup.organizationName || 'Union Bank'} />
              <ReviewField label="Custom URL" value={`${state.companySetup.customUrl || 'union-bank'}.realwired.com`} />
            </div>
          </div>
        );
      } else if (tab.id === 'branding') {
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReviewField label="Primary Color" value={state.companySetup.primaryColor || '#9F2E2B'} colorPreview />
              <ReviewField label="Secondary Color" value={state.companySetup.secondaryColor || '#7D2522'} colorPreview />
            </div>
            <ReviewField label="Logo" value={state.companySetup.logoUrl ? 'Uploaded' : state.companySetup.brandingSkipped ? 'Skipped' : 'Not set'} />
            <ReviewField label="Secondary Logo" value={state.companySetup.secondaryLogoUrl ? 'Uploaded' : 'Not set'} />
          </div>
        );
      } else if (tab.id === 'participants') {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Primary Decision Maker</h3>
            {state.companySetup.primaryDecisionMaker && (
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: state.companySetup.primaryDecisionMaker.avatarColor }}>
                    {state.companySetup.primaryDecisionMaker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{state.companySetup.primaryDecisionMaker.name}</p>
                    <p className="text-sm text-muted-foreground">{state.companySetup.primaryDecisionMaker.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-foreground mt-6">Additional Participants</h3>
            {state.companySetup.additionalParticipants && state.companySetup.additionalParticipants.length > 0 ? (
              <div className="space-y-2">
                {state.companySetup.additionalParticipants.map((participant) => (
                  <div key={participant.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: participant.avatarColor }}>
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.email}</p>
                        {participant.role && <p className="text-xs text-slate-500">{participant.role}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No additional participants added</p>
            )}
          </div>
        );
      } else if (tab.id === 'it-config') {
        return (
          <div className="space-y-6">
            <ReviewField label="SSO Enabled" value={state.companySetup.ssoEnabled ? 'Yes' : 'No'} />
            {state.companySetup.ssoEnabled && (
              <ReviewField label="SSO Provider" value={state.companySetup.ssoProvider || 'Not specified'} />
            )}
            <ReviewField label="IP Restrictions" value={state.companySetup.ipRestrictionsEnabled ? 'Enabled' : 'Disabled'} />
            {state.companySetup.ipRestrictionsEnabled && state.companySetup.ipWhitelist && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Whitelisted IPs</label>
                <ul className="list-disc list-inside text-muted-foreground">
                  {state.companySetup.ipWhitelist.map((ip, idx) => (
                    <li key={idx}>{ip}</li>
                  ))}
                </ul>
              </div>
            )}
            <ReviewField label="MFA Required" value={state.companySetup.mfaRequired ? 'Yes' : 'No'} />
            <ReviewField label="Session Timeout" value={state.companySetup.sessionTimeout ? `${state.companySetup.sessionTimeout} minutes` : 'Default'} />
          </div>
        );
      }
    } else if (moduleId === 'definitions') {
      if (tab.id === 'property-categories') {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Property Categories</h3>
            {state.definitions.propertyCategories.length > 0 ? (
              <div className="space-y-3">
                {state.definitions.propertyCategories.map((category) => (
                  <div key={category.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{category.name}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">{category.type}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Property Types:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.propertyTypes.map((type, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 text-xs rounded">{type}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No property categories configured</p>
            )}
          </div>
        );
      } else if (tab.id === 'property-fields') {
        const enabledFields = state.definitions.propertyRecordFields.filter(f => f.enabled);
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Enabled Property Fields ({enabledFields.length})</h3>
            {enabledFields.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enabledFields.map((field) => (
                  <div key={field.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{field.customLabel || field.label}</p>
                        <p className="text-xs text-muted-foreground capitalize">{field.type}</p>
                      </div>
                      {field.required && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No property fields enabled</p>
            )}
          </div>
        );
      } else if (tab.id === 'request-types') {
        const enabledTypes = state.definitions.requestTypes?.filter(t => t.enabled) || [];
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Enabled Request Types ({enabledTypes.length})</h3>
            {enabledTypes.length > 0 ? (
              <div className="space-y-2">
                {enabledTypes.map((type) => (
                  <div key={type.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.category}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">{type.processType || '2-step'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No request types configured</p>
            )}
          </div>
        );
      } else if (tab.id === 'request-form') {
        const enabledFields = state.definitions.requestFormFields.filter(f => f.enabled);
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Enabled Request Form Fields ({enabledFields.length})</h3>
            {enabledFields.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enabledFields.map((field) => (
                  <div key={field.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{field.customLabel || field.label}</p>
                        <p className="text-xs text-muted-foreground capitalize">{field.type}</p>
                      </div>
                      {field.required && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No request form fields enabled</p>
            )}
          </div>
        );
      }
    } else if (moduleId === 'users') {
      if (tab.id === 'user-roles') {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Users ({state.users.users.length})</h3>
            {state.users.users.length > 0 ? (
              <div className="space-y-2">
                {state.users.users.map((user) => (
                  <div key={user.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-slate-500 mt-1">Role: {user.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No users added</p>
            )}
          </div>
        );
      } else if (tab.id === 'lending-groups') {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Lending Groups ({state.users.lendingGroups.length})</h3>
            {state.users.lendingGroups.length > 0 ? (
              <div className="space-y-2">
                {state.users.lendingGroups.map((group) => (
                  <div key={group.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="font-semibold text-foreground">{group.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{group.members.length} member(s)</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No lending groups configured</p>
            )}
          </div>
        );
      }
    } else if (moduleId === 'routing') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Routing Rules ({state.routing.routes.length})</h3>
          {state.routing.routes.length > 0 ? (
            <div className="space-y-2">
              {state.routing.routes.map((route) => (
                <div key={route.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="font-semibold text-foreground">{route.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">Priority: {route.priority}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No routing rules configured</p>
          )}
        </div>
      );
    } else if (moduleId === 'general-settings') {
      return (
        <div className="space-y-6">
          <ReviewField label="Email Notifications" value={state.generalSettings.emailNotifications ? 'Enabled' : 'Disabled'} />
          <ReviewField label="Auto-Assignment" value={state.generalSettings.autoAssignment ? 'Enabled' : 'Disabled'} />
        </div>
      );
    } else if (moduleId === 'it-checklist') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">IT Checklist Status</h3>
          <ReviewField label="Checklist Status" value={state.itChecklist.completed ? 'Completed' : 'In Progress'} />
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Review content for this section is not yet available.</p>
      </div>
    );
  };

  const steps = moduleConfig.tabs.map((tab, idx) => ({
    id: String(idx + 1),
    label: tab.label,
    status: 'completed' as const,
  }));

  return (
    <MainLayout currentStep={0} steps={steps} title={moduleConfig.title}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Review: {moduleConfig.title}
            </h1>
            <p className="text-base text-muted-foreground">
              {isModuleCompleted ? 'Review your completed module configuration' : 'Review your module configuration'}
            </p>
          </div>
          <button
            onClick={() => router.push('/hub')}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-input rounded-lg hover:bg-accent transition-colors"
          >
            ← Back to Hub
          </button>
        </div>

        {/* Permission Notice - Read-only for unassigned users */}
        {!isAssigned && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">Read-Only Access</p>
                <p className="text-sm text-blue-700">You are not assigned to this module, so you can review but cannot edit the configuration.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Interface */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-border bg-slate-50">
            <div className="flex overflow-x-auto">
              {moduleConfig.tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === idx
                      ? 'text-primary border-b-2 border-primary bg-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={() => router.push('/hub')}
            className="px-5 py-2.5 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent transition-colors"
          >
            Back to Hub
          </button>
          {isAssigned && isModuleCompleted && (
            <button
              onClick={() => router.push(`${moduleConfig.editPath}`)}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#9F2E2B] to-[#7D2522] rounded-lg hover:from-[#8A2826] hover:to-[#6B1F1D] transition-all shadow-lg"
            >
              Edit Configuration
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// Helper component for displaying review fields
function ReviewField({ label, value, colorPreview }: { label: string; value: string; colorPreview?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <div className="flex items-center gap-2">
        {colorPreview && (
          <div
            className="w-6 h-6 rounded border border-slate-300"
            style={{ backgroundColor: value }}
          />
        )}
        <p className="text-base text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

