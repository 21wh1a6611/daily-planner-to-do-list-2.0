import React, { useState } from 'react';

interface Activity {
  id: number;
  time: string;
  description: string;
  done: boolean;
}

const DailyPlanner = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newTime, setNewTime] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [id, setId] = useState(1);

  const handleAddActivity = () => {
    if (newTime && newDescription) {
      setActivities([...activities, { id, time: newTime, description: newDescription, done: false }]);
      setId(id + 1);
      setNewTime('');
      setNewDescription('');
    }
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const handleDoneActivity = (id: number) => {
    setActivities(activities.map((activity) => activity.id === id ? { ...activity, done: !activity.done } : activity));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 pt-12 mt-10 bg-yellow-100 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-pink-500 mb-6">Daily Planner</h1>
      <div className="flex flex-col mb-6">
        <label className="text-lg font-bold text-teal-600 mb-2" htmlFor="time">Time:</label>
        <input
          className="p-4 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-teal-400"
          type="time"
          id="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label className="text-lg font-bold text-teal-600 mb-2" htmlFor="description">Description:</label>
        <input
          className="p-4 pl-10 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-teal-400"
          type="text"
          id="description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:ring focus:ring-orange-400"
        onClick={handleAddActivity}
      >
        Add Activity
      </button>
      <div className="mt-8">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex justify-between items-center p-6 border-b border-gray-200 ${activity.done ? 'bg-green-100' : 'bg-gray-50'} rounded-lg`}
          >
            <div className="flex items-center">
              <div className={`bg-teal-200 border-2 border-dashed rounded-xl w-10 h-10 mr-6 ${activity.done ? 'bg-green-200' : ''}`} />
              <div>
                <p className={`text-lg font-bold ${activity.done ? 'text-green-600' : 'text-teal-600'}`}>{activity.time}</p>
                <p className={`text-lg ${activity.done ? 'text-green-600 line-through' : 'text-gray-600'}`}>{activity.description}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-green-400 mr-4 ${activity.done ? 'hidden' : ''}`}
                onClick={() => handleDoneActivity(activity.id)}
              >
                Done
              </button>
              <button
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-red-400 ${activity.done ? 'hidden' : ''}`}
                onClick={() => handleDeleteActivity(activity.id)}
              >
                Delete
              </button>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 ${activity.done ? '' : 'hidden'}`}
                onClick={() => handleDoneActivity(activity.id)}
              >
                Undo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPlanner;
