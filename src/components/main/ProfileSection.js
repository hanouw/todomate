import React from "react";

function ProfileSection() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-200 rounded-full"></div>
        <div>
          <div className="text-xl font-semibold">Username</div>
          <div className="text-gray-500">Description</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
