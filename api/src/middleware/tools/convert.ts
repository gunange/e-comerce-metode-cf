export function convertTypes(data: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            if (!isNaN(value) && value.trim() !== "") {
                return [key, Number(value)];
            }
            return [key, value];
        })
    );
}
