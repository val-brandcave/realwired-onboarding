"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PropertyRecordConfigurePage() {
  const router = useRouter();
  
  // Redirect to overview page (Step 1 of 2)
  useEffect(() => {
    router.replace('/definitions/properties/configure/overview');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#9F2E2B] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Overview...</p>
      </div>
    </div>
  );
}
