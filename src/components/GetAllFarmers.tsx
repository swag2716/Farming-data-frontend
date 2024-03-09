import React, { useState, useEffect } from "react";
import axios from "axios";

interface Farmer {
  id: string;
  farmer_id: string;
  phone: string;
  name: string;
  language: string;
  country_id: string;
}

const GetAllFarmersComponent: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  // Fetch all farmers
  const fetchFarmers = async () => {
    try {
      const response = await axios.get(
        "https://farming-data-2.onrender.com/get_all_farmers_growing_crop"
      );
      setFarmers(response.data);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
  };

  const handleGetFarmersClick = () => {
    fetchFarmers();
  };

  return (
    <div>
      <h1>Farmers</h1>
      <button onClick={handleGetFarmersClick}>Get Farmers</button>
      <ul>
        {farmers.map((farmer) => (
          <li key={farmer.farmer_id}>
            {farmer.name} - {farmer.farmer_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllFarmersComponent;
