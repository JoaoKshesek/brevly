import logoImg from "@/assets/images/logo.svg";
import { LinkList } from "@/shared/components/link-list";
import { NewLink } from "@/shared/components/new-link";

export function NotFoundTemplate() {
  return (
    <div>
      <img src={logoImg} alt="Logo Brev.ly" />

      <div>
        <NewLink />
        <LinkList />
      </div>
    </div>
  );
}
