import prismadb from "@/lib/prismadb";
import { getSolarOutput, isLastDayOfMonth } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string }}
    ) {
      try {
        const { userId } = auth();

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

        const outputData = await getSolarOutput(data);
        //console.log(outputData);

      if (true) {
        const kwhData = outputData.outputs.ac_monthly; 
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