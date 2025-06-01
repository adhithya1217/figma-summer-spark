
import { DashboardProvider } from "@/contexts/DashboardContext";
import { TodoList } from "@/components/TodoList";
import { Calendar } from "@/components/Calendar";
import { Notes } from "@/components/Notes";
import { QuickStats } from "@/components/QuickStats";
import { EventManager } from "@/components/EventManager";

const Index = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[#F2F2F2] p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-[#000000] mb-2">Productivity Dashboard</h1>
            <p className="text-[#B6B09F]">Stay organized and boost your productivity</p>
          </div>

          {/* Quick Stats */}
          <div className="animate-slide-down" style={{ animationDelay: '100ms' }}>
            <QuickStats />
          </div>

          {/* Main Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Todo List - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 animate-slide-down" style={{ animationDelay: '200ms' }}>
              <TodoList />
            </div>

            {/* Calendar - Takes 1 column */}
            <div className="space-y-6 animate-slide-down" style={{ animationDelay: '300ms' }}>
              <Calendar />
              <EventManager />
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-8 animate-slide-down" style={{ animationDelay: '400ms' }}>
            <Notes />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Index;
