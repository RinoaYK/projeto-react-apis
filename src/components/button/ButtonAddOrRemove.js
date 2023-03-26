import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { goToError } from '../../routes/coordinator'
import { PokedexContext } from '../../contexts/PokedexContext'
import { PokemonContext } from '../../contexts/PokemonContext'
import { useDisclosure, Button, Text } from '@chakra-ui/react'
import AlertCapturar from '../modal/AlertCapturar'
import AlertExcluir from '../modal/AlertExcluir'
import mousePointer from '../../../src/assets/mousePointer.png'
import mouseGrab from '../../../src/assets/mouseGrab.png'

const ButtonAddOrRemove = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const {
    removeFromPokemon,
    addToPokemon,
    searchPokeButton,
    pokemonsButton,
    pokeId,
    pokemonPokedex,
    iconUrl,
    imageForAlertCapturar,
    imageForAlertExcluir,
    cardColor,
    captureRate,
    catchChance,
    isCaptured
  } = useContext(PokemonContext)
  const { addToPokedex, removeFromPokedex } = useContext(PokedexContext)

  useEffect(() => {
    searchPokeButton(name, () => goToError(navigate))
  }, [name])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [showSecondModalCapturar, setShowSecondModalCapturar] = useState(false)
  const [showSecondModalCapturarFail, setShowSecondModalCapturarFail] =
    useState(false)
  const [showSecondModalExcluir, setShowSecondModalExcluir] = useState(false)

  const addToPokedexRemoveFromPokemon = () => {
    onOpen()
    setTimeout(() => {
      onClose()
      if (isCaptured) {
        setShowSecondModalCapturar(true)
        setTimeout(() => {
          setShowSecondModalCapturar(false)
          addToPokedex(pokemonsButton, pokeId)
          removeFromPokemon(pokeId)
          searchPokeButton(name, () => goToError(navigate))
        }, 1000)
      } else {
        setShowSecondModalCapturarFail(true)
        setTimeout(() => {
          setShowSecondModalCapturarFail(false)
        }, 1000)
      }
    }, 2000)
  }

  const removeFromPokedexAddToPokemon = () => {
    onOpen()
    setTimeout(() => {
      onClose()
      setShowSecondModalExcluir(true)
      setTimeout(() => {
        setShowSecondModalExcluir(false)
        addToPokemon(pokemonsButton)
        removeFromPokedex(pokeId)
        searchPokeButton(name, () => goToError(navigate))
      }, 1000)
    }, 2000)
  }

  return (
    <>
      {pokemonPokedex === true ? (
        <Button
          color='white'
          bg='#FF6262'
          _hover={{
            bg: '#ce424e',
            fontWeight: 'bold'
          }}
          size='lg'
          w={{ base: '12.5em', md: '6em', lg: '12.5em' }}
          h='3em'
          fontWeight='normal'
          fontSize='18px'
          fontFamily='poppins'
          onClick={removeFromPokedexAddToPokemon}
          cursor={`url(${iconUrl}), auto`}
          _active={{ cursor: `url(${mousePointer}), auto` }}
        >
          <Text
            display={{ base: 'block', md: 'none', lg: 'block' }}
            cursor={`url(${iconUrl}), auto`}
            _active={{ cursor: `url(${mousePointer}), auto` }}
          >
            Excluir da Pokédex
          </Text>
          <Text
            display={{ base: 'none', md: 'block', lg: 'none' }}
            cursor={`url(${iconUrl}), auto`}
            _active={{ cursor: `url(${mousePointer}), auto` }}
          >
            Excluir
          </Text>
          <AlertExcluir
            name={name}
            imageForAlertExcluir={imageForAlertExcluir}
            cardColor={cardColor}
            isOpen={isOpen}
            onClose={onClose}
            showSecondModalExcluir={showSecondModalExcluir}
            setShowSecondModalExcluir={setShowSecondModalExcluir}
          />
        </Button>
      ) : (
        <Button
          color='#C29905'
          bg='#FAC705'
          _hover={{
            color: 'white',
            bg: '#C29905',
            fontWeight: 'bold'
          }}
          size='lg'
          w={{ base: '12.5em', md: '6em', lg: '12.5em' }}
          h='3em'
          fontWeight='normal'
          fontSize='18px'
          fontFamily='poppins'
          onClick={addToPokedexRemoveFromPokemon}
          textTransform='capitalize'
          cursor={`url(${iconUrl}), auto`}
          _active={{ cursor: `url(${mouseGrab}), auto` }}
        >
          {name.length > 15 ? (
            <Text
              display={{ base: 'block', md: 'none', lg: 'block' }}
              cursor={`url(${iconUrl}), auto`}
              _active={{ cursor: `url(${mouseGrab}), auto` }}
            >
              Capturar
            </Text>
          ) : name.length > 10 ? (
            <Text
              display={{ base: 'block', md: 'none', lg: 'block' }}
              fontSize='15px'
              cursor={`url(${iconUrl}), auto`}
              _active={{ cursor: `url(${mouseGrab}), auto` }}
            >
              Capturar {name}
            </Text>
          ) : (
            <Text
              display={{ base: 'block', md: 'none', lg: 'block' }}
              cursor={`url(${iconUrl}), auto`}
              _active={{ cursor: `url(${mouseGrab}), auto` }}
            >
              Capturar {name}
            </Text>
          )}
          <Text
            display={{ base: 'none', md: 'block', lg: 'none' }}
            cursor={`url(${iconUrl}), auto`}
            _active={{ cursor: `url(${mouseGrab}), auto` }}
          >
            Capturar
          </Text>
          <AlertCapturar
            name={name}
            capture_rate={captureRate}
            catchChance={catchChance}
            imageForAlertCapturar={imageForAlertCapturar}
            cardColor={cardColor}
            isOpen={isOpen}
            onClose={onClose}
            showSecondModalCapturar={showSecondModalCapturar}
            setShowSecondModalCapturar={setShowSecondModalCapturar}
            showSecondModalCapturarFail={showSecondModalCapturarFail}
            setShowSecondModalCapturarFail={setShowSecondModalCapturarFail}
          />
        </Button>
      )}
    </>
  )
}
export default ButtonAddOrRemove
