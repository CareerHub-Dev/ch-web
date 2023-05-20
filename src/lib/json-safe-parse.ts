export default function parseJson(json: string) {
    try {
        const parsed = JSON.parse(json);
        return {
            success: true,
            data: parsed,
        };
    } catch (err) {
        return {
            success: false,
            error: err,
        };
    }
}
