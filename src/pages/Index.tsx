
import { DashboardProvider } from "@/contexts/DashboardContext";
import { TodoList } from "@/components/TodoList";
import { Calendar } from "@/components/Calendar";
import { Notes } from "@/components/Notes";
import { QuickStats } from "@/components/QuickStats";

const Index = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Productivity Dashboard</h1>
            <p className="text-gray-600">Stay organized and boost your productivity</p>
          </div>

          {/* Quick Stats */}
          <QuickStats />

          {/* Main Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Todo List - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <TodoList />
            </div>

            {/* Calendar - Takes 1 column */}
            <div>
              <Calendar />
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-8">
            <Notes />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Index;
