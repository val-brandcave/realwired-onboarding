"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useOnboarding } from "@/lib/onboarding-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SsoIntegration {
  id: string;
  provider: string;
  certificateUploaded: boolean;
  certificateName?: string;
}

export default function ITConfigPage() {
  const { state, updateCompanySetup, updateModuleProgress } = useOnboarding();
  const router = useRouter();
  
  // Track progress when user lands on this step
  useEffect(() => {
    updateModuleProgress('organization-setup', 4, 4); // Step 4 of 4 - 100%
  }, [updateModuleProgress]);

  // Authentication Method
  const [authMethod, setAuthMethod] = useState<'sso' | 'standard'>('sso');
  
  // Single SSO Integration
  const [ssoIntegration, setSsoIntegration] = useState<SsoIntegration>({
    id: '1',
    provider: '',
    certificateUploaded: false
  });
  
  // Password Management
  const [passwordMinLength, setPasswordMinLength] = useState(6);
  const [passwordMaxLength, setPasswordMaxLength] = useState(20);
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireLowercase, setRequireLowercase] = useState(true);
  const [requireNumber, setRequireNumber] = useState(true);
  const [requireSpecialChar, setRequireSpecialChar] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Advanced Password Options
  const [passwordExpirationType, setPasswordExpirationType] = useState<'none' | 'days' | 'logins'>('none');
  const [passwordExpirationDays, setPasswordExpirationDays] = useState(90);
  const [passwordExpirationLogins, setPasswordExpirationLogins] = useState(0);
  const [loginLockoutEnabled, setLoginLockoutEnabled] = useState(false);
  const [loginLockoutAttempts, setLoginLockoutAttempts] = useState(5);
  
  // IP Restrictions
  const [ipRestrictionsEnabled, setIpRestrictionsEnabled] = useState(state.companySetup.ipRestrictionsEnabled || false);
  const [ipWhitelist, setIpWhitelist] = useState<string[]>(state.companySetup.ipWhitelist || []);
  const [newIpAddress, setNewIpAddress] = useState("");
  
  // Session Timeout
  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(480);
  const [firstWarningTime, setFirstWarningTime] = useState(20);
  const [secondWarningTime, setSecondWarningTime] = useState(5);

  const handleSsoProviderChange = (value: string) => {
    setSsoIntegration({ ...ssoIntegration, provider: value });
  };

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSsoIntegration({
        ...ssoIntegration,
        certificateUploaded: true,
        certificateName: file.name
      });
    }
  };

  const handleCertificateRemove = () => {
    setSsoIntegration({
      ...ssoIntegration,
      certificateUploaded: false,
      certificateName: undefined
    });
  };

  const handleAddIpAddress = () => {
    if (newIpAddress.trim() && !ipWhitelist.includes(newIpAddress.trim())) {
      setIpWhitelist([...ipWhitelist, newIpAddress.trim()]);
      setNewIpAddress("");
    }
  };

  const handleRemoveIpAddress = (ip: string) => {
    setIpWhitelist(ipWhitelist.filter(i => i !== ip));
  };

  const handleContinue = () => {
    updateCompanySetup({
      ssoEnabled: authMethod === 'sso',
      ipRestrictionsEnabled,
      ipWhitelist: ipRestrictionsEnabled ? ipWhitelist : [],
      sessionTimeout: sessionTimeoutEnabled ? sessionTimeout : undefined
    });
    router.push('/organization-setup/complete');
  };

  const handleBack = () => {
    router.push('/organization-setup/participants');
  };

  const steps = [
    { id: '1', label: 'Organization Info', status: 'completed' as const },
    { id: '2', label: 'Branding', status: 'completed' as const },
    { id: '3', label: 'Participants', status: 'completed' as const },
    { id: '4', label: 'IT Config', status: 'in_progress' as const },
  ];

  return (
    <MainLayout 
      currentStep={3} 
      steps={steps}
      title="Organization Setup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            IT & Security Configuration
          </h1>
          <p className="text-base text-muted-foreground">
            Set up authentication and security policies for your organization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Authentication Method */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Authentication Method</h2>
              
              {/* Radio Button Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* SSO Card */}
                <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  authMethod === 'sso' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="auth-method"
                      value="sso"
                      checked={authMethod === 'sso'}
                      onChange={() => setAuthMethod('sso')}
                      className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <h3 className="font-semibold text-foreground">Single Sign-On</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use your existing identity provider (Okta, Azure AD, etc.)
                      </p>
                    </div>
                  </div>
                </label>

                {/* Standard Auth Card */}
                <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  authMethod === 'standard' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="auth-method"
                      value="standard"
                      checked={authMethod === 'standard'}
                      onChange={() => setAuthMethod('standard')}
                      className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h3 className="font-semibold text-foreground">Standard Authentication</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Username and password with customizable security policies
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* SSO Configuration */}
              {authMethod === 'sso' && (
                <div className="space-y-4">
                  {/* Download SSO Guide */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 mb-2">
                          SSO Configuration Guide
                        </p>
                        <p className="text-xs text-blue-800 mb-3">
                          Download our step-by-step guide to configure SSO with your identity provider.
                        </p>
                        <button 
                          onClick={() => console.log('Downloading SSO guide...')}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download SSO Setup Guide
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SSO Integration */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">SSO Integration</h3>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="space-y-3">
                        {/* Integration Type */}
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1.5">
                            Integration Type <span className="text-destructive">*</span>
                          </label>
                          <select
                            value={ssoIntegration.provider}
                            onChange={(e) => handleSsoProviderChange(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label="SSO Integration Type"
                          >
                            <option value="">Select integration type</option>
                            <option value="okta">Okta</option>
                            <option value="azure-ad">Azure Active Directory</option>
                            <option value="google-workspace">Google Workspace</option>
                            <option value="onelogin">OneLogin</option>
                            <option value="ping-identity">Ping Identity</option>
                            <option value="auth0">Auth0</option>
                            <option value="saml">SAML 2.0 (Generic)</option>
                            <option value="oidc">OpenID Connect</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Certificate Upload */}
                        {ssoIntegration.provider && (
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">
                              Upload Certificate/License <span className="text-destructive">*</span>
                            </label>
                            <div className={`border-2 border-dashed rounded-lg p-3 transition-colors ${
                              ssoIntegration.certificateUploaded ? 'border-green-300 bg-green-50' : 'border-border bg-white'
                            }`}>
                              {ssoIntegration.certificateUploaded ? (
                                <div className="flex items-center gap-2">
                                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="flex-1 text-xs font-medium text-green-900">{ssoIntegration.certificateName}</span>
                                  <button
                                    onClick={handleCertificateRemove}
                                    className="text-xs text-green-700 hover:text-green-900 font-medium"
                                  >
                                    Replace
                                  </button>
                                </div>
                              ) : (
                                <label className="cursor-pointer block">
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xml,.json,.cer,.crt,.pem"
                                    onChange={handleCertificateUpload}
                                    className="hidden"
                                  />
                                  <div className="flex items-center justify-center py-2">
                                    <svg className="w-8 h-8 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div>
                                      <p className="text-xs font-medium text-slate-700">Click to upload certificate</p>
                                      <p className="text-xs text-slate-500">PDF, XML, JSON, CER, CRT, PEM</p>
                                    </div>
                                  </div>
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Authentication */}
              {authMethod === 'standard' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Password Requirements</h3>
                    
                    {/* Min/Max Length */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="min-length" className="block text-xs font-medium text-foreground mb-1.5">
                          Minimum Length
                        </label>
                        <input
                          id="min-length"
                          type="number"
                          min="4"
                          max="20"
                          value={passwordMinLength}
                          onChange={(e) => setPasswordMinLength(parseInt(e.target.value))}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label htmlFor="max-length" className="block text-xs font-medium text-foreground mb-1.5">
                          Maximum Length
                        </label>
                        <input
                          id="max-length"
                          type="number"
                          min="6"
                          max="128"
                          value={passwordMaxLength}
                          onChange={(e) => setPasswordMaxLength(parseInt(e.target.value))}
                          className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>

                    {/* Character Requirements */}
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={requireUppercase}
                          onChange={(e) => setRequireUppercase(e.target.checked)}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          Must contain one upper case letter (A-Z)
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={requireLowercase}
                          onChange={(e) => setRequireLowercase(e.target.checked)}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          Must contain one lower case letter (a-z)
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={requireNumber}
                          onChange={(e) => setRequireNumber(e.target.checked)}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          Must contain one number (0-9)
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={requireSpecialChar}
                          onChange={(e) => setRequireSpecialChar(e.target.checked)}
                          className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          Must contain special characters (~,!,@,#,$,%,^,&,*,_,+,-)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Show Advanced Options Button */}
                  <button
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="w-full px-4 py-2.5 text-sm font-medium text-primary bg-white border-2 border-primary/30 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className={`w-4 h-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                  </button>

                  {/* Advanced Options */}
                  {showAdvancedOptions && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
                      {/* Password Expiration */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">User-Generated Password Expiration</h4>
                        
                        <div className="space-y-3">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="password-expiration"
                              checked={passwordExpirationType === 'none'}
                              onChange={() => setPasswordExpirationType('none')}
                              className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring"
                            />
                            <span className="text-sm text-foreground">None</span>
                          </label>
                          
                          <label className="flex items-center gap-2 flex-wrap">
                            <input
                              type="radio"
                              name="password-expiration"
                              checked={passwordExpirationType === 'days'}
                              onChange={() => setPasswordExpirationType('days')}
                              className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring"
                            />
                            <span className="text-sm text-foreground">Password Expires in</span>
                            {passwordExpirationType === 'days' && (
                              <select
                                value={passwordExpirationDays}
                                onChange={(e) => setPasswordExpirationDays(parseInt(e.target.value))}
                                className="ml-2 px-3 py-1.5 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                aria-label="Password expiration days"
                              >
                                <option value={30}>30</option>
                                <option value={60}>60</option>
                                <option value={90}>90</option>
                                <option value={180}>180</option>
                                <option value={365}>365</option>
                              </select>
                            )}
                            {passwordExpirationType === 'days' && <span className="text-sm text-foreground ml-1">Days</span>}
                          </label>

                          <label className="flex items-center gap-2 flex-wrap">
                            <input
                              type="radio"
                              name="password-expiration"
                              checked={passwordExpirationType === 'logins'}
                              onChange={() => setPasswordExpirationType('logins')}
                              className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring"
                            />
                            <span className="text-sm text-foreground">Password Expires upon</span>
                            {passwordExpirationType === 'logins' && (
                              <input
                                type="number"
                                value={passwordExpirationLogins}
                                onChange={(e) => setPasswordExpirationLogins(parseInt(e.target.value))}
                                className="w-20 px-2 py-1 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="0"
                              />
                            )}
                            {passwordExpirationType === 'logins' && <span className="text-sm text-foreground">logins</span>}
                          </label>
                        </div>
                      </div>

                      {/* Login Lockout */}
                      <div className="pt-4 border-t border-slate-300">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Login Lockout</h4>
                        
                        <div className="space-y-3">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="login-lockout"
                              checked={!loginLockoutEnabled}
                              onChange={() => setLoginLockoutEnabled(false)}
                              className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring"
                            />
                            <span className="text-sm text-foreground">None</span>
                          </label>
                          
                          <label className="flex items-center gap-2 flex-wrap">
                            <input
                              type="radio"
                              name="login-lockout"
                              checked={loginLockoutEnabled}
                              onChange={() => setLoginLockoutEnabled(true)}
                              className="w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring"
                            />
                            <span className="text-sm text-foreground">Lockout users after</span>
                            {loginLockoutEnabled && (
                              <input
                                type="number"
                                value={loginLockoutAttempts}
                                onChange={(e) => setLoginLockoutAttempts(parseInt(e.target.value))}
                                className="w-16 px-2 py-1 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                min="1"
                                max="10"
                              />
                            )}
                            {loginLockoutEnabled && <span className="text-sm text-foreground">un-successful login attempts</span>}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* IP Restrictions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-foreground">IP Address Restrictions</h2>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ipRestrictionsEnabled}
                        onChange={(e) => setIpRestrictionsEnabled(e.target.checked)}
                        className="sr-only peer"
                        aria-label="Enable IP Address Restrictions"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Restrict access to YouConnect from specific IP addresses or ranges
                  </p>
                </div>
              </div>

              {ipRestrictionsEnabled && (
                <div className="mt-4 pl-13 space-y-3">
                  <div>
                    <label htmlFor="ip-address" className="block text-sm font-medium text-foreground mb-2">
                      Allowed IP Addresses
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="ip-address"
                        type="text"
                        value={newIpAddress}
                        onChange={(e) => setNewIpAddress(e.target.value)}
                        placeholder="192.168.1.1 or 192.168.1.0/24"
                        className="flex-1 px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddIpAddress()}
                      />
                      <button
                        onClick={handleAddIpAddress}
                        disabled={!newIpAddress.trim()}
                        className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Add individual IPs or CIDR notation ranges
                    </p>
                  </div>

                  {ipWhitelist.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-foreground">Allowed IPs ({ipWhitelist.length})</h3>
                      <div className="space-y-1.5">
                        {ipWhitelist.map((ip) => (
                          <div key={ip} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <span className="text-sm font-mono text-foreground">{ip}</span>
                            <button
                              onClick={() => handleRemoveIpAddress(ip)}
                              className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                              aria-label={`Remove IP address ${ip}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ipWhitelist.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <p className="text-sm">No IP addresses added yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Session Timeout */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-foreground">Session Timeout</h2>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sessionTimeoutEnabled}
                        onChange={(e) => setSessionTimeoutEnabled(e.target.checked)}
                        className="sr-only peer"
                        aria-label="Enable Session Timeout"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users after a specified time period
                  </p>
                </div>
              </div>

              {sessionTimeoutEnabled && (
                <div className="mt-4 pl-13 space-y-4">
                  {/* Timeout Duration */}
                  <div>
                    <label htmlFor="session-timeout" className="block text-sm font-medium text-foreground mb-2">
                      Session Timeout Duration
                    </label>
                    <select
                      id="session-timeout"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                      className="w-full px-3 py-2.5 text-sm border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                    >
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={240}>4 hours</option>
                      <option value={480}>8 hours</option>
                      <option value={720}>12 hours</option>
                      <option value={1440}>24 hours</option>
                    </select>
                  </div>

                  {/* Warning Times */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Inactivity Warnings
                    </h4>
                    <p className="text-xs text-amber-800 mb-3">
                      Users will be warned before being automatically logged out
                    </p>

                    <div className="space-y-3">
                      {/* First Warning */}
                      <div>
                        <label htmlFor="first-warning" className="block text-xs font-medium text-amber-900 mb-1.5">
                          First Warning (minutes before timeout)
                        </label>
                        <select
                          id="first-warning"
                          value={firstWarningTime}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setFirstWarningTime(value);
                            if (secondWarningTime >= value) {
                              setSecondWarningTime(Math.max(1, value - 5));
                            }
                          }}
                          className="w-full px-3 py-2 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                        >
                          <option value={5}>5 minutes</option>
                          <option value={10}>10 minutes</option>
                          <option value={15}>15 minutes</option>
                          <option value={20}>20 minutes</option>
                          <option value={30}>30 minutes</option>
                        </select>
                      </div>

                      {/* Second Warning */}
                      <div>
                        <label htmlFor="second-warning" className="block text-xs font-medium text-amber-900 mb-1.5">
                          Second Warning (final reminder)
                        </label>
                        <select
                          id="second-warning"
                          value={secondWarningTime}
                          onChange={(e) => setSecondWarningTime(parseInt(e.target.value))}
                          className="w-full px-3 py-2 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                        >
                          <option value={1}>1 minute</option>
                          <option value={2}>2 minutes</option>
                          <option value={3}>3 minutes</option>
                          <option value={5}>5 minutes</option>
                          <option value={10}>10 minutes</option>
                        </select>
                        <p className="mt-1.5 text-xs text-amber-700">
                          Must be less than first warning ({firstWarningTime} min)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button 
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground bg-card border border-input rounded-lg hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleContinue}
                className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
              >
                Complete Setup →
              </button>
            </div>
          </div>

          {/* Right Column: Educational Panel (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 sticky top-20">
              {/* Why We Need This */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Why We Need This</h3>
                <p className="text-xs text-muted-foreground">
                  These security settings help protect your organization's data and ensure compliance with your security policies. All settings can be modified later.
                </p>
              </div>

              <div className="space-y-4">
                {/* Video Tutorial */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tutorial (4:20)
                  </h4>
                  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMWY1ZjkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMmU4ZjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE2MCIgcj0iMzAiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEzNSIgcj0iMjIiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IiM5NGE3YjgiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI4MCIgY3k9IjE0NSIgcj0iMjQiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9IjkwIiB5PSIxOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzY0NzQ4YiIgb3BhY2l0eT0iMC42IiByeD0iNSIvPjxyZWN0IHg9IjI1MCIgeT0iMjAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNzAiIGZpbGw9IiM2NDc0OGIiIG9wYWNpdHk9IjAuNiIgcng9IjUiLz48L3N2Zz4=')] bg-cover bg-center opacity-40"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg" aria-label="Play video: IT & Security Configuration">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">IT & Security Configuration</p>
                    </div>
                  </div>
                </div>

                {/* Resource Guides */}
                <div>
                  <h4 className="font-medium text-foreground text-xs mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Resource Guides
                  </h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => console.log('Downloading IT Security Checklist...')}
                      className="w-full px-3 py-2 text-xs font-medium text-foreground bg-card hover:bg-accent border border-border rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="flex-1 text-left">IT Security Checklist.pdf</span>
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>

                    <button 
                      onClick={() => console.log('Downloading SSO Setup Guide...')}
                      className="w-full px-3 py-2 text-xs font-medium text-foreground bg-card hover:bg-accent border border-border rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="flex-1 text-left">SSO Setup Guide.pdf</span>
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Note Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> If you need help with SSO configuration, our team will assist you after onboarding is complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
