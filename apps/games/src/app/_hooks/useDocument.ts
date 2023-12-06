import { useEffect, useState } from "react";

export const useDocument = () => {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    setDocument(window.document);
  }, []);

  return document;
};
