"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectGrid from '@/components/repeto/ProjectGrid'
import FilterSection from '@/components/repeto/FilterSection';
import TabSection from '@/components/repeto/TabSection';
import Footer from '@/components/Footer';
import AddProjectFAB from '@/components/repeto/AddProjectFAB';

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
      <FilterSection onFilterSubmit={setFilters} />
        <div className="flex-1 max-w-7xl px-4 py-6 space-y-8">
          <TabSection activeTab={activeTab} onTabChange={setActiveTab} />
          <ProjectGrid activeTab={activeTab} filters={filters} />
        </div>
        <AddProjectFAB />
      </div>
      <Footer />
    </main>
  );
}