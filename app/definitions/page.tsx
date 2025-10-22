"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DefinitionsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to property categories as the first step
    router.push('/definitions/property-categories');
  }, [router]);

  return (
    <MainLayout 
      currentStep={0} 
      steps={[]}
      title="Definitions"
      showWalkthrough={false}
    >
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </MainLayout>
  );
}

