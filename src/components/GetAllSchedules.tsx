import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Farm {
    id: string; 
    farm_id: string;
    area: number;
    village: string;
    crop: string;
    sowing_date: string;
    farmer_id: string;
}

interface Schedule {
    id: string; 
    schedule_id: string;
    days_after_sowing: number;
    fertilizer: string;
    quantity: number;
    quantity_unit: string;
    farm_id: string;
    farmer_id: string;

}

const GetAllSchedulesComponent: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);


    const fetchFarms = async () => {
        try {
        const response = await axios.get('https://farming-data-2.onrender.com/get_all_farms');
        setFarms(response.data);
        } catch (error) {
        console.error('Error fetching farms:', error);
        }
    };  

  useEffect(() => {
    // Fetch schedules when a farm is selected
    const fetchSchedules = async () => {
      if (selectedFarm !== null) {
        try {
          const response = await axios.get(`https://farming-data-2.onrender.com/get_due_schedules/${selectedFarm}`); // Replace with your API endpoint
          setSchedules(response.data);
        } catch (error) {
          console.error('Error fetching schedules:', error);
        }
      }
    };

    fetchSchedules();
  }, [selectedFarm]);

  const handleGetFarmsClick = () => {
    fetchFarms();
    setSelectedFarm(null); // Reset selectedFarm when fetching all farms
  };

  const handleFarmSelection = (farmId: string) => {
    setSelectedFarm(farmId);
  };

  return (
    <div>
      <h1>Farms</h1>
      <button onClick={handleGetFarmsClick}>Get Farms</button>
      <ul>
        {farms.map((farm) => (
          <li key={farm.id} onClick={() => handleFarmSelection(farm.farm_id)}>
            {farm.village}
          </li>
        ))}
      </ul>

      {selectedFarm !== null && (
        <div>
          <h2>Schedules for {farms.find((farm) => farm.farm_id === selectedFarm)?.village}</h2>
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id}>{/* Render schedule information here */}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetAllSchedulesComponent;
