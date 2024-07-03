import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import CalendarSection from "../components/main/CalendarSection";
import TasksSection from "../components/main/TasksSection";
import ProfileSection from "../components/main/ProfileSection";

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="grid place-items-center">
        <div className="grid grid-cols-2 min-h-screen p-4 max-w-4xl w-full">
          <div className="max-w-4xl w-full">
            <ProfileSection />
            <CalendarSection />
          </div>
          <div className="max-w-4xl w-full">
            <TasksSection />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
