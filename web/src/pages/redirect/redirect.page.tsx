import { useParams } from "react-router-dom";
import { RedirectCard } from "@/shared/components/redirect-card";
import { MainLayout } from "@/shared/layouts/main-layout";
import { useRedirect } from "./useRedirect";

export function RedirectPage() {
  const { slug } = useParams<{ slug: string }>();

  const { isLoading, isRedirecting } = useRedirect({ slug });

  if (isLoading || isRedirecting) {
    return (
      <MainLayout>
        <RedirectCard />
      </MainLayout>
    );
  }

  return null;
}