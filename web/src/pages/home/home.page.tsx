import { MainLayout } from "@/shared/layouts/main-layout";
import { HomeTemplate } from "@/shared/templates/home-template/home.template";

export function HomePage() {
  return (
    <MainLayout>
      <HomeTemplate />
    </MainLayout>
  );
}
