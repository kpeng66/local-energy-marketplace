import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request
  ) {
    try {
      const body = await req.json();
      const { lat, lon, system_capacity, azimuth, tilt, array_type, module_type, losses } = body;
      
      const response = await axios.get('https://developer.nrel.gov/api/pvwatts/v8.json', {
        params: {
          'api_key': process.env.NEXT_PUBLIC_PVWATTS_API_KEY,
          'lat': lat,
          'lon': lon,
          'system_capacity': system_capacity,
          'azimuth': azimuth,
          'tilt': tilt,
          'array_type': array_type,
          'module_type': module_type,
          'losses': losses,
          'timeframe': 'hourly'
        }
      });

      return NextResponse.json(response.data);
    } catch (error) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
}
