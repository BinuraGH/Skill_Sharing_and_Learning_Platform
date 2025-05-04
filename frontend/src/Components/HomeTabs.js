import React, { useState } from 'react';
import SkillShare from './SkillShare';
import ProgressUpdate from './ProgressUpdate';
import LearningPlan from './LearningPlan';

const HomeTabs = () => {
    const [activeTab, setActiveTab] = useState('skills');

    return (
        <div className="w-full max-w-4xl mx-auto mt-6">
            {/* Tabs Header */}
            <div className="flex justify-center space-x-4 border-b border-gray-200">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'skills'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-purple-600'
                        }`}
                    onClick={() => setActiveTab('skills')}
                >
                    Skills
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'progress'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-purple-600'
                        }`}
                    onClick={() => setActiveTab('progress')}
                >
                    Progress
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'plans'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-purple-600'
                        }`}
                    onClick={() => setActiveTab('plans')}
                >
                    Plans
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'skills' && <SkillShare />}
                {activeTab === 'progress' && <ProgressUpdate />}
                {activeTab === 'plans' && <LearningPlan />}
            </div>
        </div>
    );
};

export default HomeTabs;
