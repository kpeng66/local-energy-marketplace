import { Decimal } from '@prisma/client/runtime/library';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  data: {
    lat: string,
    lon: string,
    system_capacity: string,
    azimuth: string,
    tilt: string,
    array_type: string,
    module_type: string,
    losses: string,
  }
  ) {
    try {
      
      const response = await axios.get('https://developer.nrel.gov/api/pvwatts/v8.json', {
        params: {
          'api_key': process.env.NEXT_PUBLIC_PVWATTS_API_KEY,
          'lat': parseFloat(data.lat),
          'lon': parseFloat(data.lon),
          'system_capacity': parseFloat(data.system_capacity),
          'azimuth': parseFloat(data.azimuth),
          'tilt': parseFloat(data.tilt),
          'array_type': parseInt(data.array_type),
          'module_type': parseInt(data.module_type),
          'losses': parseFloat(data.losses),
          'timeframe': 'hourly'
        }
      });

      return response.data;
    } catch (error) {
      console.log(error)
      return new Error("Error fetching from PVWatts API");
    }
}
