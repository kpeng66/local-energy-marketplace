import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


import prismadb from "@/lib/prismadb";
import axios from "axios";
import { isLastDayOfMonth } from "@/lib/utils";

export async function GET(
    _req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.findUnique({
            where: {
                id: params.storeId,
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log(`[STORE_GET]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, latitude, longitude, systemCapacity,
            azimuth,
            tilt,
            array_type,
            module_type,
            losses } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!latitude) {
            return new NextResponse("Latitude is required", { status: 400 });
        }

        if (!longitude) {
            return new NextResponse("Longitude is required", { status: 400 });
        }

        if (!systemCapacity) {
            return new NextResponse("System Capacity is required", { status: 400 });
        }

        if (!azimuth) {
            return new NextResponse("Azimuth is required", { status: 400 });
        }
        if (!tilt) {
            return new NextResponse("Tilt is required", { status: 400 });
        }
        if (!array_type) {
            return new NextResponse("Array Type is required", { status: 400 });
        }
        if (!module_type) {
            return new NextResponse("Module Type is required", { status: 400 });
        }
        if (!losses) {
            return new NextResponse("Losses is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name,
                latitude, 
                longitude, 
                systemCapacity,
                azimuth,
                tilt,
                array_type,
                module_type,
                losses 
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log(`[STORE_PATCH]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log(`[STORE_DELETE]`, error);
        return new NextResponse("Internal error", { status: 500 });
    }
};



    