const config = require("./../configs/config.json");
module.exports = {
    get_bicho(numero) {
        bichos = [
            "Easter egg",
            "Avestruz",
            "Àguia",
            "Burro",
            "Borboleta",
            "Cachorro",
            "Cabra",
            "Carneiro",
            "Camelo",
            "Cobra",
            "Coelho",
            "Cavalo",
            "Elefante",
            "Galo",
            "Gato",
            "Jacaré",
            "Leão",
            "Macaco",
            "Porco",
            "Pavão",
            "Peru",
            "Touro",
            "Tigre",
            "Urso",
            "Veado",
            "Vaca",
        ];
        machos = [
            1,
            3,
            5,
            7,
            8,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
        ];
        randint = Math.floor(Math.random() * 99) + 1;
        randCeil = Math.ceil(randint / 4);
        if (machos.includes(randCeil)) return `no ${bichos[randCeil]} ${randint}`;
        return `na ${bichos[randCeil]} ${randint}`;
    }
};