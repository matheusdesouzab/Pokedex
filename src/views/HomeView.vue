<template>
  <div class="container">
    <div class="row mt-5">

      <!-- início lado esquerdo -->
      <div class="col mb-2">
        <div class="card palco">
          <div class="card-header"></div>

          <div class="card-body bg-pokebola bg-normal">
            <div class="pokemon">
              <transition @after-enter="exibirEvolucoesTransicoes" @before-leave="ocultarEvolucoesTransicoes"
                name="flip">
                <img :src="require(`@/assets/imgs/pokemons/${pokemon.imagem}`)" v-if="exibir">
              </transition>
              <div class="evolucoes">
                <transition name="zoom" v-for="e in pokemon.evolucoes" :key="e">
                  <img :src="require(`@/assets/imgs/pokemons/${e.toString().padStart(3, '0')}.png`)"
                    v-if="exibirEvolucoes">
                </transition>
              </div>
            </div>
          </div>

          <div class="card-footer">

            <nav class="nav nav-pills nav-fill">
              <router-link class="nav-item nav-link text-white" :to="{ path: '/sobre' }"
                exact-active-class="active">Sobre</router-link>
              <router-link class="nav-item nav-link text-white" :to="{ path: '/status' }"
                exact-active-class="active">Status</router-link>
              <router-link class="nav-item nav-link text-white" :to="{ path: '/habilidades' }"
                exact-active-class="active">Habilidades</router-link>
            </nav>

            <div class="detalhes">
              <router-view v-slot="{ Component }" :pokemon="pokemon" @adicionarHabilidade="adicionarHabilidade"
                @removerHabilidade="removerHabilidade">
                <transition>
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>

          </div>
        </div>
      </div>
      <!-- fim lado esquerdo -->

      <!-- início lado direito -->
      <div class="col mb-2 pokedex p-4">
        <div class="row">
          <div class="col">
            <h2 class="fw-bold mb-4">Pokédex</h2>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <select class="form-select" v-model="ordenacao">
              <option value="1">Id crescente</option>
              <option value="2">Id decrescente</option>
              <option value="3">De A - Z</option>
              <option value="4">De Z - A</option>
            </select>
          </div>

          <div class="col">
            <input type="text" class="form-control" placeholder="Pesquisar pokémon" v-model="nomePokemon">
          </div>
        </div>

        <div class="row row-cols-md-3" id="containerCardsPokemons">
          <card-pokemon-component :pokemons="pokemons"></card-pokemon-component>
        </div>

      </div>
      <!-- fim lado direito -->

    </div>
  </div>
</template>

<script>

import CardPokemonComponent from '@/components/CardPokemonComponent.vue'

export default {
  name: 'HomeView',
  components: {
    CardPokemonComponent
  },
  data: () => ({
    exibir: false,
    exibirEvolucoes: false,
    pokemon: {},
    pokemons: [],
    ordenacao: 1,
    nomePokemon: ''
  }),
  watch: {
    nomePokemon(valorNovo) {
      fetch(`http://localhost:3000/pokemons?nome_like=${valorNovo}`)
        .then(response => response.json())
        .then(data => this.pokemons = data)
    },
    ordenacao(valorNovo) {
      if (valorNovo == 1) {
        this.pokemons.sort((proximo, atual) => {
          if (atual.id < proximo.id) {
            return 1
          } else if (atual.id > proximo.id) {
            return -1
          }
          return 0
        })
      }
      if (valorNovo == 2) {
        this.pokemons.sort((proximo, atual) => {
          if (atual.id < proximo.id) {
            return -1
          } else if (atual.id > proximo.id) {
            return 1
          }
          return 0
        })
      }
      if (valorNovo == 3) {
        this.pokemons.sort((proximo, atual) => {
          if (atual.nome < proximo.nome) {
            return 1
          }
          if (atual.nome > proximo.nome) {
            return -1
          }
          return 0
        })
      }
      if (valorNovo == 4) {
        this.pokemons.sort((proximo, atual) => {
          return atual.nome.localeCompare(proximo.nome, 'pt-BR')
        })
      }
    }
  },
  methods: {
    exibirEvolucoesTransicoes() {
      this.exibirEvolucoes = true
    },
    ocultarEvolucoesTransicoes() {
      this.exibirEvolucoes = false
    },
    analisarPokemon(p) {
      let mudarPokemonAnalisado = false
      if ((this.pokemon.id != p.id) && (this.exibir)) {
        setTimeout(() => {
          this.analisarPokemon(p)
        }, 1000)
        mudarPokemonAnalisado = true
      }
      this.exibir = !this.exibir
      this.pokemon = p
      this.exibirEvolucoes = !this.exibirEvolucoes

      if (!this.exibir && !mudarPokemonAnalisado) {
        this.pokemon = {}
      }
    },
    adicionarHabilidade(habilidade) {
      if (this.pokemon.habilidades) {
        this.pokemon.habilidades.push(habilidade)
      }
    },
    removerHabilidade(indice) {
      if (this.pokemon.habilidades[indice]) {
        this.pokemon.habilidades.splice(indice, 1)
      }
    }
  },
  created() {
    fetch('http://localhost:3000/pokemons')
      .then(response => response.json())
      .then(data => this.pokemons = data)
  }
}
</script>

<style>
body {
  background-color: #dee3eb;
}
</style>

<style scoped>
@import '~@/assets/css/animacoes.css';

.pokedex {
  padding: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

#containerCardsPokemons {
  overflow: auto;
  height: 700px;
  width: 98%;
  margin-top: 10px;
}

#containerCardsPokemons::-webkit-scrollbar {
  width: 10px;
}

#containerCardsPokemons::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #e5e5e5;
}

.cartao-pokemon {
  position: relative;
  margin: 5px;
  width: 150px;
  height: 115px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.cartao-pokemon h1 {
  color: #fff;
  font-size: 14px;
  margin: 5px 0px 0px 5px;
  padding: 0px;
}



.cartao-pokemon img {
  max-width: 60%;
  max-height: 60%;
  float: right;
}


.bg-pokebola {
  background-image: url("~@/assets/imgs/pokebola.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.palco {
  color: #fff;
  background-color: #333;
  -webkit-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  border-radius: 10px;
}

.pokemon {
  display: block;
  text-align: center;
  height: 215px;
}

.detalhes {
  margin: 20px 30px 20px 30px;
}

.evolucoes {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 70px;
}

.evolucoes img {
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
}
</style>
