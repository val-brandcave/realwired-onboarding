"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestOrder() {
  const router = useRouter();
  const { state } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Sample form data
  const [formData, setFormData] = useState({
    requestType: state.definitions.customRequestTypes[0]?.name || 'Residential Appraisal',
    propertyAddress: '123 Main Street',
    city: 'Springfield',
    state: state.companySetup.states[0] || 'IL',
    zipCode: '62701',
    loanOfficer: state.users.users[0]?.name || 'John Doe',
    loanAmount: '350000',
    purpose: 'Purchase',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission and routing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newOrderId = `TEST-${Date.now()}`;
    setOrderId(newOrderId);
    setOrderSubmitted(true);
    setIsSubmitting(false);
  };

  // Determine which routing would apply
  const getRoutingInfo = () => {
    const routes = state.routing.routes.filter(r => r.enabled);
    if (routes.length === 0) {
      return { method: 'Default Assignment', assignee: 'Unassigned' };
    }

    // Check priority order: Request Type (P1) → Logical (P2) → Assigned Area (P3)
    const requestTypeRoute = routes.find(r => r.type === 'request-type');
    if (requestTypeRoute) {
      const assignee = state.users.users.find(u => u.id === requestTypeRoute.config.jobManagerId);
      return {
        method: 'Request Type Job Manager (Priority 1)',
        assignee: assignee?.name || 'Job Manager',
        route: requestTypeRoute.name
      };
    }

    const logicalRoute = routes.find(r => r.type === 'logical');
    if (logicalRoute) {
      const assignee = state.users.users.find(u => u.id === logicalRoute.config.assigneeId);
      return {
        method: 'Logical Routing (Priority 2)',
        assignee: assignee?.name || 'Assigned User',
        route: logicalRoute.name
      };
    }

    const assignedAreaRoute = routes.find(r => r.type === 'assigned-area');
    if (assignedAreaRoute) {
      const assignee = state.users.users.find(u => u.id === assignedAreaRoute.config.assignedAreaJobManagerId);
      return {
        method: 'Assigned Area (Priority 3)',
        assignee: assignee?.name || 'Area Manager',
        route: assignedAreaRoute.name
      };
    }

    return { method: 'Default Assignment', assignee: 'Unassigned' };
  };

  const routingInfo = getRoutingInfo();

  if (orderSubmitted) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">Test Order Submitted!</h1>
            <p className="text-slate-600 mb-6">Your test order has been created and routed successfully.</p>

            {/* Order Details */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-slate-900 mb-4">Order Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Order ID:</span>
                  <span className="font-mono font-semibold text-slate-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Request Type:</span>
                  <span className="font-semibold text-slate-900">{formData.requestType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Property:</span>
                  <span className="font-semibold text-slate-900">{formData.propertyAddress}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 mt-3">
                  <span className="text-slate-600">Routing Method:</span>
                  <span className="font-semibold text-blue-600">{routingInfo.method}</span>
                </div>
                {routingInfo.route && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Route Name:</span>
                    <span className="font-semibold text-slate-900">{routingInfo.route}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Assigned To:</span>
                  <span className="font-semibold text-green-600">{routingInfo.assignee}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOrderSubmitted(false);
                  setOrderId('');
                }}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Create Another Test Order
              </button>
              <button
                onClick={() => router.push('/hub')}
                className="flex-1 px-6 py-3 bg-[#9F2E2B] hover:bg-[#8A2825] text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/hub')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Hub</span>
          </button>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create a Test Order</h1>
          <p className="text-slate-600">
            Try creating a sample order to see how your routing configuration works in action. All data is simulated.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">Order Information</h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Request Type */}
                <div>
                  <label htmlFor="request-type" className="block text-sm font-medium text-slate-700 mb-1">
                    Request Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="request-type"
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                    required
                  >
                    {state.definitions.customRequestTypes.map((rt) => (
                      <option key={rt.id} value={rt.name}>{rt.name}</option>
                    ))}
                  </select>
                </div>

                {/* Property Address */}
                <div>
                  <label htmlFor="property-address" className="block text-sm font-medium text-slate-700 mb-1">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="property-address"
                    type="text"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                        required
                      >
                        {state.companySetup.states.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zip-code" className="block text-sm font-medium text-slate-700 mb-1">
                        ZIP <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="zip-code"
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Loan Officer */}
                <div>
                  <label htmlFor="loan-officer" className="block text-sm font-medium text-slate-700 mb-1">
                    Loan Officer <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="loan-officer"
                    value={formData.loanOfficer}
                    onChange={(e) => setFormData({ ...formData, loanOfficer: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                    required
                  >
                    {state.users.users.filter(u => u.role === 'loan-officer').map((user) => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                    {state.users.users.filter(u => u.role === 'loan-officer').length === 0 && (
                      <option value="John Doe">John Doe (Sample)</option>
                    )}
                  </select>
                </div>

                {/* Loan Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="loan-amount" className="block text-sm font-medium text-slate-700 mb-1">
                      Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="loan-amount"
                      type="text"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                      placeholder="350000"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-slate-700 mb-1">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9F2E2B] focus:border-[#9F2E2B]"
                      required
                    >
                      <option value="Purchase">Purchase</option>
                      <option value="Refinance">Refinance</option>
                      <option value="Cash-out Refinance">Cash-out Refinance</option>
                      <option value="Home Equity">Home Equity</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="p-6 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#9F2E2B] hover:bg-[#8A2825] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Order...
                    </>
                  ) : (
                    'Submit Test Order'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Routing Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 sticky top-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Routing Preview
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                Based on your current routing configuration, this order will be processed as follows:
              </p>
              <div className="bg-white rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Routing Method</p>
                  <p className="text-sm font-semibold text-slate-900">{routingInfo.method}</p>
                </div>
                {routingInfo.route && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Route Name</p>
                    <p className="text-sm font-semibold text-slate-900">{routingInfo.route}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Will Be Assigned To</p>
                  <p className="text-sm font-semibold text-green-600">{routingInfo.assignee}</p>
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-4">
                This is a simulated test order. No actual work will be created.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

