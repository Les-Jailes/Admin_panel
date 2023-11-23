import React from "react";
import AvailableCountries from "@/components/Countries/AvailableCountries";

const page = () => {
    const mockCountries = [
        {
          name: 'Bolivia',
          capital: 'La Paz',
          flagUrl: 'https://via.placeholder.com/150/ff0000/FFFFFF?text=Bolivia',
        },
        {
          name: 'Argentina',
          capital: 'Buenos Aires',
          flagUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Argentina',
        },
        {
          name: 'Canada',
          capital: 'Ottawa',
          flagUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Canada',
        },
        {
          name: 'Japan',
          capital: 'Tokyo',
          flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
        },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },{
            name: 'Japan',
            capital: 'Tokyo',
            flagUrl: 'https://via.placeholder.com/150/F2F2F2/000000?text=Japan',
          },
      ];
  return (
    <div>
      <AvailableCountries countries={mockCountries} />
    </div>
  );
};

export default page;
