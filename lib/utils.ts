import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import prismadb from "./prismadb";
import { Decimal } from '@prisma/client/runtime/library';
import axios from 'axios';
import { NextResponse } from 'next/server';

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
})

export function isLastDayOfMonth(): boolean {
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return today.getDate() === endOfMonth.getDate();
}

export async function getSolarOutput(
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



  

