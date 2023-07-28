import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon, system_capacity, azimuth, tilt, array_type, module_type, losses } = req.body;

  try {
    const response = await axios.get('https://developer.nrel.gov/api/pvwatts/v6.json', {
      params: {
        'api_key': process.env.NEXT_PUBLIC_PVWATTS_API_KEY,
        'lat': lat,
        'lon': lon,
        'system_capacity': system_capacity,
        'azimuth': azimuth,
        'tilt': tilt,
        'array_type': array_type,
        'module_type': module_type,
        'losses': losses
      }
    });

    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Failed to fetch solar data" });
  }
}
