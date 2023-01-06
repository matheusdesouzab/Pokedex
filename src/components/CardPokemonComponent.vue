<template>
    <div v-for="p in pokemons" :key="p.id" class="col g-2 p-2">
        <div :class="`card cartao-pokemon bg-${p.tipo} px-3 py-2 border-0`">
            <span class="text-white fw-bold">{{ p.id }} - {{ p.nome }}</span>
            <div class="card-body mt-2">
                <span class="tipo">{{ p.tipo }}</span>
                <img class="mt-2" :src="require(`@/assets/imgs/pokemons/${p.imagem}`)">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardPokemonComponent',
    props: {
        pokemons: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>
.bg-grama {
  background-color: #2d8f78;
}

.bg-fogo {
  background-color: #e47373
}

.bg-agua {
  background-color: #5a9ed2
}

.bg-inseto {
  background-color: #26d3ab
}

.bg-normal {
  background-color: #cecece
}

.cartao-pokemon{
    height: 180px;
    cursor: pointer;
}

.cartao-pokemon .card{
  border-radius: 15px;
}

.card-body img{
    max-width: 100px;
}

.cartao-pokemon .tipo {
  color: #fff;
  position: absolute;
  left: 10px;
  top: 40px;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

</style>