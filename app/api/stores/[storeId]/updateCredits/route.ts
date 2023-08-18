import prismadb from "@/lib/prismadb";
import { isLastDayOfMonth } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string }}
    ) {
      try {
        const { userId } = auth();

        //if (!userId) {
            //return new NextResponse("Unauthenticated", { status: 401});
       // }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

          const store = await prismadb.store.findUnique({
            where: {
                id: params.storeId
            }
          })

          if (!store) {
            throw new Error("Store not found!");
          }

          const data = {
            lat: store?.latitude,  
            lon: store?.longitude,  
            system_capacity: store?.systemCapacity,  
            azimuth: store?.azimuth,  
            tilt: store?.tilt,  
            array_type: store?.array_type,  
            module_type: store?.module_type, 
            losses: store?.losses  
          };

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

      if (isLastDayOfMonth()) {
        const kwhData = response.data.outputs.ac_monthly; 
        const currentMonthIndex = new Date().getMonth();
        const thisMonthKwh = kwhData[currentMonthIndex];

        const creditsEarned = thisMonthKwh / 1000;
        console.log(thisMonthKwh);
        const currentSolarCredits = store.solar_credits;
        console.log((parseFloat(currentSolarCredits) + creditsEarned).toString());

        const store1 = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                //userId
            },
            data: {
                solar_credits: (parseFloat(currentSolarCredits) + creditsEarned).toString(),
            }
        })
      }

    return NextResponse.json(store);
    } catch (error) {
        console.log(`[STORE_CREDITS_PATCH]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
}