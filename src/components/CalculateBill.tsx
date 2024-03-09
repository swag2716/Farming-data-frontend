import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Farmer {
  id: string;
  farmer_id: string;
  phone: string;
  name: string;
  language: string;
  country_id: string;
}

interface Fertilizer {
  name: string;
  price: number;
}

const CalculateBillComponent: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<string>('');
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([{ name: '', price: 0 }]);
  const [billResult, setBillResult] = useState<number | null>(null);

  useEffect(() => {
    // Fetch all farmers
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('https://farming-data-2.onrender.com/get_all_farmers_growing_crop');
        setFarmers(response.data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);

  const handleCalculateBill = async () => {
    try {
      const fertilizerData = JSON.stringify(
        fertilizers.reduce((obj, fertilizer) => {
          obj[fertilizer.name] = fertilizer.price;
          return obj;
        }, {} as Record<string, number>)
      );

      const response = await axios.get(`https://farming-data-2.onrender.com/calculate_bill/${selectedFarmer}`, {
        params: {
          fertilizerData,
        },
      });

      // Assuming the API response contains a "totalBill" field
      setBillResult(response.data.totalBill);
    } catch (error) {
      console.error('Error calculating bill:', error);
    }
  };

  const handleAddFertilizer = () => {
    setFertilizers([...fertilizers, { name: '', price: 0 }]);
  };

  const handleFertilizerChange = (index: number, key: keyof Fertilizer, value: string | number) => {
    const updatedFertilizers = [...fertilizers];

    if (key === 'price') {
      // Ensure value is a valid number, otherwise set it to 0
      updatedFertilizers[index][key] = typeof value === 'string' ? parseFloat(value) || 0 : value;
    } else {
      // For other properties, assign the value directly
      updatedFertilizers[index][key] = value as string;
    }

    setFertilizers(updatedFertilizers);
  };

  return (
    <div>
      <h1>Calculate Bill of Materials</h1>
      <div>
        <label>Select Farmer:</label>
        <select value={selectedFarmer} onChange={(e) => setSelectedFarmer(e.target.value)}>
          <option value="">Select Farmer</option>
          {farmers.map((farmer) => (
            <option key={farmer.id} value={farmer.farmer_id}>
              {farmer.name} - {farmer.farmer_id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Fertilizers</h2>
        {fertilizers.map((fertilizer, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Fertilizer Name"
              value={fertilizer.name}
              onChange={(e) => handleFertilizerChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Fertilizer Price"
              value={fertilizer.price}
              onChange={(e) => handleFertilizerChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddFertilizer}>Add Fertilizer</button>
      </div>
      <button onClick={handleCalculateBill}>Calculate Bill</button>

      {billResult !== null && (
        <div>
          <h2>Total Bill: {billResult}</h2>
        </div>
      )}
    </div>
  );
};

export default CalculateBillComponent;
