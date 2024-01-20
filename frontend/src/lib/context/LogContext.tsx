"use client";

import React, { createContext, useState } from 'react'

interface LogType {
    metadata: object[];
    summary: string;
}

interface ContextProps {
    readonly log: string | null;
    readonly setLog: (log: string) => void;
}

export const LogContext = createContext<ContextProps>({
    log: null,
    setLog: () => null
});

export const LogContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [log, setLog] = useState<string | null>(null);

    const value = {
        log,
        setLog
    }

  return (
    <LogContext.Provider value={value}>
        {children}
    </LogContext.Provider>
  )
}