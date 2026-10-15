import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import { MotionRoot } from './components/layout/MotionRoot';
import { ScrollManager } from './components/layout/ScrollManager';
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';
import { RequireAuth } from './components/layout/RequireAuth';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { Faq } from './pages/Faq';
import { Contact } from './pages/Contact';
import { Novelty } from './pages/Novelty';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { Coach } from './pages/Coach';
import { MyPlan } from './pages/MyPlan';
import { Recipes } from './pages/Recipes';
import { RecipeDetail } from './pages/RecipeDetail';
import { CookingMode } from './pages/CookingMode';
import { Kitchen } from './pages/Kitchen';
import { FoodWaste } from './pages/FoodWaste';
import { Substitutions } from './pages/Substitutions';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { MealHistory } from './pages/MealHistory';

export function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <MotionRoot>
          <ScrollManager />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/novelty" element={<Novelty />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<RequireAuth />}>
              <Route path="/app/cook/:id" element={<CookingMode />} />
              <Route element={<AppLayout />}>
                <Route path="/app" element={<Dashboard />} />
                <Route path="/app/coach" element={<Coach />} />
                <Route path="/app/plan" element={<MyPlan />} />
                <Route path="/app/recipes" element={<Recipes />} />
                <Route path="/app/recipes/:id" element={<RecipeDetail />} />
                <Route path="/app/kitchen" element={<Kitchen />} />
                <Route path="/app/waste" element={<FoodWaste />} />
                <Route path="/app/substitutions" element={<Substitutions />} />
                <Route path="/app/profile" element={<Profile />} />
                <Route path="/app/history" element={<MealHistory />} />
                <Route path="/app/settings" element={<Settings />} />
                <Route path="/app/novelty" element={<Novelty />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MotionRoot>
      </StoreProvider>
    </BrowserRouter>);

}