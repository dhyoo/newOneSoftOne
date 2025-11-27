import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// ag-Grid 모듈 등록 (v34+ 필수)
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import './index.css'
import '../api/http/mockServer';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
