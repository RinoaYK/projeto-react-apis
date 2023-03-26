import React, { createContext, useContext, useState, useEffect } from 'react'
import { ColorContext } from './ColorContext'
import axios from 'axios'

export const PokemonContext = createContext()

const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsCopytoDetahes, setPokemonsCopytoDetahes] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const endPoints = []
    for (let i = 1; i <= 802; i++) {
      endPoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
    }
    const fetchPokemons = async () => {
      try {
        const responses = await axios.all(
          endPoints.map(endpoint => axios.get(endpoint))
        )
        const data = await axios.all(
          responses.map(async response => {
            const pokemon = response.data
            const speciesResponse = await axios.get(pokemon.species.url)
            const species = await speciesResponse.data
            return {
              ...pokemon,
              capture_rate: species.capture_rate
            }
          })
        )
        const savedPokedex = localStorage.getItem('pokedex')
        if (savedPokedex) {
          const pokedex = JSON.parse(savedPokedex)
          const filteredData = data.filter(
            pokemon => !pokedex.some(p => p.name === pokemon.name)
          )
          setPokemons(filteredData)
        } else {
          setPokemons(data)
        }
        setPokemonsCopytoDetahes(data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setIsLoading(false)
    }
    fetchPokemons()
  }, [])

  const removeFromPokemon = id => {
    const newPokedex = pokemons.filter(pokemon => {
      return pokemon.id !== id
    })
    setPokemons(newPokedex)
  }

  const addToPokemon = id => {
    const updatedPokemons = [...pokemons, id].sort((a, b) => a.id - b.id)
    setPokemons(updatedPokemons)
  }

  const calculateCatchChance = captureRate => {
    return (captureRate / 255) * 100
  }
  const addMultPokemon = ids => {
    const updatedPokemons = [...pokemons, ...ids].sort((a, b) => a.id - b.id)
    setPokemons(updatedPokemons)
  }

  const [pokemonsButton, setPokemonsButton] = useState('')
  const [pokeId, setPokeId] = useState('')
  const [pokemonPokedex, setPokemonPokedex] = useState(false)

  const [iconUrl, setIconUrl] = useState('')
  const [imageForAlertCapturar, setImageForAlertCapturar] = useState('')
  const [imageForAlertExcluir, setImageForAlertExcluir] = useState('')
  const [cardColor, setCardColor] = useState('')
  const [captureRate, setCaptureRate] = useState('')
  const [catchChance, setCatchChance] = useState('')
  const [isCaptured, setIsCaptured] = useState('')
  const { getColors } = useContext(ColorContext)  

  const searchPokeButton = async (name, goToError) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      )
      const speciesResponse = await axios.get(response.data.species.url)
      const species = await speciesResponse.data
      const updatedData = {
        ...response.data,
        capture_rate: species.capture_rate
      }
      setPokemonsButton(updatedData)
      setPokeId(response.data.id)
      setIconUrl(
        response.data.sprites.versions['generation-vii'].icons.front_default
      )
      setImageForAlertCapturar(
        response.data.sprites.versions['generation-iv']['heartgold-soulsilver']
          .front_default ||
          response.data.sprites.versions['generation-v']['black-white']
            .front_default
      )
      setImageForAlertExcluir(
        response.data.sprites.versions['generation-iv']['heartgold-soulsilver']
          .back_default ||
          response.data.sprites.versions['generation-v']['black-white']
            .back_default
      )

      setCardColor(getColors(response.data.types[0].type.name))
      const capture_rate = updatedData.capture_rate
      const catchChance = calculateCatchChance(capture_rate)
      const isCaptured = Math.random() * 100 <= catchChance
      setCaptureRate(capture_rate)
      setCatchChance(catchChance)
      setIsCaptured(isCaptured)      

      const savedPokedex = localStorage.getItem('pokedex')
      if (savedPokedex) {
        const pokedex = JSON.parse(savedPokedex)
        const filteredData = pokedex.filter(p => p.name === response.data.name)
        if (filteredData.length > 0 && filteredData[0].name === response.data.name) {
          setPokemonPokedex(true)
        } else {
          setPokemonPokedex(false)
        }
      } else {
        setPokemonPokedex(false)
      }
      
    } catch (error) {
      goToError()
    }
  }

  return (
    <PokemonContext.Provider
      value={{
        setPokemonPokedex,
        pokemonsButton,
        pokeId,
        pokemonPokedex,
        iconUrl,
        imageForAlertCapturar,
        imageForAlertExcluir,
        cardColor,
        captureRate,
        catchChance,
        isCaptured,
        searchPokeButton,
        isLoading,
        error,
        pokemons,
        setPokemons,
        removeFromPokemon,
        addToPokemon,
        pokemonsCopytoDetahes,
        calculateCatchChance,
        addMultPokemon
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
export default PokemonProvider
