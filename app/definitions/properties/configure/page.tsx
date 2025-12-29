"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PropertyRecordConfigurePage() {
  const router = useRouter();
  
  // Redirect to preview page (no template selection needed - one standard property record)
  useEffect(() => {
    router.replace('/definitions/properties/preview');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#9F2E2B] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading preview...</p>
      </div>
    </div>
  );
}
