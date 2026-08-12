"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type ImportedMarket = {
  question?: string;
  description?: string;
  category?: string;
  endDate?: string;
  image?: string;
  outcomes?: string[];
  source?: string;
};

type ImportMarketContextType = {
  importedMarket: ImportedMarket | null;
  setImportedMarket: (market: ImportedMarket | null) => void;
};

const ImportMarketContext =
  createContext<ImportMarketContextType | null>(null);

export function ImportMarketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [importedMarket, setImportedMarket] =
    useState<ImportedMarket | null>(null);

  return (
    <ImportMarketContext.Provider
      value={{
        importedMarket,
        setImportedMarket,
      }}
    >
      {children}
    </ImportMarketContext.Provider>
  );
}

export function useImportMarket() {
  const context = useContext(ImportMarketContext);

  if (!context) {
    throw new Error(
      "useImportMarket must be used inside ImportMarketProvider"
    );
  }

  return context;
}