import * as React from 'react';
import { ActionHistory } from '@app/Scenario6/Ui/ActionHistory';

export const ActionHistoryContext = React.createContext<ActionHistory | undefined>(undefined);
export const ActionHistoryContextProvider = ActionHistoryContext.Provider;