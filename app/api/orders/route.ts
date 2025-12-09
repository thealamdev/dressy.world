export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body)
        const res = await fetch(process.env.GS_WEBHOOK_URL!, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        return Response.json(json, { status: res.ok ? 200 : 400 });
    } catch (error) {
        return Response.json(
            { error: "Failed to process order" },
            { status: 500 }
        );
    }
}