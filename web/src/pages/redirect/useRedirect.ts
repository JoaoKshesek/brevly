import { useLink } from "@/features/links/hooks/useLink";
import { useUpdateLinkCount } from "@/features/links/hooks/useUpdateLinkCount";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseRedirectProps {
  slug?: string;
}

export function useRedirect({ slug }: UseRedirectProps) {
  const navigate = useNavigate();
  const query = useLink(slug!);
  const updateLinkMutation = useUpdateLinkCount();

  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const redirect = async () => {
      if (query.isError) {
        setIsRedirecting(false);
        navigate("/not-found", { replace: true });
        return;
      }

      if (query.data?.originalUrl) {
        try {
          setIsRedirecting(true);

          await updateLinkMutation.mutateAsync(slug);

          window.location.replace(query.data.originalUrl);
        } catch {
          setIsRedirecting(false);
          navigate("/not-found", { replace: true });
        }
      }
    };

    redirect();
  }, [slug, query.isError, query.data, navigate]);

  return {
    ...query,
    isRedirecting,
  };
}