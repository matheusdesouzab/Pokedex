<template>
    <div>

        <span>Força:</span>
        <div class="progress mb-2">
            <div class="progress-bar" role="progressbar" :style="`width: ${pokemon.status.forca}%;`"
                :aria-valuenow="pokemon.status.forca" aria-valuemin="0" aria-valuemax="100">
                {{ pokemon.status.forca }}
            </div>
        </div>

        <span>Agilidade:</span>
        <div class="progress mb-2">
            <div class="progress-bar" role="progressbar" 
                :style="`width: ${pokemon.status.agilidade}%;`" 
                :aria-valuenow="pokemon.status.agilidade" 
                aria-valuemin="0"
                aria-valuemax="100">
                {{ pokemon.status.agilidade }}
            </div>
        </div>

        <span>Ataque:</span>
        <div class="progress mb-2">
            <div class="progress-bar" role="progressbar" 
                :style="`width: ${pokemon.status.ataque}%;`" 
                :aria-valuenow="pokemon.status.ataque" 
                aria-valuemin="0"
                aria-valuemax="100">
                {{ pokemon.status.ataque }}
            </div>
        </div>

        <span>Defesa:</span>
        <div class="progress mb-2">
            <div class="progress-bar" role="progressbar" 
                :style="`width: ${pokemon.status.defesa}%;`" 
                :aria-valuenow="pokemon.status.defesa" 
                aria-valuemin="0"
                aria-valuemax="100">
                {{ pokemon.status.defesa }}
            </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Status',
    props: {
        pokemon: Object,
        default:
        {
            id: 15,
            nome: "Beedrill",
            tipo: "inseto",
            imagem: "015.png",
            evolucoes: [],
            habilidades: ["Ataque fúria", "Esquivar"],
            status: {
                forca: 30,
                agilidade: 40,
                ataque: 20,
                defesa: 25
            }
        }
    }
}
</script>