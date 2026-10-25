export function normalizeChampionName(name) {
    // Normalise le nom du champion en supprimant les accents, les caractères spéciaux et en le convertissant en minuscules.
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
}