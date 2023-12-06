import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useCurrentUrl = () => {
  const [url, setUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const url = new URL(pathname, window.location.origin);

    setUrl(url.href);
  }, [pathname]);

  return url;
};
